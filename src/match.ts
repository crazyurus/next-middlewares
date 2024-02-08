import { pathToRegexp } from 'path-to-regexp';

export function pathMatch(path: string, matcher: string | string[]): boolean {
  let matchers: string[];

  if (Array.isArray(matcher)) {
    matchers = matcher;
  } else {
    matchers = [matcher];
  }

  return matchers.some(matcher => {
    const regexp = pathToRegexp(matcher);

    return regexp.test(path);
  });
}
