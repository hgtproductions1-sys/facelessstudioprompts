import {recognitionConfig, recognizeSample, studioJson} from '@/lib/distrokid-studio/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 20;

export function GET() {
  return studioJson({available: Boolean(recognitionConfig())});
}

export function POST(request: Request) {
  return recognizeSample(request);
}
