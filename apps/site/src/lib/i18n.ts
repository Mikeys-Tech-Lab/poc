/**
 * Server-side label maps for locale-dependent UI strings.
 *
 * Starlight's built-in i18n handles standard UI labels. This module covers
 * custom labels introduced by this site: register names and theme variant
 * names. When adding a locale, add entries to each map.
 */

import type { Locale } from './locale';

export interface RegisterLabels {
  practitioner: string;
  beginner: string;
}

export interface ThemeLabels {
  darkAtmospheric: string;
  lightAtmospheric: string;
  darkSolid: string;
  lightSolid: string;
}

const registerLabels: Record<Locale, RegisterLabels> = {
  'en-US': { practitioner: 'Practitioner', beginner: 'Beginner' },
  'en-GB': { practitioner: 'Practitioner', beginner: 'Beginner' },
  'de-DE': { practitioner: 'Praktiker', beginner: 'Anfänger' },
};

const themeLabels: Record<Locale, ThemeLabels> = {
  'en-US': {
    darkAtmospheric: 'Dark Atmospheric',
    lightAtmospheric: 'Light Atmospheric',
    darkSolid: 'Dark Solid',
    lightSolid: 'Light Solid',
  },
  'en-GB': {
    darkAtmospheric: 'Dark Atmospheric',
    lightAtmospheric: 'Light Atmospheric',
    darkSolid: 'Dark Solid',
    lightSolid: 'Light Solid',
  },
  'de-DE': {
    darkAtmospheric: 'Dunkel Atmosphärisch',
    lightAtmospheric: 'Hell Atmosphärisch',
    darkSolid: 'Dunkel Solide',
    lightSolid: 'Hell Solide',
  },
};

export function getRegisterLabels(locale: Locale): RegisterLabels {
  return registerLabels[locale] ?? registerLabels['en-US'];
}

export function getThemeLabels(locale: Locale): ThemeLabels {
  return themeLabels[locale] ?? themeLabels['en-US'];
}
