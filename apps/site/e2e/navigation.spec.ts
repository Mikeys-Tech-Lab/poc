import { expect, test } from '@playwright/test';
import { allPages, orientationPages } from './helpers';

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

      const links = await page
        .locator('a[href^="/"]')
        .evaluateAll((anchors) =>
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

  test('visible same-origin links and hash links work in both registers', async ({ page }) => {
    const brokenPaths: string[] = [];
    const brokenAnchors: string[] = [];
    const variants = [...allPages, ...orientationPages];

    for (const url of variants) {
      await page.goto(url);

      const links = await page.locator('a[href]').evaluateAll((anchors) =>
        anchors
          .filter((anchor) => {
            if (!(anchor instanceof HTMLAnchorElement)) return false;
            const href = anchor.getAttribute('href');
            if (!href || (!href.startsWith('/') && !href.startsWith('#'))) return false;

            const style = window.getComputedStyle(anchor);
            return (
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              anchor.offsetParent !== null
            );
          })
          .map((anchor) => anchor.getAttribute('href'))
          .filter((href): href is string => href !== null),
      );

      const uniqueLinks = [...new Set(links)];

      for (const href of uniqueLinks) {
        if (href.startsWith('/')) {
          const normalized = href.split('?')[0].split('#')[0];
          const response = await page.request.get(normalized);
          if (response.status() === 404) {
            brokenPaths.push(`${url} -> ${normalized}`);
          }
          continue;
        }

        await page.evaluate((targetHref) => {
          const anchor = [...document.querySelectorAll('a[href]')].find((element) => {
            if (!(element instanceof HTMLAnchorElement)) return false;
            if (element.getAttribute('href') !== targetHref) return false;

            const style = window.getComputedStyle(element);
            return (
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              element.offsetParent !== null
            );
          });

          if (anchor instanceof HTMLAnchorElement) {
            anchor.click();
          }
        }, href);

        await page.waitForTimeout(100);

        const anchorResult = await page.evaluate((targetHref) => {
          const targetId = targetHref.slice(1);
          const visibleTarget = [...document.querySelectorAll(`[id="${targetId}"]`)].find(
            (element) => {
              if (!(element instanceof HTMLElement)) return false;
              const style = window.getComputedStyle(element);
              return (
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                element.offsetParent !== null
              );
            },
          );

          if (!(visibleTarget instanceof HTMLElement)) {
            return { hash: window.location.hash, top: null };
          }

          return {
            hash: window.location.hash,
            top: visibleTarget.getBoundingClientRect().top,
            viewportHeight: window.innerHeight,
          };
        }, href);

        if (
          anchorResult.hash !== href ||
          anchorResult.top === null ||
          anchorResult.top < -64 ||
          anchorResult.top >= anchorResult.viewportHeight
        ) {
          brokenAnchors.push(
            `${url} -> ${href} (hash: ${anchorResult.hash || 'none'}, top: ${anchorResult.top ?? 'missing'})`,
          );
        }
      }
    }

    expect(brokenPaths, 'broken same-origin path links found').toEqual([]);
    expect(brokenAnchors, 'broken in-page anchor links found').toEqual([]);
  });
});
