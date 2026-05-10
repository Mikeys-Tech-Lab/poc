/**
 * Client-side accessibility preference management.
 *
 * Preferences are stored in localStorage as a JSON object under STORAGE_KEY.
 * Initial state is applied by ThemeProvider.astro via an inline script to
 * prevent FOUC. This module handles subsequent runtime changes.
 *
 * The inline script in ThemeProvider cannot use ES imports, so the storage key,
 * default values, and parsing logic are intentionally duplicated there.
 * If the key or defaults change, update both locations.
 *
 * State changes dispatch 'poc:a11y-change' on window so any component can
 * react without coupling to the preferences panel.
 */

export type A11yContrast = 'default' | 'more';
export type A11yTextSize = '100' | '125' | '150' | '175' | '200';
export type A11yMotion = 'default' | 'reduce';
export type A11yLinks = 'default' | 'underline';
export type A11yFont = 'default' | 'alt';

export interface A11yPreferences {
  contrast: A11yContrast;
  text: A11yTextSize;
  motion: A11yMotion;
  links: A11yLinks;
  font: A11yFont;
  showRegisterFallbackNotices: boolean;
}

export const STORAGE_KEY = 'poc-a11y';

export const DEFAULTS: Readonly<A11yPreferences> = {
  contrast: 'default',
  text: '100',
  motion: 'default',
  links: 'default',
  font: 'default',
  showRegisterFallbackNotices: true,
};

export function parsePreferences(raw: unknown): A11yPreferences {
  if (!raw || typeof raw !== 'object') return { ...DEFAULTS };
  const obj = raw as Record<string, unknown>;
  return {
    contrast: obj.contrast === 'more' ? 'more' : 'default',
    text:
      obj.text === '125'
        ? '125'
        : obj.text === '150'
          ? '150'
          : obj.text === '175'
            ? '175'
            : obj.text === '200'
              ? '200'
              : '100',
    motion: obj.motion === 'reduce' ? 'reduce' : 'default',
    links: obj.links === 'underline' ? 'underline' : 'default',
    font: obj.font === 'alt' ? 'alt' : 'default',
    showRegisterFallbackNotices: obj.showRegisterFallbackNotices !== false,
  };
}

export function loadPreferences(): A11yPreferences {
  if (typeof localStorage === 'undefined') return { ...DEFAULTS };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parsePreferences(JSON.parse(stored)) : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

export function applyToDocument(prefs: A11yPreferences): void {
  const el = document.documentElement;
  el.dataset.a11yContrast = prefs.contrast;
  el.dataset.a11yText = prefs.text;
  el.dataset.a11yMotion = prefs.motion;
  el.dataset.a11yLinks = prefs.links;
  el.dataset.a11yFont = prefs.font;
  el.dataset.a11yShowRegisterFallbackNotices = prefs.showRegisterFallbackNotices ? 'true' : 'false';
}

export function setPreferences(prefs: A11yPreferences): void {
  applyToDocument(prefs);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }
  window.dispatchEvent(new CustomEvent('poc:a11y-change', { detail: { ...prefs } }));
}

export function resetPreferences(): void {
  setPreferences({ ...DEFAULTS });
}
