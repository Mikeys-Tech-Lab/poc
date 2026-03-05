import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LOCALE_PREFIXES, CONTENT_PATHS } from '../src/lib/__tests__/test-constants';

export const allPages = LOCALE_PREFIXES.flatMap((locale) =>
  CONTENT_PATHS.map((path) => `${locale}${path}`),
);

export const beginnerPages = allPages.map((url) => `${url}?register=beginner`);

export const expectBothRegisters = async (page: Page) => {
  await expect(page.locator('[data-register-content="practitioner"]')).toBeAttached();
  await expect(page.locator('[data-register-content="beginner"]')).toBeAttached();
};
