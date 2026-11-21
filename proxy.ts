import { NextResponse, type NextRequest } from 'next/server';
import { promptPageNumber } from './lib/prompt-pagination';

export function proxy(request: NextRequest) {
  const pages = request.nextUrl.searchParams.getAll('page');
  if (promptPageNumber(pages.length > 1 ? pages : pages[0]) === null) {
    return NextResponse.redirect(new URL('/prompts', request.url), 301);
  }
}

export const config = {matcher: '/prompts'};
