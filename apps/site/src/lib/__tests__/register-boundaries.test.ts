import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const repoRoot = new URL('../../../../../', import.meta.url);

const read = (relativePath: string) => readFileSync(new URL(relativePath, repoRoot), 'utf8');

const cases = [
  {
    name: 'glossary keeps the seed grounding visible in both registers',
    practitionerPath: 'apps/site/src/content/docs/en-us/about/glossary.mdx',
    orientationPath: 'apps/site/src/content/register/orientation/en-us/about/glossary.mdx',
    practitionerSnippets: ['They hold the commitments that keep the practice grounded:'],
    orientationSnippets: ['what keeps the work consistent'],
  },
  {
    name: 'Act II keeps the anti-performance boundary visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/core-system/practice-of-clarity/act-2-practicing-decision-hygiene-under-ai-speed.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/core-system/practice-of-clarity/act-2-practicing-decision-hygiene-under-ai-speed.mdx',
    practitionerSnippets: [
      'If people are asked to "show their reasoning" as a deliverable,',
      'The purpose is not to record everything.',
    ],
    orientationSnippets: [
      'If people are asked to "show their reasoning" as a deliverable,',
      'The purpose is not to record everything.',
    ],
  },
  {
    name: 'Act IV keeps the non-authority boundary visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/core-system/practice-of-clarity/act-4-a-public-node-you-can-inspect.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/core-system/practice-of-clarity/act-4-a-public-node-you-can-inspect.mdx',
    practitionerSnippets: ['a final authority over future use', 'challenge and revision.'],
    orientationSnippets: [
      'This public node is not a final authority over future nodes.',
      'challenge and revision.',
    ],
  },
  {
    name: 'mandate lens index keeps the current-boundary honesty in both registers',
    practitionerPath: 'apps/site/src/content/docs/en-us/core-system/mandate-lenses/index.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/index.mdx',
    practitionerSnippets: [
      '### Current boundary',
      'There is only one usable runtime guidance surface in this public node right now.',
    ],
    orientationSnippets: [
      '### Current boundary',
      'There is only one usable runtime guidance surface in this public node right now.',
    ],
  },
  {
    name: 'Sensible Defaults keeps the Act IV starting point and load boundary visible',
    practitionerPath:
      'apps/site/src/content/docs/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
    practitionerSnippets: [
      'first usable runtime guidance surface in',
      'If the source context is not loaded, the lens is not active.',
    ],
    orientationSnippets: [
      'first usable runtime guidance surface in',
      'If the source context cannot be loaded, the lens is not active.',
    ],
  },
  {
    name: 'Integration Lag keeps the output-understanding gap visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/integration-lag.mdx',
    practitionerSnippets: [
      'This is what we call **integration lag**.',
      'Integration lag is the delay between producing change and integrating that change into shared understanding',
      'The danger is that AI can make unresolved uncertainty look finished.',
      '<ActivationPrompts',
      'This only works as a practice.',
    ],
    orientationSnippets: [
      'Integration lag is the delay between producing change and integrating that change into shared understanding.',
      'The issue is that AI can make unresolved uncertainty look complete.',
      'Can we name what this change stands on?',
      '<ActivationPrompts',
      'That is the verification tax.',
    ],
  },
  {
    name: 'A Path Through Integration Lag keeps the path and non-framework boundary visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/a-path-through-integration-lag.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/a-path-through-integration-lag.mdx',
    practitionerSnippets: [
      'The next question is:',
      'Not as a framework rollout.',
      'The shift is less generation, more visibility.',
      'Human in the loop should not mean human as hidden cleanup layer.',
      '<ReadingFrame',
      'That hidden checking, correcting, re-reading, and context reconstruction work is',
    ],
    orientationSnippets: [
      'The next question is:',
      'Not a framework.',
      'ask it to help inspect what already exists.',
      'This does not replace human judgment.',
      '<ReadingFrame',
      'If the work needs a ready way to try the practice',
      'That pressure is [The Verification Tax]',
    ],
  },
  {
    name: 'The Verification Tax keeps evidence-grounded confidence visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/the-verification-tax.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/the-verification-tax.mdx',
    practitionerSnippets: [
      'The verification tax is the extra checking, correcting, re-reading, debugging,',
      'confidence should not come from belief.',
      '<ReadingFrame',
      'The agent can draft the verification trace.',
      'This signal is not an argument against AI-assisted development.',
    ],
    orientationSnippets: [
      'The verification tax is the checking, correcting, re-reading, debugging,',
      'Confidence should come from conditions, not belief.',
      'Before asking AI to write code, ask it to inspect.',
      'The human still owns the decision.',
    ],
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

  it('Structural keeps the AI and cognitive amplification entry visible in all three registers', () => {
    expect(read('apps/site/src/content/docs/en-us/signals/structural/index.mdx')).toContain(
      'The first structural signal cluster begins with:',
    );
    expect(
      read('apps/site/src/content/register/orientation/en-us/signals/structural/index.mdx'),
    ).toContain('The first structural signal cluster begins with:');
    expect(
      read('apps/site/src/content/register/everyday/en-us/signals/structural/index.mdx'),
    ).toContain('The first signal in this cluster is ready:');
  });
});
