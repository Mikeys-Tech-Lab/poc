// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_REGISTER,
  getRegister,
  getRegisterAvailability,
  getRegisterClientMetadata,
  loadRegister,
  parseRegister,
  READING_REGISTERS,
  resolveRegister,
  STORAGE_KEY,
  setRegister,
  shouldShowRegisterFallbackNotice,
} from '../register';

const EVERYDAY_BASE_MESSAGE = 'Everyday is not available for this page yet.';
const EVERYDAY_FALLBACK_MESSAGE =
  'Everyday is not available for this page yet. Showing Orientation instead.';

const ORIENTATION_FALLBACK_AVAILABILITY = {
  defaultRegister: 'practitioner',
  available: ['orientation', 'practitioner'],
  absent: {
    everyday: EVERYDAY_BASE_MESSAGE,
  },
} as const;

const ALL_REGISTER_AVAILABILITY = {
  defaultRegister: 'practitioner',
  available: ['everyday', 'orientation', 'practitioner'],
  absent: {},
} as const;

const PRACTITIONER_ONLY_AVAILABILITY = {
  defaultRegister: 'practitioner',
  available: ['practitioner'],
  absent: {
    everyday: EVERYDAY_BASE_MESSAGE,
    orientation: 'Orientation is not available for this page yet.',
  },
} as const;

const store = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
  removeItem: (key: string) => store.delete(key),
};

const setAvailabilityOnDocument = (availability: {
  defaultRegister: string;
  available: readonly string[];
  absent: Record<string, string>;
}): void => {
  document.documentElement.dataset.registerDefault = availability.defaultRegister;
  document.documentElement.dataset.registerAvailable = availability.available.join(',');
  document.documentElement.dataset.registerAbsent = JSON.stringify(availability.absent);
};

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', mockLocalStorage);
  history.replaceState(null, '', '/en-us/about/what-this-is/');
  delete document.documentElement.dataset.register;
  delete document.documentElement.dataset.registerResolved;
  delete document.documentElement.dataset.registerDefault;
  delete document.documentElement.dataset.registerAvailable;
  delete document.documentElement.dataset.registerAbsent;
  delete document.documentElement.dataset.registerFallbackReason;
  delete document.documentElement.dataset.registerFallbackMessage;
  delete document.documentElement.dataset.registerRequested;
  delete document.documentElement.dataset.a11yShowRegisterFallbackNotices;
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
        everyday: EVERYDAY_BASE_MESSAGE,
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

  it('keeps everyday when it is available', () => {
    const result = resolveRegister('everyday', ALL_REGISTER_AVAILABILITY);

    expect(result).toMatchObject({
      register: 'everyday',
      resolved: 'everyday',
      requested: 'everyday',
      fallbackReason: null,
      fallbackMessage: null,
    });
  });

  it('uses orientation when everyday is unavailable but orientation exists', () => {
    const result = resolveRegister('everyday', ORIENTATION_FALLBACK_AVAILABILITY);

    expect(result).toMatchObject({
      register: 'orientation',
      resolved: 'orientation',
      requested: 'everyday',
      reason: 'unavailable',
      fallbackReason: 'unavailable',
      message: EVERYDAY_FALLBACK_MESSAGE,
      fallbackMessage: EVERYDAY_FALLBACK_MESSAGE,
    });
  });

  it('falls back to the default register when orientation is also unavailable', () => {
    const result = resolveRegister('everyday', PRACTITIONER_ONLY_AVAILABILITY);

    expect(result).toMatchObject({
      register: 'practitioner',
      resolved: 'practitioner',
      requested: 'everyday',
      reason: 'unavailable',
      fallbackReason: 'unavailable',
      message: EVERYDAY_BASE_MESSAGE,
      fallbackMessage: EVERYDAY_BASE_MESSAGE,
    });
  });

  it('falls back visibly for an unknown register', () => {
    const result = resolveRegister('unknown');

    expect(result.register).toBe('practitioner');
    expect(result.requested).toBeNull();
    expect(result.reason).toBe('unknown');
    expect(result.fallbackReason).toBe('unknown');
  });
});

describe('getRegister', () => {
  it('reads from data-register attribute', () => {
    document.documentElement.dataset.register = 'orientation';
    expect(getRegister()).toBe('orientation');
  });

  it('prefers the resolved metadata when present', () => {
    document.documentElement.dataset.register = 'practitioner';
    document.documentElement.dataset.registerResolved = 'orientation';
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

  it('resolves stored everyday to orientation when that is the route fallback', () => {
    setAvailabilityOnDocument(ORIENTATION_FALLBACK_AVAILABILITY);
    store.set(STORAGE_KEY, 'everyday');
    expect(loadRegister()).toBe('orientation');
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

  it('dispatches poc:register-change event with requested and resolved metadata', () => {
    const handler = vi.fn();
    window.addEventListener('poc:register-change', handler);

    setRegister('orientation');

    expect(handler).toHaveBeenCalledOnce();
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toMatchObject({
      register: 'orientation',
      resolved: 'orientation',
      requested: 'orientation',
      reason: null,
      fallbackReason: null,
      message: null,
      fallbackMessage: null,
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

  it('preserves requested everyday in the URL when orientation is rendered instead', () => {
    setAvailabilityOnDocument(ORIENTATION_FALLBACK_AVAILABILITY);

    setRegister('everyday');

    expect(document.documentElement.dataset.register).toBe('orientation');
    expect(document.documentElement.dataset.registerResolved).toBe('orientation');
    expect(document.documentElement.dataset.registerRequested).toBe('everyday');
    expect(document.documentElement.dataset.registerFallbackReason).toBe('unavailable');
    expect(document.documentElement.dataset.registerFallbackMessage).toBe(
      EVERYDAY_FALLBACK_MESSAGE,
    );
    expect(window.location.search).toContain('register=everyday');
    expect(store.get(STORAGE_KEY)).toBe('everyday');
    expect(getRegisterClientMetadata()).toEqual({
      requested: 'everyday',
      resolved: 'orientation',
      fallbackReason: 'unavailable',
      fallbackMessage: EVERYDAY_FALLBACK_MESSAGE,
    });
  });
});

describe('shouldShowRegisterFallbackNotice', () => {
  it('shows notices when a fallback message exists and the preference is enabled', () => {
    document.documentElement.dataset.registerFallbackMessage = EVERYDAY_FALLBACK_MESSAGE;

    expect(shouldShowRegisterFallbackNotice()).toBe(true);
  });

  it('hides notices when the preference is disabled', () => {
    document.documentElement.dataset.registerFallbackMessage = EVERYDAY_FALLBACK_MESSAGE;
    document.documentElement.dataset.a11yShowRegisterFallbackNotices = 'false';

    expect(shouldShowRegisterFallbackNotice()).toBe(false);
  });

  it('hides the current notice after it is dismissed', () => {
    expect(
      shouldShowRegisterFallbackNotice({
        fallbackMessage: EVERYDAY_FALLBACK_MESSAGE,
        showRegisterFallbackNotices: true,
        dismissedMessage: EVERYDAY_FALLBACK_MESSAGE,
      }),
    ).toBe(false);
  });
});
