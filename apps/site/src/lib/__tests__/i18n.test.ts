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

  it('returns en-US labels', () => {
    const labels = getRegisterLabels('en-US');
    expect(labels.practitioner).toBe('Practitioner');
    expect(labels.orientation).toBe('Orientation');
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

  it('returns en-US theme labels', () => {
    const labels = getThemeLabels('en-US');
    expect(labels.darkAtmospheric).toBe('Dark Atmospheric');
    expect(labels.lightSolid).toBe('Light Solid');
  });

  it('falls back to en-US for unknown locale', () => {
    const labels = getThemeLabels('fr-FR' as Locale);
    expect(labels.darkAtmospheric).toBe('Dark Atmospheric');
  });
});
