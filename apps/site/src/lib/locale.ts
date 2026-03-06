/**
 * Server-side locale detection from URL pathname.
 *
 * Used in Astro frontmatter to resolve the active locale for i18n lookups
 * and locale-aware links. When adding a new locale, add it here and in
 * astro.config.mjs locales.
 */

export type Locale = 'en-US' | 'en-GB' | 'de-DE';

const LOCALE_PREFIXES: Record<string, Locale> = {
  '/en-gb/': 'en-GB',
  '/de-de/': 'de-DE',
};

const DEFAULT_LOCALE: Locale = 'en-US';

export function getLocaleFromPath(pathname: string): Locale {
  for (const [prefix, locale] of Object.entries(LOCALE_PREFIXES)) {
    if (pathname.startsWith(prefix)) return locale;
  }
  return DEFAULT_LOCALE;
}

export function getLocaleBase(pathname: string): string {
  for (const prefix of Object.keys(LOCALE_PREFIXES)) {
    if (pathname.startsWith(prefix)) return prefix.slice(0, -1);
  }
  return '';
}
