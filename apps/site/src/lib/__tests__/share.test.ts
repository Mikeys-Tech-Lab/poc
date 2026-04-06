import { describe, expect, it } from 'vitest';

import { buildShareUrl } from '../share';

describe('share helpers', () => {
  it('keeps the orientation query param when building a share url', () => {
    expect(
      buildShareUrl(
        'http://127.0.0.1:4321/en-us/core-system/practice-of-clarity/act-1-when-output-outpaces-understanding/?register=orientation#overview',
      ),
    ).toBe(
      'http://127.0.0.1:4321/en-us/core-system/practice-of-clarity/act-1-when-output-outpaces-understanding/?register=orientation',
    );
  });

  it('drops only the hash for practitioner urls', () => {
    expect(
      buildShareUrl(
        'http://127.0.0.1:4321/en-us/core-system/practice-of-clarity/act-1-when-output-outpaces-understanding/#overview',
      ),
    ).toBe(
      'http://127.0.0.1:4321/en-us/core-system/practice-of-clarity/act-1-when-output-outpaces-understanding/',
    );
  });
});
