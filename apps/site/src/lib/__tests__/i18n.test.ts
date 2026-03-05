import { describe, it, expect } from 'vitest';
import { getRegisterLabels, getThemeLabels } from '../i18n';
import { LOCALES } from './test-constants';
import type { Locale } from '../locale';

describe('getRegisterLabels', () => {
  it.each(LOCALES)('returns labels for %s', (locale) => {
    const labels = getRegisterLabels(locale);
    expect(labels).toHaveProperty('practitioner');
    expect(labels).toHaveProperty('beginner');
    expect(typeof labels.practitioner).toBe('string');
    expect(typeof labels.beginner).toBe('string');
    expect(labels.practitioner.length).toBeGreaterThan(0);
    expect(labels.beginner.length).toBeGreaterThan(0);
  });

  it('returns German labels for de-DE', () => {
    const labels = getRegisterLabels('de-DE');
    expect(labels.practitioner).toBe('Praktiker');
    expect(labels.beginner).toBe('Anfänger');
  });

  it('falls back to en-US for unknown locale', () => {
    const labels = getRegisterLabels('fr-FR' as Locale);
    expect(labels.practitioner).toBe('Practitioner');
    expect(labels.beginner).toBe('Beginner');
  });
});

describe('getThemeLabels', () => {
  it.each(LOCALES)('returns all four theme labels for %s', (locale) => {
    const labels = getThemeLabels(locale);
    expect(labels).toHaveProperty('darkAtmospheric');
    expect(labels).toHaveProperty('lightAtmospheric');
    expect(labels).toHaveProperty('darkSolid');
    expect(labels).toHaveProperty('lightSolid');
  });

  it('returns German theme labels for de-DE', () => {
    const labels = getThemeLabels('de-DE');
    expect(labels.darkAtmospheric).toBe('Dunkel Atmosphärisch');
    expect(labels.lightSolid).toBe('Hell Solide');
  });

  it('falls back to en-US for unknown locale', () => {
    const labels = getThemeLabels('fr-FR' as Locale);
    expect(labels.darkAtmospheric).toBe('Dark Atmospheric');
  });
});
