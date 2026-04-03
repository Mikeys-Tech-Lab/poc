import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'desktop', viewport: { width: 1440, height: 1200 } },
  { name: 'tablet', viewport: { width: 834, height: 1112 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
] as const;

const articlePath =
  '/en-us/writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding/';
const infoPath = '/en-us/about/what-this-is/';

const practitionerAnchor =
  'Integration is the quieter work that makes output meaningful. It involves aligning proposals with intent, verifying assumptions, understanding consequences, and ensuring that new changes actually fit with what already exists.';
const orientationAnchor =
  'Understanding takes time. People still need to ask questions, examine assumptions, and see how a decision fits with everything else that already exists.';

const helperCopy = {
  practitioner: 'Deeper reading and working context',
  orientation: 'Plain-language introduction',
} as const;

const neutralA11yLabels = [
  'Increase contrast',
  'Reduce motion',
  'Alternate font',
  'Solid background for higher contrast',
] as const;

test.describe('final ui refinements', () => {
  for (const { name, viewport } of viewports) {
    test(`copy link control sits above the article anchor paragraphs on ${name}`, async ({
      browser,
    }) => {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();

      try {
        await page.goto(articlePath);
        await page.waitForLoadState('domcontentloaded');

        const practitionerPlacement = await page.evaluate(
          ({ anchorText, containerSelector }) => {
            const container = document.querySelector(containerSelector);
            const paragraphs = [...(container?.querySelectorAll('p') ?? [])];
            const anchor = paragraphs.find((element) => element.textContent?.trim() === anchorText);
            const copyLinkControl = container?.querySelector('poc-share-button');

            if (!anchor || !copyLinkControl) {
              return false;
            }

            return Boolean(
              copyLinkControl.compareDocumentPosition(anchor) & Node.DOCUMENT_POSITION_FOLLOWING,
            );
          },
          {
            anchorText: practitionerAnchor,
            containerSelector: '[data-register-content="practitioner"]',
          },
        );

        expect(practitionerPlacement).toBe(true);

        await page.goto(`${articlePath}?register=orientation`);
        await page.waitForLoadState('domcontentloaded');

        const orientationPlacement = await page.evaluate(
          ({ anchorText, containerSelector }) => {
            const container = document.querySelector(containerSelector);
            const paragraphs = [...(container?.querySelectorAll('p') ?? [])];
            const anchor = paragraphs.find((element) => element.textContent?.trim() === anchorText);
            const copyLinkControl = container?.querySelector('poc-share-button');

            if (!anchor || !copyLinkControl) {
              return false;
            }

            return Boolean(
              copyLinkControl.compareDocumentPosition(anchor) & Node.DOCUMENT_POSITION_FOLLOWING,
            );
          },
          {
            anchorText: orientationAnchor,
            containerSelector: '[data-register-content="orientation"]',
          },
        );

        expect(orientationPlacement).toBe(true);
      } finally {
        await context.close();
      }
    });

    test(`footer copy and accessibility labels stay stable on ${name}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();

      try {
        await page.goto(infoPath);
        await page.waitForLoadState('domcontentloaded');

        await expect(page.locator('.license-notice .provenance')).toContainText(
          'This site is built in the open. The writing is the primary reading surface. The repository is the inspectable node behind it.',
        );
        await expect(page.locator('.license-notice .provenance a')).toHaveCount(0);

        await expect(page.locator('.helper-practitioner')).toBeVisible();
        await expect(page.locator('.helper-practitioner')).toHaveText(helperCopy.practitioner);
        await page.locator('poc-register-toggle button').click();
        await expect(page.locator('.helper-orientation')).toBeVisible();
        await expect(page.locator('.helper-orientation')).toHaveText(helperCopy.orientation);

        const panelTrigger = page.locator('poc-a11y-panel .a11y-trigger:visible').first();
        await panelTrigger.click();
        const openDialog = page.locator('.a11y-dialog[open]');

        for (const label of neutralA11yLabels) {
          await expect(openDialog).toContainText(label);
        }
      } finally {
        await context.close();
      }
    });
  }
});
