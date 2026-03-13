import { expect, test } from '@playwright/test';

test.describe('locale', () => {
  test('en-US homepage is reachable', async ({ page }) => {
    const response = await page.goto('/en-us/');
    expect(response?.status(), '/en-us/ should return 200').toBe(200);
  });

  test('language selector is not visible with single locale', async ({ page }) => {
    await page.goto('/en-us/');
    const langSelect = page.locator('starlight-lang-select');
    await expect(langSelect).toHaveCount(0);
  });
});
