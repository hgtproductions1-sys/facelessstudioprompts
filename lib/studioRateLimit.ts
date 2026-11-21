import 'server-only';
import {createHash, randomUUID} from 'node:crypto';
import {isIP} from 'node:net';

const MAX_BUCKETS = 2048;
const localRequests = new Map<string, {times:number[]; expires:number}>();
const SCRIPT = [
  'local now = tonumber(ARGV[4])',
  'local window = tonumber(ARGV[1])',
  'redis.call("ZREMRANGEBYSCORE", KEYS[1], "-inf", now - window)',
  'if redis.call("ZCARD", KEYS[1]) >= tonumber(ARGV[2]) then',
  '  local oldest = redis.call("ZRANGE", KEYS[1], 0, 0, "WITHSCORES")',
  '  return math.max(1, math.ceil((tonumber(oldest[2]) + window - now) / 1000))',
  'end',
  'redis.call("ZADD", KEYS[1], now, ARGV[3])',
  'redis.call("PEXPIRE", KEYS[1], window)',
  'return 0',
].join('\n');

export function requestBucket(req: Request) {
  // Vercel supplies these values at its ingress. Other runtimes use a shared
  // bucket so a client cannot mint quotas by changing a forwarding header.
  if (process.env.VERCEL === '1') {
    const forwarded = req.headers.get('x-vercel-forwarded-for') ?? req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim().toLowerCase();
    if (ip && isIP(ip)) return ip;
  }
  return 'shared';
}

function reserveInMemory(bucket: string, maximum: number, windowMs: number) {
  const now = Date.now();
  const cutoff = now - windowMs;
  const recent = localRequests.get(bucket)?.times.filter(time => time > cutoff) ?? [];
  if (recent.length >= maximum) return Math.ceil((recent[0] + windowMs - now) / 1000);
  if (!localRequests.has(bucket) && localRequests.size >= MAX_BUCKETS) {
    for (const [key, state] of localRequests) {
      if (state.expires <= now) localRequests.delete(key);
    }
    if (localRequests.size >= MAX_BUCKETS) return 60;
  }
  localRequests.set(bucket,{times:[...recent,now],expires:now+windowMs});
  return 0;
}

// A zero result reserves one request. Other results are Retry-After seconds.
export async function reserveRequest(scope: string, bucket: string, maximum: number, windowMs: number) {
  const key = 'fp:' + scope + ':v1:' + createHash('sha256').update(bucket).digest('hex');
  const endpoint = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!endpoint && !token) return reserveInMemory(key, maximum, windowMs);
  if (!endpoint || !token) throw new Error('Incomplete Studio rate limit configuration');

  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('Invalid Studio rate limit endpoint');
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {Authorization: 'Bearer ' + token, 'Content-Type': 'application/json'},
    body: JSON.stringify(['EVAL', SCRIPT, '1', key, String(windowMs), String(maximum), randomUUID(), String(Date.now())]),
    signal: AbortSignal.timeout(2500),
    cache: 'no-store',
    redirect: 'error',
  });
  if (!response.ok) throw new Error('Studio rate limit service failed');
  const payload = await response.json() as {result?: unknown};
  if (typeof payload.result !== 'number' || !Number.isSafeInteger(payload.result) || payload.result < 0 || payload.result > windowMs / 1000) {
    throw new Error('Invalid Studio rate limit response');
  }
  return payload.result;
}

export function reserveStudioDraft(req: Request) {
  return reserveRequest('studio-ai', requestBucket(req), 2, 24 * 60 * 60 * 1000);
}
