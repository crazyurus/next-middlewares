import type { NextRequest, NextResponse } from 'next/server';

export interface Middleware {
  middleware(request: NextRequest): NextResponse | Promise<NextResponse>;
  config: {
    matcher: string | string[];
  };
}
