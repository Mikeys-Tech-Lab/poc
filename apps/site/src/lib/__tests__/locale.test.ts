import { describe, expect, it } from 'vitest';
import { getLocaleBase, getLocaleFromPath } from '../locale';
import { LOCALE_PREFIXES } from './test-constants';

describe('getLocaleFromPath', () => {
  it.each([
    ['/en-us/', 'en-US'],
    ['/en-us/about/what-this-is/', 'en-US'],
    [
      '/en-us/writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding/',
      'en-US',
    ],
  ])('resolves %s to %s', (pathname, expected) => {
    expect(getLocaleFromPath(pathname)).toBe(expected);
  });

  it('defaults to en-US for unrecognised path', () => {
    expect(getLocaleFromPath('/')).toBe('en-US');
  });

  it('defaults to en-US for unknown prefix', () => {
    expect(getLocaleFromPath('/fr-fr/about/')).toBe('en-US');
  });

  it('defaults to en-US for empty string', () => {
    expect(getLocaleFromPath('')).toBe('en-US');
  });

  it('covers all configured locale prefixes', () => {
    for (const prefix of LOCALE_PREFIXES) {
      const result = getLocaleFromPath(prefix);
      expect(result).toBe('en-US');
    }
  });
});

describe('getLocaleBase', () => {
  it.each([
    ['/en-us/about/', '/en-us'],
    [
      '/en-us/writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding/',
      '/en-us',
    ],
  ])('returns base for %s', (pathname, expected) => {
    expect(getLocaleBase(pathname)).toBe(expected);
  });

  it('returns empty string for unknown paths', () => {
    expect(getLocaleBase('/')).toBe('');
    expect(getLocaleBase('/fr-fr/')).toBe('');
    expect(getLocaleBase('')).toBe('');
  });

  it('strips trailing slash from prefix', () => {
    const base = getLocaleBase('/en-us/test/');
    expect(base.endsWith('/')).toBe(false);
  });
});
