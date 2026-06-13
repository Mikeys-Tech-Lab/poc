// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const EVERYDAY_FALLBACK_MESSAGE =
  'Everyday is not available for this page yet. Showing Orientation instead.';

const ORIENTATION_FALLBACK_AVAILABILITY = {
  defaultRegister: 'orientation',
  available: ['orientation', 'practitioner'],
  absent: {
    everyday: 'Everyday is not available for this page yet.',
  },
} as const;

const THREE_REGISTER_AVAILABILITY = {
  defaultRegister: 'everyday',
  available: ['everyday', 'orientation', 'practitioner'],
  absent: {},
} as const;

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const THEME_PROVIDER_PATH = resolve(TEST_DIR, '../../components/ThemeProvider.astro');
const THEME_PROVIDER_SOURCE = readFileSync(THEME_PROVIDER_PATH, 'utf8');
const THEME_PROVIDER_SCRIPT = (() => {
  const match = THEME_PROVIDER_SOURCE.match(
    /<script is:inline define:vars=\{\{ registerAvailability \}\}>([\s\S]*?)<\/script>/,
  );

  if (!match) {
    throw new Error('Could not extract the ThemeProvider inline bootstrap script.');
  }

  return match[1];
})();

const store = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
  removeItem: (key: string) => store.delete(key),
};

const BOOTSTRAP_DATASET_KEYS = [
  'theme',
  'style',
  'register',
  'registerResolved',
  'registerRequested',
  'registerFallbackReason',
  'registerFallbackMessage',
  'registerDefault',
  'registerAvailable',
  'registerAbsent',
  'a11yContrast',
  'a11yText',
  'a11yMotion',
  'a11yLinks',
  'a11yFont',
  'a11yShowRegisterFallbackNotices',
] as const;

type WindowWithStarlightThemeProvider = Window & {
  StarlightThemeProvider?: unknown;
};

const resetBootstrapState = (): void => {
  const dataset = document.documentElement.dataset;
  for (const key of BOOTSTRAP_DATASET_KEYS) {
    Reflect.deleteProperty(dataset, key);
  }
  delete (window as WindowWithStarlightThemeProvider).StarlightThemeProvider;
};

type BootstrapAvailability = {
  defaultRegister: string;
  available: readonly string[];
  absent: Record<string, string>;
};

const runThemeProviderBootstrap = (registerAvailability: BootstrapAvailability) =>
  new Function('registerAvailability', THEME_PROVIDER_SCRIPT)(registerAvailability);

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', mockLocalStorage);
  history.replaceState(null, '', '/en-us/about/what-this-is/');
  document.body.innerHTML = '';
  resetBootstrapState();
});

describe('ThemeProvider bootstrap', () => {
  it('preserves stored everyday in the URL and exposes unavailable fallback metadata', () => {
    store.set('poc-register', 'everyday');

    runThemeProviderBootstrap(ORIENTATION_FALLBACK_AVAILABILITY);

    expect(document.documentElement.dataset.register).toBe('orientation');
    expect(document.documentElement.dataset.registerResolved).toBe('orientation');
    expect(document.documentElement.dataset.registerRequested).toBe('everyday');
    expect(document.documentElement.dataset.registerFallbackReason).toBe('unavailable');
    expect(document.documentElement.dataset.registerFallbackMessage).toBe(
      EVERYDAY_FALLBACK_MESSAGE,
    );
    expect(window.location.search).toContain('register=everyday');
    expect(store.get('poc-register')).toBe('everyday');
  });

  it('defaults a fresh visitor to orientation on a page without everyday', () => {
    runThemeProviderBootstrap(ORIENTATION_FALLBACK_AVAILABILITY);

    expect(document.documentElement.dataset.register).toBe('orientation');
    expect(document.documentElement.dataset.registerResolved).toBe('orientation');
    expect(document.documentElement.dataset.registerRequested).toBeUndefined();
    expect(document.documentElement.dataset.registerFallbackReason).toBeUndefined();
    expect(document.documentElement.dataset.registerFallbackMessage).toBeUndefined();
    expect(store.get('poc-register')).toBe('orientation');
  });

  it('defaults a fresh visitor to everyday on a page that has everyday', () => {
    runThemeProviderBootstrap(THREE_REGISTER_AVAILABILITY);

    expect(document.documentElement.dataset.register).toBe('everyday');
    expect(document.documentElement.dataset.registerResolved).toBe('everyday');
    expect(document.documentElement.dataset.registerRequested).toBeUndefined();
    expect(document.documentElement.dataset.registerFallbackReason).toBeUndefined();
    expect(document.documentElement.dataset.registerFallbackMessage).toBeUndefined();
    expect(store.get('poc-register')).toBe('everyday');
  });

  it('persists the everyday default so a later page without everyday shows the fallback', () => {
    runThemeProviderBootstrap(THREE_REGISTER_AVAILABILITY);
    expect(store.get('poc-register')).toBe('everyday');

    resetBootstrapState();
    history.replaceState(null, '', '/en-us/core-system/sensible-defaults/');
    runThemeProviderBootstrap(ORIENTATION_FALLBACK_AVAILABILITY);

    expect(document.documentElement.dataset.register).toBe('orientation');
    expect(document.documentElement.dataset.registerResolved).toBe('orientation');
    expect(document.documentElement.dataset.registerRequested).toBe('everyday');
    expect(document.documentElement.dataset.registerFallbackReason).toBe('unavailable');
    expect(document.documentElement.dataset.registerFallbackMessage).toBe(
      EVERYDAY_FALLBACK_MESSAGE,
    );
    expect(window.location.search).toContain('register=everyday');
    expect(store.get('poc-register')).toBe('everyday');
  });
});
