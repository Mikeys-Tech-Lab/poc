import { describe, expect, it } from 'vitest';

import { buildRouteRedirects, LOCALE_PREFIX, ROUTE_MAP } from '../route-map.js';

describe('route map', () => {
  it('keeps route ids unique', () => {
    const ids = ROUTE_MAP.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('derives redirects from the route map without chains', () => {
    const redirects = buildRouteRedirects();
    const redirectEntries = ROUTE_MAP.filter(
      (entry) => entry.redirect && entry.oldPath && entry.oldPath !== entry.newPath,
    );
    const redirectSources = new Set(Object.keys(redirects));

    for (const entry of redirectEntries) {
      const oldWithoutSlash = `${LOCALE_PREFIX}/${entry.oldPath}`;
      const target = `${LOCALE_PREFIX}/${entry.newPath}/`;

      expect(redirects[oldWithoutSlash]).toBe(target);
      expect(redirectSources.has(target)).toBe(false);
    }
  });
});
