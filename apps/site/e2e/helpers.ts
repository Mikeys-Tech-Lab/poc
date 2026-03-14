import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { CONTENT_PATHS, LOCALE_PREFIXES } from '../src/lib/__tests__/test-constants';

export const allPages = LOCALE_PREFIXES.flatMap((locale) =>
  CONTENT_PATHS.map((path) => `${locale}${path}`),
);

export const orientationPages = allPages.map((url) => `${url}?register=orientation`);

export const expectBothRegisters = async (page: Page) => {
  expect(await page.locator('[data-register-content="practitioner"]').count()).toBeGreaterThan(0);
  expect(await page.locator('[data-register-content="orientation"]').count()).toBeGreaterThan(0);
};
