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

export type RegisterFallbackReason = 'unknown' | 'unavailable';

export interface RegisterResolution {
  register: Register;
  resolved: Register;
  requested: Register | null;
  reason: RegisterFallbackReason | null;
  fallbackReason: RegisterFallbackReason | null;
  message: string | null;
  fallbackMessage: string | null;
  availability: RegisterAvailability;
}

export interface RegisterClientMetadata {
  requested: Register | null;
  resolved: Register;
  fallbackReason: RegisterFallbackReason | null;
  fallbackMessage: string | null;
}

export interface RegisterNoticeVisibilityOptions {
  fallbackMessage?: string | null;
  showRegisterFallbackNotices?: boolean;
  dismissedMessage?: string | null;
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
) => RegisterResolution;

const isEverydayOrientationFallback = (resolution: RegisterResolution): boolean =>
  resolution.requested === 'everyday' && resolution.resolved === 'orientation';

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
  resolveRegister(
    document.documentElement.dataset.registerResolved ?? document.documentElement.dataset.register,
  ).resolved;

export const loadRegister = (): Register =>
  resolveRegister(typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY))
    .resolved;

const isRegisterFallbackReason = (value: string | undefined): value is RegisterFallbackReason =>
  value === 'unknown' || value === 'unavailable';

const readPositiveBoolean = (value: string | undefined, fallback = true): boolean => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
};

const getPreferredRegisterValue = (resolution: RegisterResolution): Register =>
  isEverydayOrientationFallback(resolution) ? 'everyday' : resolution.resolved;

function syncUrlParam(resolution: RegisterResolution): void {
  const url = new URL(window.location.href);
  const register = getPreferredRegisterValue(resolution);
  if (register === resolution.availability.defaultRegister) {
    url.searchParams.delete('register');
  } else {
    url.searchParams.set('register', register);
  }
  history.replaceState(null, '', url);
}

function syncRegisterMetadata(resolution: RegisterResolution): void {
  const dataset = document.documentElement.dataset;
  dataset.registerResolved = resolution.resolved;
  if (resolution.requested) {
    dataset.registerRequested = resolution.requested;
  } else {
    delete dataset.registerRequested;
  }
  if (resolution.fallbackReason && resolution.fallbackMessage) {
    dataset.registerFallbackReason = resolution.fallbackReason;
    dataset.registerFallbackMessage = resolution.fallbackMessage;
    return;
  }

  delete dataset.registerFallbackReason;
  delete dataset.registerFallbackMessage;
}

export const getRegisterClientMetadata = (): RegisterClientMetadata => {
  const dataset = document.documentElement.dataset;

  return {
    requested:
      typeof dataset.registerRequested === 'string' && isReadingRegister(dataset.registerRequested)
        ? asRegister(dataset.registerRequested)
        : null,
    resolved:
      typeof dataset.registerResolved === 'string' && isReadingRegister(dataset.registerResolved)
        ? asRegister(dataset.registerResolved)
        : getRegister(),
    fallbackReason: isRegisterFallbackReason(dataset.registerFallbackReason)
      ? dataset.registerFallbackReason
      : null,
    fallbackMessage:
      typeof dataset.registerFallbackMessage === 'string' && dataset.registerFallbackMessage.trim()
        ? dataset.registerFallbackMessage
        : null,
  };
};

export const shouldShowRegisterFallbackNotice = ({
  fallbackMessage = getRegisterClientMetadata().fallbackMessage,
  showRegisterFallbackNotices = readPositiveBoolean(
    document.documentElement.dataset.a11yShowRegisterFallbackNotices,
    true,
  ),
  dismissedMessage = null,
}: RegisterNoticeVisibilityOptions = {}): boolean =>
  Boolean(fallbackMessage && showRegisterFallbackNotices && fallbackMessage !== dismissedMessage);

const syncPreferredRegister = (resolution: RegisterResolution): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, getPreferredRegisterValue(resolution));
};

export function setRegister(register: Register): void {
  const resolution = resolveRegister(register);
  document.documentElement.dataset.register = resolution.resolved;
  syncRegisterMetadata(resolution);
  syncPreferredRegister(resolution);
  syncUrlParam(resolution);
  window.dispatchEvent(new CustomEvent('poc:register-change', { detail: resolution }));
}
