import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  buildRouteRedirects,
  getRegisterAvailabilityForPath,
  getRegisterAvailabilityForRouteId,
  LOCALE_PREFIX,
  ROUTE_MAP,
} from '../route-map.js';

const repoRoot = new URL('../../../../../', import.meta.url);
const threeRegisterRouteIds = [
  'about-how-to-inspect-this-node',
  'signal-structural-essays',
  'signal-ai-is-not-magic-it-is-a-mirror-with-a-motor',
] as const;

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
      if (threeRegisterRouteIds.includes(entry.id as (typeof threeRegisterRouteIds)[number])) {
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

  it('enables all three registers for the node inspection about page', () => {
    expect(getRegisterAvailabilityForPath('/en-us/about/how-to-inspect-this-node/')).toEqual({
      defaultRegister: 'practitioner',
      available: ['everyday', 'orientation', 'practitioner'],
      absent: {},
    });
  });

  it('enables all three registers for the structural essays overview', () => {
    expect(getRegisterAvailabilityForPath('/en-us/signals/structural-essays/')).toEqual({
      defaultRegister: 'practitioner',
      available: ['everyday', 'orientation', 'practitioner'],
      absent: {},
    });
  });

  it('enables all three registers for the first structural essay', () => {
    expect(
      getRegisterAvailabilityForPath(
        '/en-us/signals/structural-essays/ai-is-not-magic-it-is-a-cognitive-amplifier/',
      ),
    ).toEqual({
      defaultRegister: 'practitioner',
      available: ['everyday', 'orientation', 'practitioner'],
      absent: {},
    });
  });

  it('keeps three-register routes backed by real content entries', () => {
    for (const id of threeRegisterRouteIds) {
      const entry = ROUTE_MAP.find((route) => route.id === id);
      expect(entry, `${id} should exist`).toBeDefined();
      if (!entry) continue;

      const practitionerPath = new URL(
        `apps/site/src/content/docs/en-us/${entry.newPath}/index.mdx`,
        repoRoot,
      );
      const practitionerFilePath = new URL(
        `apps/site/src/content/docs/en-us/${entry.newPath}.mdx`,
        repoRoot,
      );
      const orientationPath = new URL(
        `apps/site/src/content/register/orientation/en-us/${entry.newPath}/index.mdx`,
        repoRoot,
      );
      const orientationFilePath = new URL(
        `apps/site/src/content/register/orientation/en-us/${entry.newPath}.mdx`,
        repoRoot,
      );
      const everydayPath = new URL(
        `apps/site/src/content/register/everyday/en-us/${entry.newPath}/index.mdx`,
        repoRoot,
      );
      const everydayFilePath = new URL(
        `apps/site/src/content/register/everyday/en-us/${entry.newPath}.mdx`,
        repoRoot,
      );

      expect(existsSync(practitionerPath) || existsSync(practitionerFilePath)).toBe(true);
      expect(existsSync(orientationPath) || existsSync(orientationFilePath)).toBe(true);
      expect(existsSync(everydayPath) || existsSync(everydayFilePath)).toBe(true);
    }
  });
});
