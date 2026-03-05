import { describe, expect, it } from 'vitest';
import { parseVersion } from '../domain/parse-version.js';

describe('parseVersion', () => {
  it('parses a standard semver string', () => {
    const result = parseVersion('25.6.1');
    expect(result).toEqual({
      raw: '25.6.1',
      major: 25,
      minor: 6,
      patch: 1,
    });
  });

  it('extracts version from a prefixed string', () => {
    const result = parseVersion('v10.30.1');
    expect(result).toEqual({
      raw: '10.30.1',
      major: 10,
      minor: 30,
      patch: 1,
    });
  });

  it('extracts version from a string with trailing text', () => {
    const result = parseVersion('pnpm 10.30.1 (some extra info)');
    expect(result).toEqual({
      raw: '10.30.1',
      major: 10,
      minor: 30,
      patch: 1,
    });
  });

  it('returns null for non-version strings', () => {
    expect(parseVersion('not a version')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseVersion('')).toBeNull();
  });

  it('handles whitespace', () => {
    const result = parseVersion('  5.8.2  \n');
    expect(result).toEqual({
      raw: '5.8.2',
      major: 5,
      minor: 8,
      patch: 2,
    });
  });
});
