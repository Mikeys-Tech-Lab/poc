/**
 * Server-side label maps for locale-dependent UI strings.
 *
 * Starlight's built-in i18n handles standard UI labels. This module covers
 * custom labels introduced by this site: register names and theme variant
 * names. When adding a locale, add entries to each map.
 */

import type { Locale } from './locale';

export interface RegisterLabels {
  everyday: string;
  practitioner: string;
  orientation: string;
  everydayHelper: string;
  practitionerHelper: string;
  orientationHelper: string;
  selectorLabel: string;
  unavailableSuffix: string;
  controlDescription: string;
  closeControl: string;
}

export interface ThemeLabels {
  darkAtmospheric: string;
  lightAtmospheric: string;
  darkSolid: string;
  lightSolid: string;
}

const registerLabels: Record<Locale, RegisterLabels> = {
  'en-US': {
    everyday: 'Everyday',
    practitioner: 'Practitioner',
    orientation: 'Orientation',
    everydayHelper: 'Starts from familiar situations',
    practitionerHelper: 'Keeps the working detail and trace',
    orientationHelper: 'Builds the practice step by step',
    selectorLabel: 'Reading register',
    unavailableSuffix: 'not available yet',
    controlDescription: 'Choose how this page is written.',
    closeControl: 'Close register controls',
  },
};

const themeLabels: Record<Locale, ThemeLabels> = {
  'en-US': {
    darkAtmospheric: 'Dark Atmospheric',
    lightAtmospheric: 'Light Atmospheric',
    darkSolid: 'Dark Solid',
    lightSolid: 'Light Solid',
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
    solidShortcut: 'Solid background for higher contrast',
    underlineLinks: 'Underline links',
    altFont: 'Alternate font',
    reset: 'Reset to defaults',
    close: 'Close',
    openPanel: 'Accessibility settings',
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
