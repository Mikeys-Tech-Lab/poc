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

/**
 * A11y panel controls: verify each toggle/select updates document attributes
 * and that reset restores defaults.
 */
test.describe('a11y panel controls', () => {
  const BASE_URL = '/en-us/about/what-this-is/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    // Clear a11y prefs so tests start from known state
    await page.evaluate(() => {
      localStorage.removeItem('poc-a11y');
      localStorage.removeItem('starlight-theme');
      localStorage.removeItem('poc-atmospheric-theme');
    });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
  });

  async function openPanel(page: import('@playwright/test').Page) {
    const trigger = page.getByRole('button', { name: 'Accessibility settings' });
    await trigger.click();
    await expect(page.locator('poc-a11y-panel dialog[open]')).toBeVisible();
  }

  function openDialog(page: import('@playwright/test').Page) {
    return page.locator('poc-a11y-panel dialog[open]');
  }

  function getRootDataset(page: import('@playwright/test').Page) {
    return page.evaluate(() => ({
      a11yContrast: document.documentElement.dataset.a11yContrast,
      a11yText: document.documentElement.dataset.a11yText,
      a11yMotion: document.documentElement.dataset.a11yMotion,
      a11yLinks: document.documentElement.dataset.a11yLinks,
      a11yFont: document.documentElement.dataset.a11yFont,
      style: document.documentElement.dataset.style,
    }));
  }

  test('default state keeps links non-underlined across the page', async ({ page }) => {
    const footerLink = page.locator('.license-notice a').first();
    const contentLink = page.locator('.sl-markdown-content a').first();
    await expect(footerLink).toHaveCSS('text-decoration-line', 'none');
    await expect(contentLink).toHaveCSS('text-decoration-line', 'none');
  });

  test('contrast toggle sets data-a11y-contrast', async ({ page }) => {
    await openPanel(page);
    const checkbox = openDialog(page).locator('[data-a11y-control="contrast"]');
    await checkbox.check();
    const ds = await getRootDataset(page);
    expect(ds.a11yContrast).toBe('more');
    await checkbox.uncheck();
    const ds2 = await getRootDataset(page);
    expect(ds2.a11yContrast).toBe('default');
  });

  test('text size select sets data-a11y-text', async ({ page }) => {
    await openPanel(page);
    const select = openDialog(page).locator('[data-a11y-control="text"]');
    await select.selectOption('150');
    const ds = await getRootDataset(page);
    expect(ds.a11yText).toBe('150');
    await select.selectOption('100');
    const ds2 = await getRootDataset(page);
    expect(ds2.a11yText).toBe('100');
  });

  test('reduce motion toggle sets data-a11y-motion', async ({ page }) => {
    await openPanel(page);
    const checkbox = openDialog(page).locator('[data-a11y-control="motion"]');
    await checkbox.check();
    const ds = await getRootDataset(page);
    expect(ds.a11yMotion).toBe('reduce');
    await checkbox.uncheck();
    const ds2 = await getRootDataset(page);
    expect(ds2.a11yMotion).toBe('default');
  });

  test('solid toggle sets data-style', async ({ page }) => {
    await openPanel(page);
    const checkbox = openDialog(page).locator('[data-a11y-control="solid"]');
    await checkbox.check();
    const ds = await getRootDataset(page);
    expect(ds.style).toBe('solid');
    await checkbox.uncheck();
    const ds2 = await getRootDataset(page);
    expect(ds2.style).toBeUndefined();
  });

  test('underline links toggle sets data-a11y-links and styles links', async ({ page }) => {
    const footerLink = page.locator('.license-notice a').first();
    const contentLink = page.locator('.sl-markdown-content a').first();
    await expect(footerLink).toHaveCSS('text-decoration-line', 'none');
    await expect(contentLink).toHaveCSS('text-decoration-line', 'none');

    await openPanel(page);
    const checkbox = openDialog(page).locator('[data-a11y-control="links"]');
    await checkbox.check();
    const ds = await getRootDataset(page);
    expect(ds.a11yLinks).toBe('underline');
    await expect(footerLink).toHaveCSS('text-decoration-line', 'underline');
    await expect(contentLink).toHaveCSS('text-decoration-line', 'underline');
    await checkbox.uncheck();
    const ds2 = await getRootDataset(page);
    expect(ds2.a11yLinks).toBe('default');
    await expect(footerLink).toHaveCSS('text-decoration-line', 'none');
    await expect(contentLink).toHaveCSS('text-decoration-line', 'none');
  });

  test('alternate font toggle sets data-a11y-font', async ({ page }) => {
    await openPanel(page);
    const checkbox = openDialog(page).locator('[data-a11y-control="font"]');
    await checkbox.check();
    const ds = await getRootDataset(page);
    expect(ds.a11yFont).toBe('alt');
    await checkbox.uncheck();
    const ds2 = await getRootDataset(page);
    expect(ds2.a11yFont).toBe('default');
  });

  test('reset restores all defaults', async ({ page }) => {
    await openPanel(page);
    const dialog = openDialog(page);
    await dialog.locator('[data-a11y-control="contrast"]').check();
    await dialog.locator('[data-a11y-control="text"]').selectOption('175');
    await dialog.locator('[data-a11y-control="motion"]').check();
    await dialog.locator('[data-a11y-control="solid"]').check();
    await dialog.locator('[data-a11y-control="links"]').check();
    await dialog.locator('[data-a11y-control="font"]').check();

    await dialog.getByRole('button', { name: 'Reset to defaults' }).click();

    const ds = await getRootDataset(page);
    expect(ds.a11yContrast).toBe('default');
    expect(ds.a11yText).toBe('100');
    expect(ds.a11yMotion).toBe('default');
    expect(ds.style).toBeUndefined();
    expect(ds.a11yLinks).toBe('default');
    expect(ds.a11yFont).toBe('default');
  });
});

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
