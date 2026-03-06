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
  orientation: string;
}

export interface ThemeLabels {
  darkAtmospheric: string;
  lightAtmospheric: string;
  darkSolid: string;
  lightSolid: string;
}

const registerLabels: Record<Locale, RegisterLabels> = {
  'en-US': { practitioner: 'Practitioner', orientation: 'Orientation' },
  'en-GB': { practitioner: 'Practitioner', orientation: 'Orientation' },
  'de-DE': { practitioner: 'Praktiker', orientation: 'Orientierung' },
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

export interface A11yLabels {
  panelTitle: string;
  contrast: string;
  contrastMore: string;
  contrastDefault: string;
  textSize: string;
  reduceMotion: string;
  solidShortcut: string;
  underlineLinks: string;
  altFont: string;
  reset: string;
  close: string;
  openPanel: string;
}

const a11yLabels: Record<Locale, A11yLabels> = {
  'en-US': {
    panelTitle: 'Accessibility',
    contrast: 'Increase contrast',
    contrastMore: 'More',
    contrastDefault: 'Default',
    textSize: 'Text size',
    reduceMotion: 'Reduce motion',
    solidShortcut: 'Solid (max readability)',
    underlineLinks: 'Underline links',
    altFont: 'Alternate font',
    reset: 'Reset to defaults',
    close: 'Close',
    openPanel: 'Accessibility settings',
  },
  'en-GB': {
    panelTitle: 'Accessibility',
    contrast: 'Increase contrast',
    contrastMore: 'More',
    contrastDefault: 'Default',
    textSize: 'Text size',
    reduceMotion: 'Reduce motion',
    solidShortcut: 'Solid (max readability)',
    underlineLinks: 'Underline links',
    altFont: 'Alternate font',
    reset: 'Reset to defaults',
    close: 'Close',
    openPanel: 'Accessibility settings',
  },
  'de-DE': {
    panelTitle: 'Barrierefreiheit',
    contrast: 'Kontrast erhöhen',
    contrastMore: 'Mehr',
    contrastDefault: 'Standard',
    textSize: 'Textgröße',
    reduceMotion: 'Bewegung reduzieren',
    solidShortcut: 'Solide (beste Lesbarkeit)',
    underlineLinks: 'Links unterstreichen',
    altFont: 'Alternative Schrift',
    reset: 'Zurücksetzen',
    close: 'Schließen',
    openPanel: 'Barrierefreiheit-Einstellungen',
  },
};

export function getRegisterLabels(locale: Locale): RegisterLabels {
  return registerLabels[locale] ?? registerLabels['en-US'];
}

export function getThemeLabels(locale: Locale): ThemeLabels {
  return themeLabels[locale] ?? themeLabels['en-US'];
}

export function getA11yLabels(locale: Locale): A11yLabels {
  return a11yLabels[locale] ?? a11yLabels['en-US'];
}
