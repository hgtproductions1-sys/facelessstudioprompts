import assert from 'node:assert/strict';
import {GET as recognitionStatus, POST as recognize} from '../app/api/distrokid-studio/recognize/route';
import {GET as lookup} from '../app/api/distrokid-studio/lookup/route';

const origin = 'https://www.thefacelessprompts.com';
const recognitionUrl = origin + '/api/distrokid-studio/recognize';
const lookupUrl = origin + '/api/distrokid-studio/lookup';

function wav({seconds = 1, channels = 1, metadata = false} = {}) {
  const pcmBytes = seconds * 22050 * 2 * channels;
  const offset = metadata ? 48 : 36;
  const bytes = Buffer.alloc(offset + 8 + pcmBytes);
  bytes.write('RIFF');
  bytes.writeUInt32LE(bytes.length - 8, 4);
  bytes.write('WAVEfmt ', 8);
  bytes.writeUInt32LE(16, 16);
  bytes.writeUInt16LE(1, 20);
  bytes.writeUInt16LE(channels, 22);
  bytes.writeUInt32LE(22050, 24);
  bytes.writeUInt32LE(22050 * 2 * channels, 28);
  bytes.writeUInt16LE(2 * channels, 32);
  bytes.writeUInt16LE(16, 34);
  if (metadata) {
    bytes.write('JUNK', 36);
    bytes.writeUInt32LE(4, 40);
    bytes.write('test', 44);
  }
  bytes.write('data', offset);
  bytes.writeUInt32LE(pcmBytes, offset + 4);
  return new Blob([bytes], {type: 'audio/wav'});
}

function sampleRequest(audio = wav(), extra = false) {
  const body = new FormData();
  body.append('sample', audio, 'private-upload.wav');
  if (extra) body.append('sample', audio, 'second-file.wav');
  return new Request(recognitionUrl, {method: 'POST', body, headers: {origin}});
}

export async function verifyDistrokidStudio() {
  const keys = ['AUDD_API_TOKEN', 'AUDD_MONTHLY_MAX_REQUESTS', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'] as const;
  const originalEnv = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  const originalFetch = globalThis.fetch;
  try {
    for (const key of keys) delete process.env[key];
    globalThis.fetch = async () => assert.fail('Unconfigured recognition must not contact an external service');
    assert.deepEqual(await recognitionStatus().json(), {available: false});
    assert.equal((await recognize(sampleRequest())).status, 503);

    process.env.AUDD_API_TOKEN = 'test-token';
    process.env.AUDD_MONTHLY_MAX_REQUESTS = '2';
    process.env.UPSTASH_REDIS_REST_URL = 'https://limits.example';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-rate-token';
    assert.deepEqual(await recognitionStatus().json(), {available: true});
    const crossSite = new Request(recognitionUrl, {method: 'POST', headers: {origin: 'https://other.example'}});
    assert.equal((await recognize(crossSite)).status, 403);
    assert.equal((await recognize(sampleRequest(wav(), true))).status, 400);
    assert.equal((await recognize(sampleRequest(wav({channels: 2})))).status, 400);
    assert.equal((await recognize(sampleRequest(wav({seconds: 12.1})))).status, 400);
    assert.equal((await recognize(sampleRequest(new Blob([new Uint8Array(600000)])))).status, 413);

    let reservation = 0;
    let providerCalls = 0;
    let result: unknown = {
      artist: 'Test Artist', title: 'Test Song', album: 'Test Record',
      release_date: '2026-09-12', song_link: 'https://lis.tn/Test',
    };
    let quota = 0;
    let providerError = false;
    globalThis.fetch = async (input, init) => {
      if (String(input) === 'https://limits.example/') {
        const command = JSON.parse(String(init?.body));
        assert.equal(command[0], 'EVAL');
        const isGlobal = command[3].startsWith('fp:distrokid-audd-provider:');
        assert.equal(command[4], String((isGlobal ? 30 : 1) * 24 * 60 * 60 * 1000));
        assert.equal(command[5], isGlobal ? '2' : '9');
        reservation++;
        return Response.json({result: isGlobal ? quota : 0});
      }
      assert.equal(String(input), 'https://api.audd.io/');
      providerCalls++;
      const form = init?.body;
      assert(form instanceof FormData);
      assert.deepEqual(Array.from(form.keys()), ['api_token', 'file']);
      assert.equal(form.get('api_token'), 'test-token');
      const file = form.get('file');
      assert(file instanceof File);
      assert.equal(file.name, 'sample.wav');
      const bytes = Buffer.from(await file.arrayBuffer());
      assert.equal(bytes.toString('ascii', 36, 40), 'data');
      assert(!bytes.includes('test'));
      return providerError ? new Response(null, {status: 503}) : Response.json({status: 'success', result});
    };

    const match = await recognize(sampleRequest(wav({seconds: 12, metadata: true})));
    assert.equal(match.status, 200);
    assert.equal(match.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await match.json(), {status: 'match', track: {
      artist: 'Test Artist', title: 'Test Song', album: 'Test Record',
      releaseDate: '2026-09-12', link: 'https://lis.tn/Test',
    }});
    result = null;
    assert.deepEqual(await (await recognize(sampleRequest())).json(), {status: 'no_match'});
    providerError = true;
    const failure = await recognize(sampleRequest());
    assert.equal(failure.status, 502);
    assert.equal((await failure.json() as {status: string}).status, 'provider_error');
    quota = 60;
    const limited = await recognize(sampleRequest());
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get('retry-after'), '60');
    assert.equal(reservation, 8);
    assert.equal(providerCalls, 3);

    globalThis.fetch = async () => new Response(null, {status: 503});
    assert.equal((await recognize(sampleRequest())).status, 503);

    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    assert.equal((await lookup(new Request(lookupUrl))).status, 400);
    globalThis.fetch = async input => {
      const url = new URL(String(input));
      assert.equal(url.origin, 'https://itunes.apple.com');
      assert.equal(url.searchParams.get('term'), 'Test Song Test Artist');
      const track = {
        kind: 'song', trackName: 'Test Song', artistName: 'Test Artist',
        collectionName: 'Test Record', releaseDate: '2026-09-12T12:00:00Z',
        trackViewUrl: 'https://music.apple.com/us/album/test/1?i=2',
        artworkUrl100: 'https://example.com/art.jpg', previewUrl: 'https://example.com/preview.m4a',
      };
      return Response.json({results: [
        track, track, {...track, title: 'Test Song', artistName: 'A different artist'},
      ]});
    };
    const catalog = await lookup(new Request(lookupUrl + '?title=Test+Song&artist=Test+Artist'));
    assert.equal(catalog.status, 200);
    assert.deepEqual(await catalog.json(), {status: 'results', tracks: [{
      title: 'Test Song', artist: 'Test Artist', album: 'Test Record',
      releaseDate: '2026-09-12', link: 'https://music.apple.com/us/album/test/1?i=2',
    }]});
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of keys) {
      const value = originalEnv[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}
