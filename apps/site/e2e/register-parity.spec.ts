import { test } from '@playwright/test';
import { contentPages, expectAvailableRegisters } from './helpers';

test.describe('register parity', () => {
  for (const contentPage of contentPages) {
    test(`${contentPage.url} has available register content divs`, async ({ page }) => {
      await page.goto(contentPage.url);
      await expectAvailableRegisters(page, contentPage.path);
    });
  }
});
