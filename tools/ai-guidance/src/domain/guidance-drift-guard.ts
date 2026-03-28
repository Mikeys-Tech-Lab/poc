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

const CONTRACT_MAPPINGS: readonly MappingContract[] = [
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

const isDirectoryReference = (value: string): boolean => value.endsWith('/');

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
    candidate.startsWith('.local/') ||
    candidate.startsWith('docs/') ||
    candidate.startsWith('tools/') ||
    candidate.startsWith('apps/') ||
    candidate.startsWith('seeds/') ||
    candidate.startsWith('AGENTS.md') ||
    candidate.startsWith('README.md') ||
    FILE_EXTENSION_PATTERN.test(candidate) ||
    isDirectoryReference(candidate)
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

    if (candidate.endsWith('.md') && candidate !== 'README.md' && candidate !== 'AGENTS.md') {
      return normalizeRepoPath(path.join(path.dirname(sourcePath), candidate));
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
