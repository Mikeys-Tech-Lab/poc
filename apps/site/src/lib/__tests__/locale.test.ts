import { describe, it, expect } from 'vitest';
import { getLocaleFromPath, getLocaleBase } from '../locale';
import { LOCALE_PREFIXES } from './test-constants';

describe('getLocaleFromPath', () => {
  it.each([
    ['/en-us/', 'en-US'],
    ['/en-us/about/what-this-is/', 'en-US'],
    ['/en-gb/', 'en-GB'],
    ['/en-gb/articles/placeholder/', 'en-GB'],
    ['/de-de/', 'de-DE'],
    ['/de-de/licenses/mit/', 'de-DE'],
  ])('resolves %s to %s', (pathname, expected) => {
    expect(getLocaleFromPath(pathname)).toBe(expected);
  });

  it('defaults to en-US for root path', () => {
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
      expect(result).toMatch(/^(en-US|en-GB|de-DE)$/);
    }
  });
});

describe('getLocaleBase', () => {
  it.each([
    ['/en-us/about/', '/en-us'],
    ['/en-gb/about/', '/en-gb'],
    ['/de-de/licenses/mit/', '/de-de'],
  ])('returns base for %s', (pathname, expected) => {
    expect(getLocaleBase(pathname)).toBe(expected);
  });

  it('returns /en-us for root or unknown paths', () => {
    expect(getLocaleBase('/')).toBe('/en-us');
    expect(getLocaleBase('/fr-fr/')).toBe('/en-us');
    expect(getLocaleBase('')).toBe('/en-us');
  });

  it('strips trailing slash from prefix', () => {
    const base = getLocaleBase('/en-gb/test/');
    expect(base.endsWith('/')).toBe(false);
  });
});
