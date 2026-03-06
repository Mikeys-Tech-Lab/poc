import { describe, expect, it } from 'vitest';
import { getRegisterLabels, getThemeLabels } from '../i18n';
import type { Locale } from '../locale';
import { LOCALES } from './test-constants';

describe('getRegisterLabels', () => {
  it.each(LOCALES)('returns labels for %s', (locale) => {
    const labels = getRegisterLabels(locale);
    expect(labels).toHaveProperty('practitioner');
    expect(labels).toHaveProperty('orientation');
    expect(typeof labels.practitioner).toBe('string');
    expect(typeof labels.orientation).toBe('string');
    expect(labels.practitioner.length).toBeGreaterThan(0);
    expect(labels.orientation.length).toBeGreaterThan(0);
  });

  it('returns German labels for de-DE', () => {
    const labels = getRegisterLabels('de-DE');
    expect(labels.practitioner).toBe('Praktiker');
    expect(labels.orientation).toBe('Orientierung');
  });

  it('falls back to en-US for unknown locale', () => {
    const labels = getRegisterLabels('fr-FR' as Locale);
    expect(labels.practitioner).toBe('Practitioner');
    expect(labels.orientation).toBe('Orientation');
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
