import {lookupTracks} from '@/lib/distrokid-studio/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 15;

export function GET(request: Request) {
  return lookupTracks(request);
}
