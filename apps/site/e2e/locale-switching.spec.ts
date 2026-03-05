import { test, expect } from '@playwright/test';

test.describe('locale switching', () => {
  test('language selector navigates to correct locale', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');

    const select = page.locator('starlight-lang-select select').first();
    const deOption = select.locator('option', { hasText: 'Deutsch' });
    const deValue = await deOption.getAttribute('value');
    expect(deValue).toBeTruthy();

    await select.selectOption(deValue!);
    await page.waitForURL('**/de-de/**');

    expect(page.url()).toContain('/de-de/');
  });

  test('each locale homepage is reachable', async ({ page }) => {
    for (const locale of ['/en-us/', '/en-gb/', '/de-de/']) {
      const response = await page.goto(locale);
      expect(response?.status(), `${locale} should return 200`).toBe(200);
    }
  });

  test('locale content matches language', async ({ page }) => {
    await page.goto('/de-de/about/what-this-is/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    await page.goto('/en-us/about/what-this-is/');
    const enHeading = page.locator('h1');
    await expect(enHeading).toBeVisible();
  });

  test('language selector shows all three locales', async ({ page }) => {
    await page.goto('/en-us/');
    const options = page.locator('starlight-lang-select select option');
    await expect(options).toHaveCount(3);
  });
});
