import { expect, test } from '@playwright/test';

import { LOCALE_PREFIX, ROUTE_MAP } from '../src/lib/route-map.js';

const redirectCases = ROUTE_MAP.filter(
  (entry) => entry.redirect && entry.oldPath && entry.oldPath !== entry.newPath,
);

const redirectPath = (path: string, trailingSlash: boolean) =>
  trailingSlash ? `${LOCALE_PREFIX}/${path}/` : `${LOCALE_PREFIX}/${path}`;

test.describe('legacy route redirects', () => {
  // Route migrations are a user-facing navigation contract. Keep the browser
  // assertion on landing at the canonical URL, not on Playwright exposing a
  // specific redirect-chain depth for the preview runtime.
  for (const entry of redirectCases) {
    const { oldPath } = entry;

    if (!oldPath) {
      throw new Error(`Redirect case ${entry.id} is missing an oldPath.`);
    }

    test(`redirects ${entry.id} legacy path with trailing slash`, async ({ page }) => {
      const response = await page.goto(redirectPath(oldPath, true));

      expect(response?.ok()).toBe(true);
      await expect(page).toHaveURL(redirectPath(entry.newPath, true));
    });

    test(`redirects ${entry.id} legacy path without trailing slash`, async ({ page }) => {
      const response = await page.goto(redirectPath(oldPath, false));

      expect(response?.ok()).toBe(true);
      await expect(page).toHaveURL(redirectPath(entry.newPath, true));
    });
  }

  test('redirects absolute legacy URLs to the new canonical route', async ({ page }) => {
    const response = await page.goto(
      'http://localhost:4321/en-us/writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page).toHaveURL(
      'http://localhost:4321/en-us/core-system/practice-of-clarity/act-1-when-output-outpaces-understanding/',
    );
  });
});
