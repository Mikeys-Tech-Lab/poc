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
      'If the source context is not loaded, or the tool cannot work with it',
    ],
    orientationSnippets: [
      'first usable runtime guidance surface in',
      'If the source context cannot be loaded, or the tool cannot work with it',
    ],
  },
  {
    name: 'Integration Lag keeps the output-understanding gap visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag/we-started-shipping-faster-understanding-less.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/integration-lag/we-started-shipping-faster-understanding-less.mdx',
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
      'The practice is to make the trace inspectable before the draft becomes too easy',
      'Everyday begins close to recognizable',
      '<AnchorMap',
    ],
  },
  {
    name: 'A Path Through Integration Lag keeps the path and non-framework boundary visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag/a-path-through-integration-lag.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/integration-lag/a-path-through-integration-lag.mdx',
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
      'That inspection can include a source inventory',
      'This does not replace human judgment.',
      '<ReadingFrame',
      'Everyday begins close to recognizable',
      '<AnchorMap',
      'That pressure is [The Verification Tax]',
    ],
  },
  {
    name: 'The Verification Tax keeps evidence-grounded confidence visible in both registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag/the-verification-tax.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/integration-lag/the-verification-tax.mdx',
    practitionerSnippets: [
      'The verification tax is the extra checking, correcting, re-reading, debugging,',
      'confidence should not come from belief.',
      '<ReadingFrame',
      'The agent can help draft a verification trace.',
      'This signal is not an argument against AI-assisted development.',
    ],
    orientationSnippets: [
      'The verification tax is the checking, correcting, re-reading, debugging,',
      'Confidence should come from conditions, not belief.',
      'Before asking AI to write code, ask it to inspect.',
      'If the agent has access to the relevant source surfaces',
      'The human still owns the decision.',
      '<AnchorMap',
    ],
  },
  {
    name: 'Work & Delivery overview keeps the category claim aligned across registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/index.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/index.mdx',
    practitionerSnippets: [
      'Work and delivery signals name the pressure',
      '### What belongs here',
      'Open the Integration Lag series',
    ],
    orientationSnippets: [
      'Work and delivery signals look at what happens',
      '### What belongs here',
      'Open the Integration Lag series',
    ],
  },
  {
    name: 'Integration Lag series overview keeps the series framing aligned across registers',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag/index.mdx',
    orientationPath:
      'apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/integration-lag/index.mdx',
    practitionerSnippets: [
      'Integration Lag is a series about one delivery condition',
      '### What the series covers',
      'We Started Shipping Faster. We Also Started Understanding Less.',
    ],
    orientationSnippets: [
      'Integration Lag is a short series about one situation',
      '### What the series covers',
      'We Started Shipping Faster. We Also Started Understanding Less.',
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

  it('keeps the new operational overviews present in all three registers', () => {
    expect(
      read('apps/site/src/content/docs/en-us/signals/operational/work-delivery/index.mdx'),
    ).toContain('### Integration Lag');
    expect(
      read(
        'apps/site/src/content/register/everyday/en-us/signals/operational/work-delivery/index.mdx',
      ),
    ).toContain('### Integration Lag');
    expect(
      read(
        'apps/site/src/content/register/everyday/en-us/signals/operational/work-delivery/integration-lag/index.mdx',
      ),
    ).toContain('### What the series covers');
  });
});
