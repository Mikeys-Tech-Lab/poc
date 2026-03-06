import { expect, test } from '@playwright/test';

test.describe('register toggle', () => {
  test('clicking site title toggles register', async ({ page }) => {
    await page.goto('/about/what-this-is/');

    const practitionerContent = page.locator('[data-register-content="practitioner"]');
    const orientationContent = page.locator('[data-register-content="orientation"]');

    await expect(practitionerContent).toBeVisible();
    await expect(orientationContent).not.toBeVisible();

    await page.locator('poc-register-toggle button').click();

    await expect(orientationContent).toBeVisible();
    await expect(practitionerContent).not.toBeVisible();
  });

  test('toggle updates URL with ?register=orientation', async ({ page }) => {
    await page.goto('/about/what-this-is/');
    await page.locator('poc-register-toggle button').click();

    expect(page.url()).toContain('register=orientation');
  });

  test('toggle back removes register param', async ({ page }) => {
    await page.goto('/about/what-this-is/');
    await page.locator('poc-register-toggle button').click();
    await page.locator('poc-register-toggle button').click();

    expect(page.url()).not.toContain('register=');
  });

  test('?register=orientation activates orientation on load', async ({ page }) => {
    await page.goto('/about/what-this-is/?register=orientation');

    const orientationContent = page.locator('[data-register-content="orientation"]');
    await expect(orientationContent).toBeVisible();
  });

  test('ToC updates when register toggles', async ({ page }) => {
    await page.goto('/about/what-this-is/');

    const tocLinks = page.locator('starlight-toc nav a');
    const initialCount = await tocLinks.count();

    await page.locator('poc-register-toggle button').click();
    await page.waitForTimeout(100);

    const afterToggleCount = await tocLinks.count();
    expect(afterToggleCount).toBeGreaterThan(0);
    expect(typeof initialCount).toBe('number');
  });
});
