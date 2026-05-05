/**
 * Client-side register state management.
 *
 * Initial state is set by ThemeProvider.astro via an inline script to prevent
 * FOUC. This module handles subsequent state changes: selector changes,
 * persistence, URL sync, and visible fallback metadata. The inline script
 * cannot import modules (Vite does not process is:inline scripts), so the
 * storage key and parsing logic are intentionally duplicated there. The source
 * of truth for the key value is STORAGE_KEY here.
 *
 * State changes dispatch 'poc:register-change' on window so any component
 * can react without coupling to the toggle component.
 */

import {
  DEFAULT_REGISTER,
  DEFAULT_REGISTER_AVAILABILITY,
  isReadingRegister,
  normalizeRegisterAvailability,
  READING_REGISTERS,
  resolveRegister as resolveRegisteredValue,
} from './register-registry.js';

export type Register = 'everyday' | 'orientation' | 'practitioner';

export interface RegisterAvailability {
  defaultRegister: Register;
  available: readonly Register[];
  absent: Partial<Record<Register, string>>;
}

export const STORAGE_KEY = 'poc-register';
export { DEFAULT_REGISTER, READING_REGISTERS };

const asRegister = (value: string): Register => value as Register;
const normalizeAvailability = normalizeRegisterAvailability as (
  availability: RegisterAvailability,
) => RegisterAvailability;
const resolveRegisteredAvailability = resolveRegisteredValue as (
  value: unknown,
  availability: RegisterAvailability,
) => {
  register: Register;
  requested: Register | null;
  reason: 'unknown' | 'unavailable' | null;
  message: string | null;
  availability: RegisterAvailability;
};

export const parseRegister = (value: unknown): Register =>
  typeof value === 'string' && isReadingRegister(value)
    ? asRegister(value)
    : asRegister(DEFAULT_REGISTER);

const parseAbsentRegisters = (value: string | undefined): Partial<Record<Register, string>> => {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([register, message]) => isReadingRegister(register) && typeof message === 'string',
      ),
    ) as Partial<Record<Register, string>>;
  } catch {
    return {};
  }
};

export const getRegisterAvailability = (): RegisterAvailability => {
  const dataset = document.documentElement.dataset;
  const available = (dataset.registerAvailable ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter((value) => isReadingRegister(value))
    .map(asRegister);
  const fallbackAvailability = DEFAULT_REGISTER_AVAILABILITY as unknown as RegisterAvailability;

  return normalizeAvailability({
    defaultRegister:
      typeof dataset.registerDefault === 'string' && isReadingRegister(dataset.registerDefault)
        ? asRegister(dataset.registerDefault)
        : fallbackAvailability.defaultRegister,
    available: available.length > 0 ? available : fallbackAvailability.available,
    absent: {
      ...fallbackAvailability.absent,
      ...parseAbsentRegisters(dataset.registerAbsent),
    },
  }) as RegisterAvailability;
};

export const resolveRegister = (value: unknown, availability = getRegisterAvailability()) =>
  resolveRegisteredAvailability(value, availability);

export const getRegister = (): Register =>
  resolveRegister(document.documentElement.dataset.register).register;

export const loadRegister = (): Register =>
  resolveRegister(typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY))
    .register;

function syncUrlParam(register: Register, availability: RegisterAvailability): void {
  const url = new URL(window.location.href);
  if (register === availability.defaultRegister) {
    url.searchParams.delete('register');
  } else {
    url.searchParams.set('register', register);
  }
  history.replaceState(null, '', url);
}

function syncFallbackMetadata(resolution: ReturnType<typeof resolveRegister>): void {
  const dataset = document.documentElement.dataset;
  if (resolution.reason && resolution.message) {
    dataset.registerFallbackReason = resolution.reason;
    dataset.registerFallbackMessage = resolution.message;
    if (resolution.requested) {
      dataset.registerRequested = resolution.requested;
    } else {
      delete dataset.registerRequested;
    }
    return;
  }

  delete dataset.registerFallbackReason;
  delete dataset.registerFallbackMessage;
  delete dataset.registerRequested;
}

export function setRegister(register: Register): void {
  const resolution = resolveRegister(register);
  document.documentElement.dataset.register = resolution.register;
  syncFallbackMetadata(resolution);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, resolution.register);
  }
  syncUrlParam(resolution.register, resolution.availability);
  window.dispatchEvent(new CustomEvent('poc:register-change', { detail: resolution }));
}
