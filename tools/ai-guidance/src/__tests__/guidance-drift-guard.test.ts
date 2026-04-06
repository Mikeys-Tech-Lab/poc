import { describe, expect, it } from 'vitest';
import {
  extractPathReferences,
  parseOnboardingIndex,
  runGuidanceDriftGuard,
} from '../domain/guidance-drift-guard.js';

describe('parseOnboardingIndex', () => {
  it('parses topics and prereqs from the onboarding index', () => {
    const topics = parseOnboardingIndex(`
### local-setup

- **Title:** Local setup
- **Path:** \`docs/onboarding/local-setup.md\`
- **When to use:** First time setup
- **Prereqs:** none

### evolution-arc

- **Title:** Evolution Arc
- **Path:** \`docs/onboarding/evolution-arc.md\`
- **When to use:** Understand the repo history
- **Prereqs:** local-setup
`);

    expect(topics).toEqual([
      {
        id: 'local-setup',
        title: 'Local setup',
        docPath: 'docs/onboarding/local-setup.md',
        whenToUse: 'First time setup',
        prereqs: [],
      },
      {
        id: 'evolution-arc',
        title: 'Evolution Arc',
        docPath: 'docs/onboarding/evolution-arc.md',
        whenToUse: 'Understand the repo history',
        prereqs: ['local-setup'],
      },
    ]);
  });
});

describe('extractPathReferences', () => {
  it('extracts repo-relative paths and ignores URLs or site routes', () => {
    const references = extractPathReferences(
      'docs/onboarding/evolution-arc.md',
      `
See [the map](../guidance/evolution-arc.md), \`AGENTS.md\`, and \`docs/onboarding/\`.
Ignore [the website](/en-us/) and [external docs](https://example.com/docs).
`,
    );

    expect(references).toEqual(['docs/guidance/evolution-arc.md', 'AGENTS.md', 'docs/onboarding']);
  });

  it('ignores conceptual backtick labels that are not explicit repo paths', () => {
    const references = extractPathReferences(
      'AGENTS.md',
      `
Do not introduce a nested \`root/\` wrapper.
Use \`mandateLenses/SensibleDefaults/context-seeder.md\` only on demand.
\`lens.md\` and \`context-seeder.md\` are conceptual filenames here, not local relative paths.
`,
    );

    expect(references).toEqual(['mandateLenses/SensibleDefaults/context-seeder.md']);
  });
});

describe('runGuidanceDriftGuard', () => {
  const sensibleDefaultsSeederUrl =
    'https://raw.githubusercontent.com/Mikeys-Tech-Lab/poc/main/mandateLenses/SensibleDefaults/context-seeder.md';

  const buildCompleteContractFiles = (): Record<string, string> => ({
    'README.md': `Use onboard me, Evolution Arc, and Trace Climb. Load the seeder from ${sensibleDefaultsSeederUrl}.`,
    'mandateLenses/SensibleDefaults/README.md': `Direct seeder URL: ${sensibleDefaultsSeederUrl}`,
    'AGENTS.md':
      'Say `onboard me`. Say `Evolution Arc`. Say `Trace Climb`. Store durable learning in `docs/guidance/evolution-records/`. Do not read populated `.local/config.md`.',
    '.github/copilot-instructions.md': 'Use `onboard me`, `Evolution Arc`, and `Trace Climb`.',
    '.github/pull_request_template.md': '## Learning trace\nEvolution Record',
    '.claude/CLAUDE.md': 'Use `onboard me`, `Evolution Arc`, and `Trace Climb`.',
    '.cursor/skills/onboarding/SKILL.md':
      'Read `docs/onboarding/README.md`, use Evolution Arc, and route durable learning questions to Trace Climb.',
    '.cursor/skills/evolution-arc/SKILL.md':
      'Ask which register. Read `docs/guidance/evolution-arc.md`.',
    '.cursor/skills/github-automation/SKILL.md': 'Run Trace Climb. Add Learning trace.',
    '.cursor/skills/trace-climb/SKILL.md':
      'Read `docs/guidance/trace-climb.md`. Write an Evolution Record.',
    'docs/onboarding/README.md': `
### evolution-arc
- **Title:** Evolution Arc
- **Path:** \`docs/onboarding/evolution-arc.md\`
- **When to use:** Understand history
- **Prereqs:** none

### trace-climb
- **Title:** Trace Climb
- **Path:** \`docs/onboarding/trace-climb.md\`
- **When to use:** Understand durable learning
- **Prereqs:** none
`,
    'docs/onboarding/manual.md': 'Say "onboard me", "Evolution Arc", or "Trace Climb".',
    'docs/onboarding/ai-guidance.md': 'Use `onboard me`, `evolution-arc`, and `trace-climb`.',
    'docs/onboarding/contributing.md': 'Run Trace Climb. Include Learning trace.',
    'docs/onboarding/evolution-arc.md': 'Choose register. Read `docs/guidance/evolution-arc.md`.',
    'docs/onboarding/trace-climb.md':
      'Read `docs/guidance/trace-climb.md` and `docs/guidance/evolution-records/README.md`.',
    'docs/onboarding/workspace-overview.md':
      'Template: `.local.example.md`. Use Trace Climb. See `docs/guidance/trace-climb.md` and `docs/onboarding/`.',
    'docs/guidance/README.md': 'Trace Climb Evolution Records',
    'docs/guidance/evolution-arc.md': 'See `docs/onboarding/evolution-arc.md`.',
    'docs/guidance/trace-climb.md':
      'See `docs/onboarding/trace-climb.md` and `docs/guidance/evolution-records/README.md`.',
    'docs/guidance/evolution-records/README.md': 'Use `template.md`.',
    'docs/architecture/workspace.md':
      '`.local/`, `.cursor/skills/evolution-arc/`, `docs/guidance/evolution-arc.md`, `.cursor/skills/trace-climb/`, and `docs/guidance/evolution-records/`.',
    'apps/site/src/lib/activation-prompts.ts': `export const SEEDER_URL = '${sensibleDefaultsSeederUrl}';`,
    'apps/site/src/content/docs/en-us/core-system/mandate-lenses/index.mdx': `Seeder link: ${sensibleDefaultsSeederUrl}`,
    'apps/site/src/content/docs/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx': `Try it with ${sensibleDefaultsSeederUrl}`,
    'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/index.mdx': `Seeder text: ${sensibleDefaultsSeederUrl}`,
    'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx': `Start here: ${sensibleDefaultsSeederUrl}`,
  });

  const buildRepoFiles = (files: Record<string, string>): Set<string> => {
    const repoFiles = new Set(Object.keys(files));
    repoFiles.add('docs/onboarding/local-setup.md');
    repoFiles.add('.local.example.md');
    return repoFiles;
  };

  const repoDirectories = new Set([
    'docs/onboarding',
    'docs/guidance',
    'docs/guidance/evolution-records',
    '.cursor/skills/evolution-arc',
    '.cursor/skills/trace-climb',
  ]);

  it('reports contract failures for changed evolution arc surfaces', () => {
    const files = buildCompleteContractFiles();

    const result = runGuidanceDriftGuard({
      files,
      repoFiles: buildRepoFiles(files),
      repoDirectories,
      changedFiles: ['docs/guidance/evolution-arc.md'],
    });

    expect(result.activatedMappings).toEqual(['evolution-arc-entry']);
    expect(result.failures).toEqual([]);
  });

  it('reports contract failures for changed sensible defaults activation surfaces', () => {
    const files = buildCompleteContractFiles();

    const result = runGuidanceDriftGuard({
      files,
      repoFiles: buildRepoFiles(files),
      repoDirectories,
      changedFiles: ['mandateLenses/SensibleDefaults/README.md'],
    });

    expect(result.activatedMappings).toEqual(['sensible-defaults-activation']);
    expect(result.failures).toEqual([]);
  });

  it('reports contract failures for changed trace climb surfaces', () => {
    const files = buildCompleteContractFiles();

    const result = runGuidanceDriftGuard({
      files,
      repoFiles: buildRepoFiles(files),
      repoDirectories,
      changedFiles: ['docs/guidance/trace-climb.md'],
    });

    expect(result.activatedMappings).toEqual(['trace-climb-entry']);
    expect(result.failures).toEqual([]);
  });

  it('activates the trace climb contract when the onboarding skill changes', () => {
    const files = buildCompleteContractFiles();

    const result = runGuidanceDriftGuard({
      files,
      repoFiles: buildRepoFiles(files),
      repoDirectories,
      changedFiles: ['.cursor/skills/onboarding/SKILL.md'],
    });

    expect(result.activatedMappings).toEqual([
      'onboarding-entry',
      'evolution-arc-entry',
      'trace-climb-entry',
    ]);
    expect(result.failures).toEqual([]);
  });

  it('fails when an onboarding prereq points to an unknown topic', () => {
    const files = buildCompleteContractFiles();
    files['docs/onboarding/README.md'] = `
### evolution-arc
- **Title:** Evolution Arc
- **Path:** \`docs/onboarding/evolution-arc.md\`
- **When to use:** Understand history
- **Prereqs:** none

### trace-climb
- **Title:** Trace Climb
- **Path:** \`docs/onboarding/trace-climb.md\`
- **When to use:** Understand durable learning
- **Prereqs:** missing-topic
`;

    const result = runGuidanceDriftGuard({
      files,
      repoFiles: buildRepoFiles(files),
      repoDirectories,
      changedFiles: [],
    });

    expect(result.failures).toEqual([
      {
        scope: 'docs/onboarding/README.md',
        message: 'Topic "trace-climb" references unknown prereq "missing-topic".',
      },
    ]);
  });

  it('allows logical runtime paths that are gitignored or generated', () => {
    const files = buildCompleteContractFiles();
    files['docs/onboarding/manual.md'] =
      'Say "onboard me", "Evolution Arc", or "Trace Climb". Copy `.local.example.md` to `.local/config.md`.';
    files['docs/onboarding/workspace-overview.md'] =
      'Template: `.local.example.md`. Do not treat populated `.local/config.md` as a normal agent input. Use Trace Climb. See `docs/guidance/trace-climb.md` and `.dist/poc-snapshot-images/`.';
    files['docs/architecture/workspace.md'] =
      '`.local/`, `.cursor/skills/evolution-arc/`, `docs/guidance/evolution-arc.md`, `.cursor/skills/trace-climb/`, `docs/guidance/evolution-records/`, and `.dist/poc-snapshot-images/`.';

    const result = runGuidanceDriftGuard({
      files,
      repoFiles: buildRepoFiles(files),
      repoDirectories,
      changedFiles: [],
    });

    expect(result.failures).toEqual([]);
  });
});
