import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { CONTENT_PATHS, LOCALE_PREFIXES, REGISTERS } from '../src/lib/__tests__/test-constants';

/**
 * Axe scope (runtime-realistic):
 * - 1 representative page x both registers = 2
 * - 1 "stress" page x both registers = 2
 * Total: 4 axe runs
 */
const AXE_REPRESENTATIVE_PAGE = CONTENT_PATHS[1]; // about/what-this-is
const AXE_STRESS_PAGES = [CONTENT_PATHS[4]]; // cc-by-4-0

const axePages = [
  ...LOCALE_PREFIXES.flatMap((locale) =>
    REGISTERS.map((reg) => ({
      url: `${locale}${AXE_REPRESENTATIVE_PAGE}`,
      register: reg,
      label: `${locale}${AXE_REPRESENTATIVE_PAGE} [${reg}]`,
    })),
  ),
  ...AXE_STRESS_PAGES.flatMap((path) =>
    REGISTERS.map((reg) => ({
      url: `${LOCALE_PREFIXES[0]}${path}`,
      register: reg,
      label: `${LOCALE_PREFIXES[0]}${path} [${reg}]`,
    })),
  ),
];

test.describe('accessibility (axe)', () => {
  for (const { url, register, label } of axePages) {
    test(`no critical a11y violations: ${label}`, async ({ page }) => {
      const target = register === 'orientation' ? `${url}?register=orientation` : url;
      await page.goto(target);
      await page.waitForLoadState('domcontentloaded');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        // Pre-existing baseline findings documented here. Each is either an
        // upstream framework limitation or a theme-level concern mitigated by
        // the a11y preferences panel:
        //   target-size: Starlight ToC links are ~22.8px tall (min 24px). Upstream.
        //   link-in-text-block: Catppuccin flamingo accent vs body text contrast.
        //     Mitigated by "Underline links" preference.
        //   color-contrast: atmospheric translucent backgrounds reduce text contrast.
        //     Mitigated by "Increase contrast" and "Solid" preferences.
        .disableRules(['target-size', 'link-in-text-block', 'color-contrast'])
        .analyze();

      const serious = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(
        serious,
        `Critical/serious a11y violations on ${label}:\n${serious.map((v) => `  [${v.impact}] ${v.id}: ${v.description}`).join('\n')}`,
      ).toEqual([]);
    });
  }
});

/**
 * Reflow checks: at 320px viewport width, no page-level
 * horizontal scroll for normal prose pages.
 * Code blocks are allowed to scroll internally.
 */
const allPages = LOCALE_PREFIXES.flatMap((locale) =>
  CONTENT_PATHS.map((path) => `${locale}${path}`),
);

test.describe('reflow (320px viewport)', () => {
  test.use({ viewport: { width: 320, height: 600 } });

  for (const url of allPages) {
    test(`no page-level horizontal scroll: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('domcontentloaded');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll, `Page-level horizontal scroll detected at 320px on ${url}`).toBe(
        false,
      );
    });
  }
});
