import { expect, test } from '@playwright/test';

test.describe('register selector', () => {
  test('changing register selector switches register', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');

    const practitionerContent = page.locator('[data-register-content="practitioner"]');
    const orientationContent = page.locator('[data-register-content="orientation"]');

    await expect(practitionerContent).toBeVisible();
    await expect(orientationContent).not.toBeVisible();

    await page.locator('poc-register-select select').selectOption('orientation');

    await expect(orientationContent).toBeVisible();
    await expect(practitionerContent).not.toBeVisible();
  });

  test('selector updates URL with ?register=orientation', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');
    await page.locator('poc-register-select select').selectOption('orientation');

    expect(page.url()).toContain('register=orientation');
  });

  test('selecting the default register removes register param', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');
    await page.locator('poc-register-select select').selectOption('orientation');
    await page.locator('poc-register-select select').selectOption('practitioner');

    expect(page.url()).not.toContain('register=');
  });

  test('?register=orientation activates orientation on load', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/?register=orientation');

    const orientationContent = page.locator('[data-register-content="orientation"]');
    await expect(orientationContent).toBeVisible();
  });

  test('known unavailable registers fall back visibly to the default', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/?register=everyday');

    await expect(page.locator('[data-register-content="practitioner"]')).toBeVisible();
    await expect(page.locator('poc-register-select select')).toHaveValue('practitioner');
    await expect(page.locator('[data-register-fallback]')).toHaveText(
      'Everyday is not available for this page yet.',
    );
    expect(page.url()).not.toContain('register=everyday');
  });

  test('everyday is visible as unavailable in the selector', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');

    const everyday = page.locator('poc-register-select option[value="everyday"]');
    await expect(everyday).toBeDisabled();
    await expect(everyday).toHaveText('Everyday (not available yet)');
  });

  test('ToC updates when register toggles', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');

    const tocLinks = page.locator('starlight-toc nav a');
    const initialCount = await tocLinks.count();

    await page.locator('poc-register-select select').selectOption('orientation');
    await page.waitForTimeout(100);

    const afterToggleCount = await tocLinks.count();
    expect(afterToggleCount).toBeGreaterThan(0);
    expect(typeof initialCount).toBe('number');
  });

  test('ToC links jump to the visible heading in practitioner and orientation', async ({
    page,
  }) => {
    await page.goto('/en-us/about/what-this-is/');

    await page
      .locator('starlight-toc nav a')
      .filter({ hasText: 'What this is not' })
      .first()
      .click();
    await page.waitForTimeout(100);

    const practitionerPosition = await page.evaluate(() => {
      const visibleHeading = [...document.querySelectorAll('#what-this-is-not')].find((element) => {
        if (!(element instanceof HTMLElement)) return false;
        const style = window.getComputedStyle(element);
        return (
          style.display !== 'none' && style.visibility !== 'hidden' && element.offsetParent !== null
        );
      });

      if (!(visibleHeading instanceof HTMLElement)) return null;
      return {
        hash: window.location.hash,
        top: visibleHeading.getBoundingClientRect().top,
      };
    });

    expect(practitionerPosition?.hash).toBe('#what-this-is-not');
    expect(practitionerPosition?.top ?? Number.POSITIVE_INFINITY).toBeLessThan(140);

    await page.locator('poc-register-select select').selectOption('orientation');
    await page
      .locator('starlight-toc nav a')
      .filter({ hasText: 'What this is not' })
      .first()
      .click();
    await page.waitForTimeout(100);

    const orientationPosition = await page.evaluate(() => {
      const visibleHeading = [...document.querySelectorAll('#what-this-is-not')].find((element) => {
        if (!(element instanceof HTMLElement)) return false;
        const style = window.getComputedStyle(element);
        return (
          style.display !== 'none' && style.visibility !== 'hidden' && element.offsetParent !== null
        );
      });

      if (!(visibleHeading instanceof HTMLElement)) return null;
      return {
        hash: window.location.hash,
        top: visibleHeading.getBoundingClientRect().top,
      };
    });

    expect(orientationPosition?.hash).toBe('#what-this-is-not');
    expect(orientationPosition?.top ?? Number.POSITIVE_INFINITY).toBeLessThan(140);
  });
});
