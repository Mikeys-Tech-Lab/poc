import { describe, expect, it } from 'vitest';

import {
  buildPageUrl,
  CONTENT_PATHS,
  createScreendumpPlan,
  REGISTERS,
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

  it('builds the full page x register x theme x viewport plan', () => {
    const plan = createScreendumpPlan({
      baseUrl: 'http://127.0.0.1:4321/en-us/',
    });

    expect(plan).toHaveLength(
      CONTENT_PATHS.length * REGISTERS.length * THEMES.length * Object.keys(VIEWPORTS).length,
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

  it('builds the versioned zip filename', () => {
    expect(zipFileName('1.1.0')).toBe('poc-snapshot-images-snapshot-1.1.0.zip');
  });
});
