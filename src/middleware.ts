import { pathMatch } from './match';
import { type NextRequest, NextResponse } from 'next/server';
import type { Middleware } from './types';

async function executeMiddleware(
  request: NextRequest,
  middleware: Middleware['middleware']
): Promise<NextResponse | null> {
  const result = await middleware(request);

  return result instanceof NextResponse && result !== NextResponse.next()
    ? result
    : null;
}

export function createMiddleware(
  middlewares: Middleware[]
): Middleware['middleware'] {
  const middleware: Middleware['middleware'] = async (request: NextRequest) => {
    const path = request.nextUrl.pathname;
    let response: NextResponse | null = null;

    for (const item of middlewares) {
      const { middleware, config } = item;

      if (pathMatch(path, config.matcher)) {
        const result = await executeMiddleware(request, middleware);

        if (result) {
          response = result;
        }
      }
    }

    return response || NextResponse.next();
  };

  return middleware;
}
