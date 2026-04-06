import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const repoRoot = new URL('../../../../../', import.meta.url);

const read = (relativePath: string) => readFileSync(new URL(relativePath, repoRoot), 'utf8');

const cases = [
  {
    name: 'glossary keeps the seed grounding visible in both registers',
    practitionerPath: 'apps/site/src/content/docs/en-us/about/glossary.mdx',
    orientationPath: 'apps/site/src/content/register/orientation/en-us/about/glossary.mdx',
    practitionerSnippets: ['They are what keeps the practice structurally grounded as it moves.'],
    orientationSnippets: ['what keeps the work consistent as it moves'],
  },
  {
    name: 'Act II keeps the anti-performance boundary visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/core-system/practice-of-clarity/act-2-practicing-decision-hygiene-under-ai-speed.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/core-system/practice-of-clarity/act-2-practicing-decision-hygiene-under-ai-speed.mdx',
    practitionerSnippets: [
      'If teams are asked to "show their reasoning" as a deliverable, it becomes',
      'The purpose is not to record everything.',
    ],
    orientationSnippets: [
      'If teams are asked to "show their reasoning" as a deliverable, it becomes',
      'The purpose is not to record everything.',
    ],
  },
  {
    name: 'Act IV keeps the non-authority boundary visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/core-system/practice-of-clarity/act-4-a-public-node-you-can-inspect.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/core-system/practice-of-clarity/act-4-a-public-node-you-can-inspect.mdx',
    practitionerSnippets: ['a final authority over future nodes', 'challenge and revision.'],
    orientationSnippets: [
      'This repository is not a final authority over future nodes.',
      'challenge and revision.',
    ],
  },
  {
    name: 'mandate lens index keeps the current-boundary honesty in both registers',
    practitionerPath: 'apps/site/src/content/docs/en-us/core-system/mandate-lenses/index.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/index.mdx',
    practitionerSnippets: ['### Current boundary', 'There is only one public lens right now.'],
    orientationSnippets: ['### Current boundary', 'There is only one public lens right now.'],
  },
  {
    name: 'Sensible Defaults keeps the Act IV bridge and load boundary in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
    practitionerSnippets: [
      '### Why this matters after Act IV',
      'If the source cannot be loaded, the lens is not active.',
    ],
    orientationSnippets: [
      '### Why this matters after Act IV',
      'If the source cannot be loaded, the lens is not active.',
    ],
  },
  {
    name: 'Integration Lag stays an explicit placeholder in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/integration-lag.mdx',
    practitionerSnippets: ['Placeholder. Content coming later.'],
    orientationSnippets: ['Placeholder. Content coming later.'],
  },
] as const;

describe('register boundary guardrails', () => {
  it.each(cases)('$name', ({
    practitionerPath,
    orientationPath,
    practitionerSnippets,
    orientationSnippets,
  }) => {
    const practitioner = read(practitionerPath);
    const orientation = read(orientationPath);

    for (const snippet of practitionerSnippets) {
      expect(practitioner).toContain(snippet);
    }

    for (const snippet of orientationSnippets) {
      expect(orientation).toContain(snippet);
    }
  });
});
