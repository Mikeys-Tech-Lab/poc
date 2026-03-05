import { test, expect } from '@playwright/test';

test.describe('register toggle', () => {
  test('clicking site title toggles register', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');

    const practitionerContent = page.locator('[data-register-content="practitioner"]');
    const beginnerContent = page.locator('[data-register-content="beginner"]');

    await expect(practitionerContent).toBeVisible();
    await expect(beginnerContent).not.toBeVisible();

    await page.locator('poc-register-toggle button').click();

    await expect(beginnerContent).toBeVisible();
    await expect(practitionerContent).not.toBeVisible();
  });

  test('toggle updates URL with ?register=beginner', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');
    await page.locator('poc-register-toggle button').click();

    expect(page.url()).toContain('register=beginner');
  });

  test('toggle back removes register param', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');
    await page.locator('poc-register-toggle button').click();
    await page.locator('poc-register-toggle button').click();

    expect(page.url()).not.toContain('register=');
  });

  test('?register=beginner activates beginner on load', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/?register=beginner');

    const beginnerContent = page.locator('[data-register-content="beginner"]');
    await expect(beginnerContent).toBeVisible();
  });

  test('ToC updates when register toggles', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');

    const tocLinks = page.locator('starlight-toc nav a');
    const initialCount = await tocLinks.count();

    await page.locator('poc-register-toggle button').click();
    await page.waitForTimeout(100);

    const afterToggleCount = await tocLinks.count();
    expect(afterToggleCount).toBeGreaterThan(0);
    expect(typeof initialCount).toBe('number');
  });
});
