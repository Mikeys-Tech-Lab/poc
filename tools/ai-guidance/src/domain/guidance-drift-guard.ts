import { posix as path } from 'node:path';

export interface OnboardingTopic {
  readonly id: string;
  readonly title: string;
  readonly docPath: string;
  readonly whenToUse: string;
  readonly prereqs: readonly string[];
}

export interface GuidanceFailure {
  readonly scope: string;
  readonly message: string;
}

export interface GuidanceCheckInput {
  readonly files: Readonly<Record<string, string>>;
  readonly repoFiles: ReadonlySet<string>;
  readonly repoDirectories: ReadonlySet<string>;
  readonly changedFiles: readonly string[];
  readonly evolutionRecords: Readonly<Record<string, string>>;
}

export interface GuidanceCheckResult {
  readonly activatedMappings: readonly string[];
  readonly failures: readonly GuidanceFailure[];
}

interface MappingContract {
  readonly name: string;
  readonly triggers: readonly string[];
  readonly checks: readonly {
    readonly filePath: string;
    readonly expectedSnippets: readonly string[];
  }[];
}

const MARKDOWN_LINK_PATTERN = /\[[^\]]+\]\(([^)]+)\)/g;
const BACKTICK_PATTERN = /`([^`]+)`/g;
const FILE_EXTENSION_PATTERN = /^[^/\s][^/]*\.(md|mdc|json|ya?ml|ts|tsx|js|mjs|css|astro)$/;
const ONBOARDING_INDEX_PATH = 'docs/onboarding/README.md';
const ROOT_FILE_REFERENCES = new Set([
  'AGENTS.md',
  'README.md',
  'CHANGELOG.md',
  'package.json',
  '.local.example.md',
  'release-please-config.json',
  '.release-please-manifest.json',
]);
const SENSIBLE_DEFAULTS_SEEDER_URL =
  'https://raw.githubusercontent.com/Mikeys-Tech-Lab/poc/main/mandateLenses/SensibleDefaults/context-seeder.md';
const LOGICAL_RUNTIME_PATHS = new Set([
  '.local',
  '.local/config.md',
  '.dist',
  '.dist/poc-snapshot-images',
]);
const LOGICAL_RUNTIME_PREFIXES = ['.local/', '.dist/'];
const EVOLUTION_RECORDS_DIR = 'docs/guidance/evolution-records/';
const EVOLUTION_RECORDS_EXCLUDED = new Set([
  'docs/guidance/evolution-records/README.md',
  'docs/guidance/evolution-records/template.md',
]);
const RUNTIME_PROPAGATION_FIELD = 'Runtime propagation';

const SKILL_INVENTORY_PATTERN = /^\.cursor\/skills\/([^/]+)\/SKILL\.md$/;
const RULE_INVENTORY_PATTERN = /^\.cursor\/rules\/([^/]+\.mdc)$/;
const CONTINUITY_INVENTORY_PATTERN = /^continuity\/([^/]+\.md)$/;
const AI_GUIDANCE_INVENTORY_PATH = 'docs/onboarding/ai-guidance.md';
const CONTINUITY_INVENTORY_PATH = 'continuity/README.md';

const CONTRACT_MAPPINGS: readonly MappingContract[] = [
  {
    name: 'sensible-defaults-activation',
    triggers: [
      'README.md',
      'mandateLenses/SensibleDefaults/README.md',
      'apps/site/src/lib/activation-prompts.ts',
      'apps/site/src/content/docs/en-us/core-system/mandate-lenses/index.mdx',
      'apps/site/src/content/docs/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
      'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/index.mdx',
      'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
    ],
    checks: [
      { filePath: 'README.md', expectedSnippets: [SENSIBLE_DEFAULTS_SEEDER_URL] },
      {
        filePath: 'mandateLenses/SensibleDefaults/README.md',
        expectedSnippets: [SENSIBLE_DEFAULTS_SEEDER_URL],
      },
      {
        filePath: 'apps/site/src/lib/activation-prompts.ts',
        expectedSnippets: [SENSIBLE_DEFAULTS_SEEDER_URL],
      },
      {
        filePath: 'apps/site/src/content/docs/en-us/core-system/mandate-lenses/index.mdx',
        expectedSnippets: [SENSIBLE_DEFAULTS_SEEDER_URL],
      },
      {
        filePath:
          'apps/site/src/content/docs/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
        expectedSnippets: [SENSIBLE_DEFAULTS_SEEDER_URL],
      },
      {
        filePath:
          'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/index.mdx',
        expectedSnippets: [SENSIBLE_DEFAULTS_SEEDER_URL],
      },
      {
        filePath:
          'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
        expectedSnippets: [SENSIBLE_DEFAULTS_SEEDER_URL],
      },
    ],
  },
  {
    name: 'onboarding-entry',
    triggers: [
      'README.md',
      'AGENTS.md',
      'docs/onboarding/manual.md',
      'docs/onboarding/README.md',
      'docs/onboarding/ai-guidance.md',
      '.cursor/skills/onboarding/SKILL.md',
      '.github/copilot-instructions.md',
      '.claude/CLAUDE.md',
    ],
    checks: [
      { filePath: 'README.md', expectedSnippets: ['onboard me'] },
      { filePath: 'AGENTS.md', expectedSnippets: ['onboard me'] },
      { filePath: 'docs/onboarding/manual.md', expectedSnippets: ['onboard me'] },
      { filePath: 'docs/onboarding/ai-guidance.md', expectedSnippets: ['onboard me'] },
      {
        filePath: '.cursor/skills/onboarding/SKILL.md',
        expectedSnippets: ['docs/onboarding/README.md'],
      },
      { filePath: '.github/copilot-instructions.md', expectedSnippets: ['onboard me'] },
      { filePath: '.claude/CLAUDE.md', expectedSnippets: ['onboard me'] },
    ],
  },
  {
    name: 'evolution-arc-entry',
    triggers: [
      'README.md',
      'AGENTS.md',
      'docs/onboarding/manual.md',
      'docs/onboarding/README.md',
      'docs/onboarding/ai-guidance.md',
      'docs/onboarding/evolution-arc.md',
      'docs/guidance/evolution-arc.md',
      'docs/architecture/workspace.md',
      '.cursor/skills/onboarding/SKILL.md',
      '.cursor/skills/evolution-arc/SKILL.md',
      '.github/copilot-instructions.md',
      '.claude/CLAUDE.md',
    ],
    checks: [
      { filePath: 'README.md', expectedSnippets: ['Evolution Arc'] },
      { filePath: 'AGENTS.md', expectedSnippets: ['Evolution Arc'] },
      { filePath: 'docs/onboarding/manual.md', expectedSnippets: ['Evolution Arc'] },
      { filePath: 'docs/onboarding/README.md', expectedSnippets: ['### evolution-arc'] },
      { filePath: 'docs/onboarding/ai-guidance.md', expectedSnippets: ['`evolution-arc`'] },
      {
        filePath: 'docs/onboarding/evolution-arc.md',
        expectedSnippets: ['docs/guidance/evolution-arc.md', 'Choose register'],
      },
      {
        filePath: 'docs/guidance/evolution-arc.md',
        expectedSnippets: ['docs/onboarding/evolution-arc.md'],
      },
      {
        filePath: '.cursor/skills/evolution-arc/SKILL.md',
        expectedSnippets: ['docs/guidance/evolution-arc.md', 'Ask which register'],
      },
      { filePath: '.cursor/skills/onboarding/SKILL.md', expectedSnippets: ['Evolution Arc'] },
      { filePath: '.github/copilot-instructions.md', expectedSnippets: ['Evolution Arc'] },
      { filePath: '.claude/CLAUDE.md', expectedSnippets: ['Evolution Arc'] },
      {
        filePath: 'docs/architecture/workspace.md',
        expectedSnippets: ['.cursor/skills/evolution-arc/', 'docs/guidance/evolution-arc.md'],
      },
    ],
  },
  {
    name: 'trace-reflect-and-evolve-entry',
    triggers: [
      'README.md',
      'AGENTS.md',
      'docs/onboarding/manual.md',
      'docs/onboarding/README.md',
      'docs/onboarding/ai-guidance.md',
      'docs/onboarding/contributing.md',
      'docs/onboarding/workspace-overview.md',
      'docs/onboarding/trace-reflect-and-evolve.md',
      'docs/guidance/README.md',
      'docs/guidance/trace-reflect-and-evolve.md',
      'docs/guidance/evolution-records/README.md',
      '.cursor/skills/onboarding/SKILL.md',
      '.cursor/skills/github-automation/SKILL.md',
      '.cursor/skills/trace-reflect-and-evolve/SKILL.md',
      '.github/pull_request_template.md',
      '.github/copilot-instructions.md',
      '.claude/CLAUDE.md',
      'docs/architecture/workspace.md',
    ],
    checks: [
      { filePath: 'README.md', expectedSnippets: ['Trace, Reflect and Evolve'] },
      {
        filePath: 'AGENTS.md',
        expectedSnippets: ['Trace, Reflect and Evolve', 'docs/guidance/evolution-records/'],
      },
      { filePath: 'docs/onboarding/manual.md', expectedSnippets: ['Trace, Reflect and Evolve'] },
      {
        filePath: 'docs/onboarding/README.md',
        expectedSnippets: ['### trace-reflect-and-evolve'],
      },
      {
        filePath: 'docs/onboarding/ai-guidance.md',
        expectedSnippets: ['`trace-reflect-and-evolve`'],
      },
      {
        filePath: 'docs/onboarding/contributing.md',
        expectedSnippets: ['Trace, Reflect and Evolve', 'Learning trace'],
      },
      {
        filePath: 'docs/onboarding/workspace-overview.md',
        expectedSnippets: [
          'Trace, Reflect and Evolve',
          'docs/guidance/trace-reflect-and-evolve.md',
        ],
      },
      {
        filePath: 'docs/onboarding/trace-reflect-and-evolve.md',
        expectedSnippets: [
          'docs/guidance/trace-reflect-and-evolve.md',
          'docs/guidance/evolution-records/',
        ],
      },
      {
        filePath: 'docs/guidance/README.md',
        expectedSnippets: ['Trace, Reflect and Evolve', 'Evolution Records'],
      },
      {
        filePath: 'docs/guidance/trace-reflect-and-evolve.md',
        expectedSnippets: [
          'docs/onboarding/trace-reflect-and-evolve.md',
          'docs/guidance/evolution-records/README.md',
        ],
      },
      {
        filePath: 'docs/guidance/evolution-records/README.md',
        expectedSnippets: ['template.md'],
      },
      {
        filePath: '.cursor/skills/onboarding/SKILL.md',
        expectedSnippets: ['Trace, Reflect and Evolve'],
      },
      {
        filePath: '.cursor/skills/github-automation/SKILL.md',
        expectedSnippets: ['Trace, Reflect and Evolve', 'Learning trace'],
      },
      {
        filePath: '.cursor/skills/trace-reflect-and-evolve/SKILL.md',
        expectedSnippets: ['docs/guidance/trace-reflect-and-evolve.md', 'Evolution Record'],
      },
      {
        filePath: '.github/pull_request_template.md',
        expectedSnippets: ['## Learning trace', 'Evolution Record'],
      },
      {
        filePath: '.github/copilot-instructions.md',
        expectedSnippets: ['Trace, Reflect and Evolve'],
      },
      { filePath: '.claude/CLAUDE.md', expectedSnippets: ['Trace, Reflect and Evolve'] },
      {
        filePath: 'docs/architecture/workspace.md',
        expectedSnippets: [
          '.cursor/skills/trace-reflect-and-evolve/',
          'docs/guidance/evolution-records/',
        ],
      },
    ],
  },
];

const toPosix = (value: string): string => value.replaceAll('\\', '/');

const normalizeRepoPath = (value: string): string => {
  const normalized = path.normalize(toPosix(value).trim());
  return normalized.replace(/^\.\//, '').replace(/\/$/, '');
};

const stripAnchorAndQuery = (value: string): string => {
  const withoutAnchor = value.split('#')[0] ?? value;
  return (withoutAnchor.split('?')[0] ?? withoutAnchor).trim();
};

const isLikelyPathReference = (value: string): boolean => {
  const candidate = stripAnchorAndQuery(value);
  if (!candidate) return false;
  if (candidate.startsWith('http://') || candidate.startsWith('https://')) return false;
  if (candidate.startsWith('mailto:')) return false;
  if (candidate.startsWith('#')) return false;
  if (candidate.startsWith('/') && !candidate.startsWith('/Users/')) return false;
  if (candidate.includes('://')) return false;
  if (candidate.includes('*')) return false;
  return (
    candidate.startsWith('./') ||
    candidate.startsWith('../') ||
    candidate.startsWith('.cursor/') ||
    candidate.startsWith('.github/') ||
    candidate.startsWith('.claude/') ||
    candidate.startsWith('.local/') ||
    candidate.startsWith('docs/') ||
    candidate.startsWith('tools/') ||
    candidate.startsWith('apps/') ||
    candidate.startsWith('seeds/') ||
    candidate.startsWith('continuity/') ||
    candidate.startsWith('mandateLenses/') ||
    candidate.startsWith('AGENTS.md') ||
    candidate.startsWith('README.md') ||
    FILE_EXTENSION_PATTERN.test(candidate)
  );
};

const resolveMarkdownPathReference = (sourcePath: string, rawValue: string): string | null => {
  const candidate = stripAnchorAndQuery(rawValue);
  if (!isLikelyPathReference(candidate)) return null;
  if (candidate.startsWith('/Users/')) return candidate;
  const resolved =
    candidate.startsWith('./') ||
    candidate.startsWith('../') ||
    (!candidate.includes('/') && FILE_EXTENSION_PATTERN.test(candidate))
      ? path.join(path.dirname(sourcePath), candidate)
      : candidate;
  return normalizeRepoPath(resolved);
};

const resolveBacktickPathReference = (sourcePath: string, rawValue: string): string | null => {
  const candidate = stripAnchorAndQuery(rawValue);
  if (!isLikelyPathReference(candidate)) return null;
  if (candidate.startsWith('/Users/')) return candidate;
  if (!candidate.includes('/')) {
    if (ROOT_FILE_REFERENCES.has(candidate)) {
      return normalizeRepoPath(candidate);
    }

    if (candidate === 'SKILL.md') {
      return null;
    }

    return null;
  }

  const resolved =
    candidate.startsWith('./') || candidate.startsWith('../')
      ? path.join(path.dirname(sourcePath), candidate)
      : candidate;
  return normalizeRepoPath(resolved);
};

const stripFencedCodeBlocks = (content: string): string => content.replace(/```[\s\S]*?```/g, '');

export const extractPathReferences = (sourcePath: string, content: string): readonly string[] => {
  const references = new Set<string>();
  const contentWithoutFences = stripFencedCodeBlocks(content);

  for (const match of contentWithoutFences.matchAll(MARKDOWN_LINK_PATTERN)) {
    const resolved = resolveMarkdownPathReference(sourcePath, match[1] ?? '');
    if (resolved) references.add(resolved);
  }

  for (const match of contentWithoutFences.matchAll(BACKTICK_PATTERN)) {
    const resolved = resolveBacktickPathReference(sourcePath, match[1] ?? '');
    if (resolved) references.add(resolved);
  }

  return [...references];
};

const pathExists = (
  candidate: string,
  repoFiles: ReadonlySet<string>,
  repoDirectories: ReadonlySet<string>,
): boolean => {
  if (candidate.startsWith('/Users/')) return true;
  if (LOGICAL_RUNTIME_PATHS.has(candidate)) return true;
  if (LOGICAL_RUNTIME_PREFIXES.some((prefix) => candidate.startsWith(prefix))) return true;
  if (repoFiles.has(candidate)) return true;
  if (repoDirectories.has(candidate)) return true;
  return false;
};

export const parseOnboardingIndex = (content: string): readonly OnboardingTopic[] => {
  const lines = content.split('\n');
  const topics: OnboardingTopic[] = [];
  let current: {
    id: string;
    title?: string;
    docPath?: string;
    whenToUse?: string;
    prereqs?: readonly string[];
  } | null = null;

  const pushCurrent = () => {
    if (!current) return;
    topics.push({
      id: current.id,
      title: current.title ?? '',
      docPath: current.docPath ?? '',
      whenToUse: current.whenToUse ?? '',
      prereqs: current.prereqs ?? [],
    });
  };

  for (const line of lines) {
    const headerMatch = /^### (.+)$/.exec(line.trim());
    if (headerMatch) {
      pushCurrent();
      current = { id: headerMatch[1] ?? '' };
      continue;
    }

    if (!current) continue;

    const titleMatch = /^- \*\*Title:\*\* (.+)$/.exec(line.trim());
    if (titleMatch) {
      current = { ...current, title: titleMatch[1] ?? '' };
      continue;
    }

    const pathMatch = /^- \*\*Path:\*\* `(.+)`$/.exec(line.trim());
    if (pathMatch) {
      current = { ...current, docPath: pathMatch[1] ?? '' };
      continue;
    }

    const whenMatch = /^- \*\*When to use:\*\* (.+)$/.exec(line.trim());
    if (whenMatch) {
      current = { ...current, whenToUse: whenMatch[1] ?? '' };
      continue;
    }

    const prereqMatch = /^- \*\*Prereqs:\*\* (.+)$/.exec(line.trim());
    if (prereqMatch) {
      const rawPrereqs = prereqMatch[1]?.trim() ?? '';
      const prereqs =
        rawPrereqs === 'none'
          ? []
          : rawPrereqs.split(',').map((entry) => entry.trim().replaceAll('`', ''));
      current = { ...current, prereqs };
    }
  }

  pushCurrent();
  return topics;
};

const validateOnboardingIndex = (
  topics: readonly OnboardingTopic[],
  repoFiles: ReadonlySet<string>,
): readonly GuidanceFailure[] => {
  const failures: GuidanceFailure[] = [];
  const ids = new Set(topics.map((topic) => topic.id));

  for (const topic of topics) {
    if (!topic.title) {
      failures.push({
        scope: ONBOARDING_INDEX_PATH,
        message: `Topic "${topic.id}" is missing a Title.`,
      });
    }

    if (!topic.docPath) {
      failures.push({
        scope: ONBOARDING_INDEX_PATH,
        message: `Topic "${topic.id}" is missing a Path.`,
      });
    } else if (!repoFiles.has(normalizeRepoPath(topic.docPath))) {
      failures.push({
        scope: ONBOARDING_INDEX_PATH,
        message: `Topic "${topic.id}" points to missing path "${topic.docPath}".`,
      });
    }

    if (!topic.whenToUse) {
      failures.push({
        scope: ONBOARDING_INDEX_PATH,
        message: `Topic "${topic.id}" is missing "When to use".`,
      });
    }

    for (const prereq of topic.prereqs) {
      if (!ids.has(prereq)) {
        failures.push({
          scope: ONBOARDING_INDEX_PATH,
          message: `Topic "${topic.id}" references unknown prereq "${prereq}".`,
        });
      }
    }
  }

  return failures;
};

const validateFileReferences = (
  filePath: string,
  content: string,
  repoFiles: ReadonlySet<string>,
  repoDirectories: ReadonlySet<string>,
): readonly GuidanceFailure[] => {
  const failures: GuidanceFailure[] = [];

  for (const reference of extractPathReferences(filePath, content)) {
    if (!pathExists(reference, repoFiles, repoDirectories)) {
      failures.push({
        scope: filePath,
        message: `Referenced path "${reference}" does not exist.`,
      });
    }
  }

  return failures;
};

const triggeredByChange = (
  changedFiles: readonly string[],
  triggers: readonly string[],
): boolean => {
  if (changedFiles.length === 0) return true;
  return changedFiles.some((changedFile) =>
    triggers.some((trigger) => changedFile === trigger || changedFile.startsWith(trigger)),
  );
};

const validateContractMapping = (
  mapping: MappingContract,
  files: Readonly<Record<string, string>>,
): readonly GuidanceFailure[] => {
  const failures: GuidanceFailure[] = [];

  for (const check of mapping.checks) {
    const content = files[check.filePath];
    if (content === undefined) {
      failures.push({
        scope: mapping.name,
        message: `Expected contract file "${check.filePath}" is missing from validator input.`,
      });
      continue;
    }

    for (const snippet of check.expectedSnippets) {
      if (!content.includes(snippet)) {
        failures.push({
          scope: mapping.name,
          message: `File "${check.filePath}" is missing expected snippet "${snippet}".`,
        });
      }
    }
  }

  return failures;
};

const validateEvolutionRecords = (
  records: Readonly<Record<string, string>>,
): readonly GuidanceFailure[] => {
  const failures: GuidanceFailure[] = [];

  for (const [filePath, content] of Object.entries(records)) {
    if (!filePath.startsWith(EVOLUTION_RECORDS_DIR) || !filePath.endsWith('.md')) continue;
    if (EVOLUTION_RECORDS_EXCLUDED.has(filePath)) continue;
    if (!content.includes(RUNTIME_PROPAGATION_FIELD)) {
      failures.push({
        scope: filePath,
        message: `Evolution record is missing a "${RUNTIME_PROPAGATION_FIELD}" field.`,
      });
    }
  }

  return failures;
};

interface InventoryContract {
  readonly label: string;
  readonly inventoryPath: string;
  readonly entries: readonly string[];
}

const collectInventoryEntries = (
  repoFiles: ReadonlySet<string>,
  pattern: RegExp,
): readonly string[] => {
  const entries = new Set<string>();
  for (const filePath of repoFiles) {
    const name = pattern.exec(filePath)?.[1];
    if (name) entries.add(name);
  }
  return [...entries].sort();
};

const validateInventoryContract = (
  contract: InventoryContract,
  files: Readonly<Record<string, string>>,
): readonly GuidanceFailure[] => {
  if (contract.entries.length === 0) return [];

  const content = files[contract.inventoryPath];
  if (content === undefined) {
    return [
      {
        scope: contract.inventoryPath,
        message: `Inventory surface "${contract.inventoryPath}" is missing from validator input.`,
      },
    ];
  }

  const failures: GuidanceFailure[] = [];
  for (const entry of contract.entries) {
    if (!content.includes(entry)) {
      failures.push({
        scope: contract.inventoryPath,
        message: `${contract.label} "${entry}" is not listed in ${contract.inventoryPath}.`,
      });
    }
  }
  return failures;
};

const validateInventories = (
  repoFiles: ReadonlySet<string>,
  files: Readonly<Record<string, string>>,
): readonly GuidanceFailure[] => {
  // `*.audit.md` files are covered by a documented pattern in the continuity
  // README, not enumerated individually; the README itself is not an entry.
  const continuityEntries = collectInventoryEntries(repoFiles, CONTINUITY_INVENTORY_PATTERN).filter(
    (name) => name !== 'README.md' && !name.endsWith('.audit.md'),
  );

  const contracts: readonly InventoryContract[] = [
    {
      label: 'Skill',
      inventoryPath: AI_GUIDANCE_INVENTORY_PATH,
      entries: collectInventoryEntries(repoFiles, SKILL_INVENTORY_PATTERN),
    },
    {
      label: 'Rule',
      inventoryPath: AI_GUIDANCE_INVENTORY_PATH,
      entries: collectInventoryEntries(repoFiles, RULE_INVENTORY_PATTERN),
    },
    {
      label: 'Continuity doc',
      inventoryPath: CONTINUITY_INVENTORY_PATH,
      entries: continuityEntries,
    },
  ];

  return contracts.flatMap((contract) => validateInventoryContract(contract, files));
};

export const runGuidanceDriftGuard = (input: GuidanceCheckInput): GuidanceCheckResult => {
  const failures: GuidanceFailure[] = [];
  const onboardingIndex = input.files[ONBOARDING_INDEX_PATH];

  if (onboardingIndex === undefined) {
    failures.push({
      scope: ONBOARDING_INDEX_PATH,
      message: 'Onboarding topic index could not be loaded.',
    });
  } else {
    failures.push(
      ...validateOnboardingIndex(parseOnboardingIndex(onboardingIndex), input.repoFiles),
    );
  }

  for (const [filePath, content] of Object.entries(input.files)) {
    failures.push(
      ...validateFileReferences(filePath, content, input.repoFiles, input.repoDirectories),
    );
  }

  failures.push(...validateEvolutionRecords(input.evolutionRecords));
  failures.push(...validateInventories(input.repoFiles, input.files));

  const activatedMappings = CONTRACT_MAPPINGS.filter((mapping) =>
    triggeredByChange(input.changedFiles, mapping.triggers),
  );

  for (const mapping of activatedMappings) {
    failures.push(...validateContractMapping(mapping, input.files));
  }

  return {
    activatedMappings: activatedMappings.map((mapping) => mapping.name),
    failures,
  };
};
