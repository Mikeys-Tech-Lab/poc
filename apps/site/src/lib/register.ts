/**
 * Client-side register state management.
 *
 * Initial state is set by ThemeProvider.astro via an inline script to prevent
 * FOUC. This module handles subsequent state changes: toggle, persistence,
 * URL sync. The inline script cannot import modules (Vite does not process
 * is:inline scripts), so the storage key and parsing logic are intentionally
 * duplicated there. The source of truth for the key value is STORAGE_KEY here.
 *
 * State changes dispatch 'poc:register-change' on window so any component
 * can react without coupling to the toggle component.
 */

export type Register = 'practitioner' | 'orientation';

export const STORAGE_KEY = 'poc-register';

export const parseRegister = (value: unknown): Register =>
  value === 'orientation' ? 'orientation' : 'practitioner';

export const getRegister = (): Register => parseRegister(document.documentElement.dataset.register);

export const loadRegister = (): Register =>
  parseRegister(typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY));

function syncUrlParam(register: Register): void {
  const url = new URL(window.location.href);
  if (register === 'orientation') {
    url.searchParams.set('register', 'orientation');
  } else {
    url.searchParams.delete('register');
  }
  history.replaceState(null, '', url);
}

export function setRegister(register: Register): void {
  document.documentElement.dataset.register = register;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, register);
  }
  syncUrlParam(register);
  window.dispatchEvent(new CustomEvent('poc:register-change', { detail: { register } }));
}
