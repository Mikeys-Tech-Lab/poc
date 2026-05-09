import { describe, expect, it } from 'vitest';

import { getRegisterAvailabilityForPath } from '../route-map.js';
import {
  buildPageUrl,
  CONTENT_PATHS,
  createScreendumpPlan,
  screenshotFileName,
  THEMES,
  VIEWPORTS,
  zipFileName,
} from '../screendump.js';

describe('screendump helpers', () => {
  it('builds screenshot filenames from path, register, and theme', () => {
    expect(screenshotFileName('', 'practitioner', 'dark-atmo')).toBe(
      'home__practitioner__dark-atmo.png',
    );
    expect(screenshotFileName('about/what-this-is', 'orientation', 'light-atmo')).toBe(
      'about__what-this-is__orientation__light-atmo.png',
    );
  });

  it('builds orientation urls with the register query param', () => {
    expect(buildPageUrl('http://127.0.0.1:4321/en-us/', '', 'practitioner')).toBe(
      'http://127.0.0.1:4321/en-us/',
    );
    expect(buildPageUrl('http://127.0.0.1:4321/en-us/', 'licenses/cc-by-4-0', 'orientation')).toBe(
      'http://127.0.0.1:4321/en-us/licenses/cc-by-4-0?register=orientation',
    );
  });

  it('builds the available page x register x theme x viewport plan', () => {
    const plan = createScreendumpPlan({
      baseUrl: 'http://127.0.0.1:4321/en-us/',
    });
    const availableRegisterCount = CONTENT_PATHS.reduce(
      (count, path) => count + getRegisterAvailabilityForPath(path).available.length,
      0,
    );

    expect(plan).toHaveLength(
      availableRegisterCount * THEMES.length * Object.keys(VIEWPORTS).length,
    );
    expect(plan[0]).toMatchObject({
      viewportName: 'desktop',
      path: '',
      register: 'practitioner',
      theme: { name: 'dark-atmo', storageValue: 'dark' },
      fileName: 'home__practitioner__dark-atmo.png',
      url: 'http://127.0.0.1:4321/en-us/',
    });
  });

  it('can include unavailable registers when explicitly requested', () => {
    const plan = createScreendumpPlan({
      baseUrl: 'http://127.0.0.1:4321/en-us/',
      paths: ['about/what-this-is'],
      registers: ['everyday'],
      themes: [THEMES[0]],
      viewports: VIEWPORTS,
    });

    expect(plan[0]).toMatchObject({
      register: 'everyday',
      url: 'http://127.0.0.1:4321/en-us/about/what-this-is?register=everyday',
    });
  });

  it('builds the versioned zip filename', () => {
    expect(zipFileName('1.1.0')).toBe('poc-snapshot-images-snapshot-1.1.0.zip');
  });
});
