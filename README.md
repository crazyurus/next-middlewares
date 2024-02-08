# Next Middlewares

![publish](https://github.com/crazyurus/next-middlewares/actions/workflows/publish.yaml/badge.svg)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://badgen.net/npm/v/next-middlewares)](https://www.npmjs.com/package/next-middlewares)
[![npm dependents](https://badgen.net/npm/dependents/next-middlewares)](https://www.npmjs.com/package/next-middlewares?activeTab=dependents)
[![npm downloads](https://badgen.net/npm/dt/next-middlewares)](https://www.npmjs.com/package/next-middlewares)

This is a library that can use multiple middlewares in Next.

## Introduction

Next's middleware cannot be configured with multiple middlewares. To solve this problem, we provide a library to allow Next to support multiple middlewares.

## Supported Versions

`next-middlewares` is tested with:

- **next**: `13.0.0` and above


## Installation

First, install `next-middlewares`:

```bash
$ npm install next-middlewares

# OR

$ yarn add next-middlewares

# OR

$ pnpm install next-middlewares
```

## Usage

The way to define middlewares is almost exactly the same as Next. For details, please refer to the Next document [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware). The difference is that we only support `config.match`, other configurations will be ignored.

For example, you can create a new `middlewares` folder and create a new redirection middleware `redirect.ts` in it, the code is as follows

```js
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest): Promise<NextResponse> {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/about',
};
```

Then, we can create a new `middleware.ts` file in the `app` or `src` or `pages` directory of the project according to Next's specifications. And reference our middlewares, use `createMiddleware` to combine them. Code show as below:

```js
import { createMiddleware, config } from 'next-middlewares';

import * as RedirectMiddleware from './middlewares/redirect';
import * as RSSMiddleware from './middlewares/rss';

export const middleware = createMiddleware([RedirectMiddleware, RSSMiddleware]);

export { config };
```

That's all there is to it, your app will support multiple middlewares.

## License

[MIT](./LICENSE)
