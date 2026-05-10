// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULTS,
  loadPreferences,
  parsePreferences,
  resetPreferences,
  STORAGE_KEY,
  setPreferences,
} from '../a11y-preferences';

const store = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
  removeItem: (key: string) => store.delete(key),
};

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', mockLocalStorage);
  delete document.documentElement.dataset.a11yContrast;
  delete document.documentElement.dataset.a11yText;
  delete document.documentElement.dataset.a11yMotion;
  delete document.documentElement.dataset.a11yLinks;
  delete document.documentElement.dataset.a11yFont;
  delete document.documentElement.dataset.a11yShowRegisterFallbackNotices;
});

describe('parsePreferences', () => {
  it('defaults register fallback notices to enabled', () => {
    expect(parsePreferences({})).toMatchObject({
      showRegisterFallbackNotices: true,
    });
  });

  it('keeps an explicit disabled value', () => {
    expect(parsePreferences({ showRegisterFallbackNotices: false })).toMatchObject({
      showRegisterFallbackNotices: false,
    });
  });
});

describe('loadPreferences', () => {
  it('reads the persisted register fallback notice preference', () => {
    store.set(STORAGE_KEY, JSON.stringify({ showRegisterFallbackNotices: false }));

    expect(loadPreferences().showRegisterFallbackNotices).toBe(false);
  });
});

describe('setPreferences', () => {
  it('applies and persists the register fallback notice preference', () => {
    const handler = vi.fn();
    window.addEventListener('poc:a11y-change', handler);

    setPreferences({
      ...DEFAULTS,
      showRegisterFallbackNotices: false,
    });

    expect(document.documentElement.dataset.a11yShowRegisterFallbackNotices).toBe('false');
    expect(JSON.parse(store.get(STORAGE_KEY) ?? '{}')).toMatchObject({
      showRegisterFallbackNotices: false,
    });
    expect(handler).toHaveBeenCalledOnce();
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail.showRegisterFallbackNotices).toBe(false);

    window.removeEventListener('poc:a11y-change', handler);
  });
});

describe('resetPreferences', () => {
  it('restores register fallback notices to the enabled default', () => {
    setPreferences({
      ...DEFAULTS,
      showRegisterFallbackNotices: false,
    });

    resetPreferences();

    expect(loadPreferences().showRegisterFallbackNotices).toBe(true);
    expect(document.documentElement.dataset.a11yShowRegisterFallbackNotices).toBe('true');
  });
});
