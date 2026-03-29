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
});

describe('runGuidanceDriftGuard', () => {
  it('reports contract failures for changed evolution arc surfaces', () => {
    const files = {
      'README.md': 'Use onboard me and Evolution Arc.',
      'AGENTS.md': 'Say `onboard me`. Say `Evolution Arc`.',
      '.github/copilot-instructions.md': 'Use `onboard me` and `Evolution Arc`.',
      '.claude/CLAUDE.md': 'Use `onboard me` and `Evolution Arc`.',
      '.cursor/skills/onboarding/SKILL.md':
        'Read `docs/onboarding/README.md` and use Evolution Arc.',
      '.cursor/skills/evolution-arc/SKILL.md':
        'Ask which register. Read `docs/guidance/evolution-arc.md`.',
      'docs/onboarding/README.md': `
### evolution-arc
- **Title:** Evolution Arc
- **Path:** \`docs/onboarding/evolution-arc.md\`
- **When to use:** Understand history
- **Prereqs:** none
`,
      'docs/onboarding/manual.md': 'Say "onboard me" or "Evolution Arc".',
      'docs/onboarding/ai-guidance.md': 'Use `onboard me` and `evolution-arc`.',
      'docs/onboarding/evolution-arc.md': 'Choose register. Read `docs/guidance/evolution-arc.md`.',
      'docs/onboarding/workspace-overview.md': 'See `docs/onboarding/`.',
      'docs/guidance/evolution-arc.md': 'See `docs/onboarding/evolution-arc.md`.',
      'docs/architecture/workspace.md':
        '.cursor/skills/evolution-arc/ docs/guidance/evolution-arc.md',
    };

    const repoFiles = new Set(Object.keys(files));
    repoFiles.add('docs/onboarding/local-setup.md');

    const result = runGuidanceDriftGuard({
      files,
      repoFiles,
      repoDirectories: new Set([
        'docs/onboarding',
        'docs/guidance',
        '.cursor/skills/evolution-arc',
      ]),
      changedFiles: ['docs/guidance/evolution-arc.md'],
    });

    expect(result.activatedMappings).toEqual(['evolution-arc-entry']);
    expect(result.failures).toEqual([]);
  });

  it('fails when an onboarding prereq points to an unknown topic', () => {
    const result = runGuidanceDriftGuard({
      files: {
        'README.md': 'Use onboard me and Evolution Arc.',
        'AGENTS.md': 'Say `onboard me`. Say `Evolution Arc`.',
        '.github/copilot-instructions.md': 'Use `onboard me` and `Evolution Arc`.',
        '.claude/CLAUDE.md': 'Use `onboard me` and `Evolution Arc`.',
        '.cursor/skills/onboarding/SKILL.md':
          'Read `docs/onboarding/README.md` and use Evolution Arc.',
        '.cursor/skills/evolution-arc/SKILL.md':
          'Ask which register. Read `docs/guidance/evolution-arc.md`.',
        'docs/onboarding/README.md': `
### evolution-arc
- **Title:** Evolution Arc
- **Path:** \`docs/onboarding/evolution-arc.md\`
- **When to use:** Understand history
- **Prereqs:** missing-topic
`,
        'docs/onboarding/manual.md': 'Say "onboard me" or "Evolution Arc".',
        'docs/onboarding/ai-guidance.md': 'Use `onboard me` and `evolution-arc`.',
        'docs/onboarding/evolution-arc.md':
          'Choose register. Read `docs/guidance/evolution-arc.md`.',
        'docs/onboarding/workspace-overview.md': 'See `docs/onboarding/`.',
        'docs/guidance/evolution-arc.md': 'See `docs/onboarding/evolution-arc.md`.',
        'docs/architecture/workspace.md':
          '.cursor/skills/evolution-arc/ docs/guidance/evolution-arc.md',
      },
      repoFiles: new Set([
        'README.md',
        'AGENTS.md',
        '.github/copilot-instructions.md',
        '.claude/CLAUDE.md',
        '.cursor/skills/onboarding/SKILL.md',
        '.cursor/skills/evolution-arc/SKILL.md',
        'docs/onboarding/README.md',
        'docs/onboarding/manual.md',
        'docs/onboarding/ai-guidance.md',
        'docs/onboarding/evolution-arc.md',
        'docs/onboarding/workspace-overview.md',
        'docs/guidance/evolution-arc.md',
        'docs/architecture/workspace.md',
      ]),
      repoDirectories: new Set([
        'docs/onboarding',
        'docs/guidance',
        '.cursor/skills/evolution-arc',
      ]),
      changedFiles: [],
    });

    expect(result.failures).toEqual([
      {
        scope: 'docs/onboarding/README.md',
        message: 'Topic "evolution-arc" references unknown prereq "missing-topic".',
      },
    ]);
  });

  it('allows logical runtime paths that are gitignored or generated', () => {
    const result = runGuidanceDriftGuard({
      files: {
        'README.md': 'Use onboard me and Evolution Arc.',
        'AGENTS.md':
          'Say `onboard me`. Say `Evolution Arc`. Do not read populated `.local/config.md`. Use `pnpm screendump` to export to `.dist/poc-snapshot-images/`.',
        '.github/copilot-instructions.md': 'Use `onboard me` and `Evolution Arc`.',
        '.claude/CLAUDE.md': 'Use `onboard me` and `Evolution Arc`.',
        '.cursor/skills/onboarding/SKILL.md':
          'Read `docs/onboarding/README.md`. Check if `.local/config.md` exists. Use Evolution Arc.',
        '.cursor/skills/evolution-arc/SKILL.md':
          'Ask which register. Read `docs/guidance/evolution-arc.md`.',
        'docs/onboarding/README.md': `
### evolution-arc
- **Title:** Evolution Arc
- **Path:** \`docs/onboarding/evolution-arc.md\`
- **When to use:** Understand history
- **Prereqs:** none
`,
        'docs/onboarding/manual.md':
          'Say "onboard me" or "Evolution Arc". Copy `.local.example.md` to `.local/config.md`.',
        'docs/onboarding/ai-guidance.md': 'Use `onboard me` and `evolution-arc`.',
        'docs/onboarding/evolution-arc.md':
          'Choose register. Read `docs/guidance/evolution-arc.md`.',
        'docs/onboarding/workspace-overview.md':
          'Template: `.local.example.md`. Do not treat populated `.local/config.md` as a normal agent input.',
        'docs/guidance/evolution-arc.md': 'See `docs/onboarding/evolution-arc.md`.',
        'docs/architecture/workspace.md':
          '`.local/`, `.cursor/skills/evolution-arc/`, and `docs/guidance/evolution-arc.md`.',
      },
      repoFiles: new Set([
        'README.md',
        'AGENTS.md',
        '.github/copilot-instructions.md',
        '.claude/CLAUDE.md',
        '.cursor/skills/onboarding/SKILL.md',
        '.cursor/skills/evolution-arc/SKILL.md',
        'docs/onboarding/README.md',
        'docs/onboarding/manual.md',
        'docs/onboarding/ai-guidance.md',
        'docs/onboarding/evolution-arc.md',
        'docs/onboarding/workspace-overview.md',
        'docs/guidance/evolution-arc.md',
        'docs/architecture/workspace.md',
        '.local.example.md',
      ]),
      repoDirectories: new Set([
        'docs/onboarding',
        'docs/guidance',
        '.cursor/skills/evolution-arc',
      ]),
      changedFiles: [],
    });

    expect(result.failures).toEqual([]);
  });
});
