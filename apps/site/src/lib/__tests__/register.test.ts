// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_REGISTER,
  getRegister,
  getRegisterAvailability,
  loadRegister,
  parseRegister,
  READING_REGISTERS,
  resolveRegister,
  STORAGE_KEY,
  setRegister,
} from '../register';

const store = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
  removeItem: (key: string) => store.delete(key),
};

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', mockLocalStorage);
  history.replaceState(null, '', '/en-us/about/what-this-is/');
  delete document.documentElement.dataset.register;
  delete document.documentElement.dataset.registerDefault;
  delete document.documentElement.dataset.registerAvailable;
  delete document.documentElement.dataset.registerAbsent;
  delete document.documentElement.dataset.registerFallbackReason;
  delete document.documentElement.dataset.registerFallbackMessage;
  delete document.documentElement.dataset.registerRequested;
});

describe('parseRegister', () => {
  it('knows all reading registers', () => {
    expect(READING_REGISTERS).toEqual(['everyday', 'orientation', 'practitioner']);
  });

  it('uses practitioner as the default register', () => {
    expect(DEFAULT_REGISTER).toBe('practitioner');
  });

  it('returns everyday for "everyday"', () => {
    expect(parseRegister('everyday')).toBe('everyday');
  });

  it('returns orientation for "orientation"', () => {
    expect(parseRegister('orientation')).toBe('orientation');
  });

  it('returns practitioner for "practitioner"', () => {
    expect(parseRegister('practitioner')).toBe('practitioner');
  });

  it('returns practitioner for null', () => {
    expect(parseRegister(null)).toBe('practitioner');
  });

  it('returns practitioner for undefined', () => {
    expect(parseRegister(undefined)).toBe('practitioner');
  });

  it('returns practitioner for false (localStorage miss)', () => {
    expect(parseRegister(false)).toBe('practitioner');
  });

  it('returns practitioner for arbitrary string', () => {
    expect(parseRegister('unknown')).toBe('practitioner');
  });
});

describe('getRegisterAvailability', () => {
  it('uses the default availability when route metadata is absent', () => {
    expect(getRegisterAvailability()).toEqual({
      defaultRegister: 'practitioner',
      available: ['practitioner', 'orientation'],
      absent: {
        everyday: 'Everyday is not available for this page yet.',
      },
    });
  });

  it('reads route availability from document metadata', () => {
    document.documentElement.dataset.registerDefault = 'orientation';
    document.documentElement.dataset.registerAvailable = 'orientation,practitioner';
    document.documentElement.dataset.registerAbsent = JSON.stringify({
      everyday: 'Everyday is planned for this page.',
    });

    expect(getRegisterAvailability()).toEqual({
      defaultRegister: 'orientation',
      available: ['orientation', 'practitioner'],
      absent: {
        everyday: 'Everyday is planned for this page.',
      },
    });
  });
});

describe('resolveRegister', () => {
  it('keeps an available known register', () => {
    expect(resolveRegister('orientation').register).toBe('orientation');
  });

  it('falls back visibly for a known unavailable register', () => {
    const result = resolveRegister('everyday');

    expect(result.register).toBe('practitioner');
    expect(result.requested).toBe('everyday');
    expect(result.reason).toBe('unavailable');
    expect(result.message).toBe('Everyday is not available for this page yet.');
  });

  it('falls back visibly for an unknown register', () => {
    const result = resolveRegister('unknown');

    expect(result.register).toBe('practitioner');
    expect(result.requested).toBeNull();
    expect(result.reason).toBe('unknown');
  });
});

describe('getRegister', () => {
  it('reads from data-register attribute', () => {
    document.documentElement.dataset.register = 'orientation';
    expect(getRegister()).toBe('orientation');
  });

  it('defaults to practitioner when attribute is absent', () => {
    expect(getRegister()).toBe('practitioner');
  });
});

describe('loadRegister', () => {
  it('reads from localStorage', () => {
    store.set(STORAGE_KEY, 'orientation');
    expect(loadRegister()).toBe('orientation');
  });

  it('defaults to practitioner when localStorage is empty', () => {
    expect(loadRegister()).toBe('practitioner');
  });

  it('falls back when localStorage points to an unavailable register', () => {
    store.set(STORAGE_KEY, 'everyday');
    expect(loadRegister()).toBe('practitioner');
  });
});

describe('setRegister', () => {
  it('sets data-register on documentElement', () => {
    setRegister('orientation');
    expect(document.documentElement.dataset.register).toBe('orientation');
  });

  it('persists to localStorage', () => {
    setRegister('orientation');
    expect(store.get(STORAGE_KEY)).toBe('orientation');
  });

  it('dispatches poc:register-change event', () => {
    const handler = vi.fn();
    window.addEventListener('poc:register-change', handler);

    setRegister('orientation');

    expect(handler).toHaveBeenCalledOnce();
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toMatchObject({
      register: 'orientation',
      requested: 'orientation',
      reason: null,
      message: null,
    });

    window.removeEventListener('poc:register-change', handler);
  });

  it('adds ?register=orientation to URL for orientation', () => {
    setRegister('orientation');
    expect(window.location.search).toContain('register=orientation');
  });

  it('removes register param from URL for practitioner', () => {
    setRegister('orientation');
    setRegister('practitioner');
    expect(window.location.search).not.toContain('register');
  });

  it('falls back visibly when setting an unavailable register', () => {
    setRegister('everyday');

    expect(document.documentElement.dataset.register).toBe('practitioner');
    expect(document.documentElement.dataset.registerRequested).toBe('everyday');
    expect(document.documentElement.dataset.registerFallbackReason).toBe('unavailable');
    expect(document.documentElement.dataset.registerFallbackMessage).toBe(
      'Everyday is not available for this page yet.',
    );
    expect(window.location.search).not.toContain('register=');
  });
});
