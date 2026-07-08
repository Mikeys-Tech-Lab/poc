import { describe, expect, it } from 'vitest';
import { getHandoutPrompts, HANDOUT_PROMPT_REGISTRY } from '../handout-prompts';
import {
  getHandoutHref,
  getHandoutSidebarHref,
  getHandoutSlug,
  isPublishedHandout,
  isSeriesLanding,
  THINKFIRST_BASE_PATH,
  THINKFIRST_SIDEBAR_BASE,
} from '../handouts-series';
import { getRegisterAvailabilityForPath } from '../route-map.js';

describe('handout-prompts registry', () => {
  it('registers the repo-forensics starter prompt sidecar', () => {
    const prompts = getHandoutPrompts('repo-forensics-starter-prompt');

    expect(prompts).toBeDefined();
    expect(prompts).toHaveLength(2);
    expect(prompts?.map((prompt) => prompt.id)).toEqual(['quick', 'full']);
    expect(prompts?.[0]?.body).toContain('Before changing anything, inspect first.');
    expect(prompts?.[1]?.body).toContain('Return your findings in this structure');
  });

  it('does not resolve unknown slugs', () => {
    expect(getHandoutPrompts('unknown-handout')).toBeUndefined();
  });

  it('keeps registry keys aligned with published handout slugs', () => {
    expect(Object.keys(HANDOUT_PROMPT_REGISTRY)).toEqual(['repo-forensics-starter-prompt']);
  });
});

describe('handouts series helpers', () => {
  const landingEntry = {
    id: 'en-us/thinkfirst',
    data: { seriesId: 'thinkfirst', order: 0 },
  } as const;

  const handoutEntry = {
    id: 'en-us/thinkfirst/repo-forensics-starter-prompt',
    data: { seriesId: 'thinkfirst', order: 1 },
  } as const;

  it('detects the series landing entry', () => {
    expect(isSeriesLanding(landingEntry)).toBe(true);
    expect(isSeriesLanding(handoutEntry)).toBe(false);
  });

  it('detects published handouts from the registry', () => {
    expect(isPublishedHandout(handoutEntry)).toBe(true);
    expect(isPublishedHandout(landingEntry)).toBe(false);
  });

  it('builds locale-nested canonical handout hrefs', () => {
    expect(getHandoutSlug(handoutEntry)).toBe('repo-forensics-starter-prompt');
    expect(THINKFIRST_BASE_PATH).toBe('/en-us/shared/thinkfirst');
    expect(getHandoutHref(handoutEntry)).toBe(
      '/en-us/shared/thinkfirst/repo-forensics-starter-prompt/',
    );
  });

  it('builds locale-relative sidebar hrefs (Starlight prepends the locale)', () => {
    expect(THINKFIRST_SIDEBAR_BASE).toBe('/shared/thinkfirst');
    expect(getHandoutSidebarHref(handoutEntry)).toBe(
      '/shared/thinkfirst/repo-forensics-starter-prompt/',
    );
  });
});

describe('shared surface register availability', () => {
  it('is practitioner-only for locale-nested shared paths', () => {
    const availability = getRegisterAvailabilityForPath(
      '/en-us/shared/thinkfirst/repo-forensics-starter-prompt/',
    );

    expect(availability.available).toEqual(['practitioner']);
    expect(availability.defaultRegister).toBe('practitioner');
    expect(availability.absent).toHaveProperty('everyday');
    expect(availability.absent).toHaveProperty('orientation');
  });

  it('applies to the shared landing and un-prefixed shared paths', () => {
    for (const path of ['/en-us/shared/thinkfirst/', '/shared/thinkfirst/']) {
      expect(getRegisterAvailabilityForPath(path).available).toEqual(['practitioner']);
    }
  });

  it('leaves non-shared routes on their normal availability', () => {
    expect(getRegisterAvailabilityForPath('/en-us/').available).not.toEqual(['practitioner']);
  });
});
