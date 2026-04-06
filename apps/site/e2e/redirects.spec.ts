import { expect, test } from '@playwright/test';

import { LOCALE_PREFIX, ROUTE_MAP } from '../src/lib/route-map.js';

const redirectCases = ROUTE_MAP.filter(
  (entry) => entry.redirect && entry.oldPath && entry.oldPath !== entry.newPath,
);

const redirectPath = (path: string, trailingSlash: boolean) =>
  trailingSlash ? `${LOCALE_PREFIX}/${path}/` : `${LOCALE_PREFIX}/${path}`;

const redirectDepth = (request: import('@playwright/test').Request | null) => {
  let depth = 0;
  let current = request?.redirectedFrom() ?? null;

  while (current) {
    depth += 1;
    current = current.redirectedFrom();
  }

  return depth;
};

test.describe('legacy route redirects', () => {
  for (const entry of redirectCases) {
    const { oldPath } = entry;

    if (!oldPath) {
      throw new Error(`Redirect case ${entry.id} is missing an oldPath.`);
    }

    test(`redirects ${entry.id} legacy path with trailing slash`, async ({ page }) => {
      const response = await page.goto(redirectPath(oldPath, true));

      await expect(page).toHaveURL(redirectPath(entry.newPath, true));
      expect(redirectDepth(response?.request() ?? null)).toBe(1);
    });

    test(`redirects ${entry.id} legacy path without trailing slash`, async ({ page }) => {
      const response = await page.goto(redirectPath(oldPath, false));

      await expect(page).toHaveURL(redirectPath(entry.newPath, true));
      expect(redirectDepth(response?.request() ?? null)).toBe(1);
    });
  }

  test('redirects absolute legacy URLs to the new canonical route', async ({ page }) => {
    const response = await page.goto(
      'http://localhost:4321/en-us/writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding/',
    );

    await expect(page).toHaveURL(
      'http://localhost:4321/en-us/core-system/practice-of-clarity/act-1-when-output-outpaces-understanding/',
    );
    expect(redirectDepth(response?.request() ?? null)).toBe(1);
  });
});
