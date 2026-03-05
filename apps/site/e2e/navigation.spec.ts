import { test, expect } from '@playwright/test';
import { allPages } from './helpers';

test.describe('navigation', () => {
  test('all pages return 200', async ({ page }) => {
    for (const url of allPages) {
      const response = await page.goto(url);
      expect(response?.status(), `${url} should return 200`).toBe(200);
    }
  });

  test('internal links resolve without 404', async ({ page }) => {
    const visited = new Set<string>();
    const broken: string[] = [];

    for (const url of allPages) {
      await page.goto(url);

      const links = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
        anchors
          .map((a) => a.getAttribute('href'))
          .filter((href): href is string => href !== null),
      );

      for (const href of links) {
        const normalized = href.split('?')[0].split('#')[0];
        if (visited.has(normalized)) continue;
        visited.add(normalized);

        const response = await page.request.get(normalized);
        if (response.status() === 404) {
          broken.push(`${url} -> ${normalized}`);
        }
      }
    }

    expect(broken, 'broken internal links found').toEqual([]);
  });
});
