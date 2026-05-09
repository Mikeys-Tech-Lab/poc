import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { CONTENT_PATHS, LOCALE_PREFIXES } from '../src/lib/__tests__/test-constants';
import { getRegisterAvailabilityForPath } from '../src/lib/route-map.js';

const buildRegisterUrl = (locale: string, path: string, register: string) => {
  const availability = getRegisterAvailabilityForPath(path);
  const url = `${locale}${path}`;
  return register === availability.defaultRegister ? url : `${url}?register=${register}`;
};

export const allPages = LOCALE_PREFIXES.flatMap((locale) =>
  CONTENT_PATHS.map((path) => `${locale}${path}`),
);

export const registerVariantPages = LOCALE_PREFIXES.flatMap((locale) =>
  CONTENT_PATHS.flatMap((path) =>
    getRegisterAvailabilityForPath(path).available.map((register) => ({
      url: buildRegisterUrl(locale, path, register),
      register,
    })),
  ),
);

export const contentPages = LOCALE_PREFIXES.flatMap((locale) =>
  CONTENT_PATHS.map((path) => ({ path, url: `${locale}${path}` })),
);

export const expectAvailableRegisters = async (page: Page, path: string) => {
  const availability = getRegisterAvailabilityForPath(path);
  for (const register of availability.available) {
    expect(await page.locator(`[data-register-content="${register}"]`).count()).toBeGreaterThan(0);
  }
};
