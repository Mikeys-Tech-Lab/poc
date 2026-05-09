import { describe, expect, it } from 'vitest';

import {
  buildRouteRedirects,
  getRegisterAvailabilityForPath,
  getRegisterAvailabilityForRouteId,
  LOCALE_PREFIX,
  ROUTE_MAP,
} from '../route-map.js';

describe('route map', () => {
  it('keeps route ids unique', () => {
    const ids = ROUTE_MAP.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('derives redirects from the route map without chains', () => {
    const redirects = buildRouteRedirects();
    const redirectEntries = ROUTE_MAP.filter(
      (entry) => entry.redirect && entry.oldPath && entry.oldPath !== entry.newPath,
    );
    const redirectSources = new Set(Object.keys(redirects));

    for (const entry of redirectEntries) {
      const oldWithoutSlash = `${LOCALE_PREFIX}/${entry.oldPath}`;
      const target = `${LOCALE_PREFIX}/${entry.newPath}/`;

      expect(redirects[oldWithoutSlash]).toBe(target);
      expect(redirectSources.has(target)).toBe(false);
    }
  });

  it('declares register availability for every route', () => {
    for (const entry of ROUTE_MAP) {
      expect(entry).not.toHaveProperty('hasRegisterPair');
      expect(entry.registerAvailability.defaultRegister).toBe('practitioner');
      if (entry.id === 'signal-structural-essays') {
        expect(entry.registerAvailability.available).toEqual([
          'everyday',
          'orientation',
          'practitioner',
        ]);
        expect(entry.registerAvailability.absent).toEqual({});
        continue;
      }

      expect(entry.registerAvailability.available).toEqual(['practitioner', 'orientation']);
      expect(entry.registerAvailability.absent).toEqual({
        everyday: 'Everyday is not available for this page yet.',
      });
    }
  });

  it('resolves register availability by route id', () => {
    expect(getRegisterAvailabilityForRouteId('about-what-this-is')).toMatchObject({
      defaultRegister: 'practitioner',
      available: ['practitioner', 'orientation'],
    });
  });

  it('resolves register availability by localized path', () => {
    expect(getRegisterAvailabilityForPath('/en-us/about/what-this-is/')).toMatchObject({
      defaultRegister: 'practitioner',
      available: ['practitioner', 'orientation'],
      absent: {
        everyday: 'Everyday is not available for this page yet.',
      },
    });
  });

  it('enables all three registers for the structural essays overview', () => {
    expect(getRegisterAvailabilityForPath('/en-us/signals/structural-essays/')).toEqual({
      defaultRegister: 'practitioner',
      available: ['everyday', 'orientation', 'practitioner'],
      absent: {},
    });
  });
});
