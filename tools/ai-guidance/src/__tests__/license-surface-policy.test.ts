import { describe, expect, it } from 'vitest';
import {
  hasExplicitLicenseNotice,
  requiresExplicitLicenseNotice,
  runLicenseSurfaceCheck,
} from '../domain/license-surface-policy.js';

describe('requiresExplicitLicenseNotice', () => {
  it('checks tracked markdown-like source files', () => {
    expect(requiresExplicitLicenseNotice('README.md')).toBe(true);
    expect(requiresExplicitLicenseNotice('docs/guidance/policy.mdc')).toBe(true);
    expect(requiresExplicitLicenseNotice('apps/site/src/content/docs/en-us/index.mdx')).toBe(true);
    expect(requiresExplicitLicenseNotice('src/index.ts')).toBe(false);
  });
});

describe('hasExplicitLicenseNotice', () => {
  it('accepts full explicit headers', () => {
    expect(
      hasExplicitLicenseNotice(`
**Copyright:** © 2026 Mikey Sebastian Drozd
**License:** [CC BY 4.0](https://example.com/license)
`),
    ).toBe(true);
  });

  it('accepts non-rendered source notices', () => {
    expect(
      hasExplicitLicenseNotice(`
<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
`),
    ).toBe(true);
    expect(
      hasExplicitLicenseNotice(`
{/*
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
*/}
`),
    ).toBe(true);
  });
});

describe('runLicenseSurfaceCheck', () => {
  it('reports tracked markdown-like files without explicit notices', () => {
    const result = runLicenseSurfaceCheck([
      {
        path: 'README.md',
        content:
          '# Repo\n\n<!--\nLicensed under CC BY 4.0. Repository code and tooling: MIT.\n-->\n',
      },
      {
        path: 'docs/onboarding/manual.md',
        content: '# Manual\n',
      },
      {
        path: 'src/index.ts',
        content: 'export const hello = "world";\n',
      },
    ]);

    expect(result.checkedPaths).toEqual(['README.md', 'docs/onboarding/manual.md']);
    expect(result.failures).toEqual([
      {
        path: 'docs/onboarding/manual.md',
        message:
          'Tracked markdown-like source file is missing an explicit CC BY 4.0 license notice.',
      },
    ]);
  });
});
