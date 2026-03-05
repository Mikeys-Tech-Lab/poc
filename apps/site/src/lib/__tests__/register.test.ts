// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getRegister, loadRegister, parseRegister, STORAGE_KEY, setRegister } from '../register';

const store = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
  removeItem: (key: string) => store.delete(key),
};

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', mockLocalStorage);
});

describe('parseRegister', () => {
  it('returns beginner for "beginner"', () => {
    expect(parseRegister('beginner')).toBe('beginner');
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

describe('getRegister', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.register;
  });

  it('reads from data-register attribute', () => {
    document.documentElement.dataset.register = 'beginner';
    expect(getRegister()).toBe('beginner');
  });

  it('defaults to practitioner when attribute is absent', () => {
    expect(getRegister()).toBe('practitioner');
  });
});

describe('loadRegister', () => {
  it('reads from localStorage', () => {
    store.set(STORAGE_KEY, 'beginner');
    expect(loadRegister()).toBe('beginner');
  });

  it('defaults to practitioner when localStorage is empty', () => {
    expect(loadRegister()).toBe('practitioner');
  });
});

describe('setRegister', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.register;
  });

  it('sets data-register on documentElement', () => {
    setRegister('beginner');
    expect(document.documentElement.dataset.register).toBe('beginner');
  });

  it('persists to localStorage', () => {
    setRegister('beginner');
    expect(store.get(STORAGE_KEY)).toBe('beginner');
  });

  it('dispatches poc:register-change event', () => {
    const handler = vi.fn();
    window.addEventListener('poc:register-change', handler);

    setRegister('beginner');

    expect(handler).toHaveBeenCalledOnce();
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual({ register: 'beginner' });

    window.removeEventListener('poc:register-change', handler);
  });

  it('adds ?register=beginner to URL for beginner', () => {
    setRegister('beginner');
    expect(window.location.search).toContain('register=beginner');
  });

  it('removes register param from URL for practitioner', () => {
    setRegister('beginner');
    setRegister('practitioner');
    expect(window.location.search).not.toContain('register');
  });
});
