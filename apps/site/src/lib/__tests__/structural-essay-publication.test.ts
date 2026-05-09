import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getRegisterAvailabilityForRouteId, getRouteById } from '../route-map.js';
import {
  buildEssayHref,
  directSourceEntries,
  ESSAY_ROUTE_ID,
  essayAnchors,
  furtherReadingEntries,
} from '../structural-essays/ai-is-not-magic-it-is-a-mirror-with-a-motor';

const repoRoot = new URL('../../../../../', import.meta.url);
interface LeakPattern {
  readonly category: string;
  readonly label: string;
  readonly pattern: RegExp;
}

const firstEssayContentPaths = [
  'apps/site/src/content/docs/en-us/signals/structural-essays/ai-is-not-magic-it-is-a-mirror-with-a-motor.mdx',
  'apps/site/src/content/register/orientation/en-us/signals/structural-essays/ai-is-not-magic-it-is-a-mirror-with-a-motor.mdx',
  'apps/site/src/content/register/everyday/en-us/signals/structural-essays/ai-is-not-magic-it-is-a-mirror-with-a-motor.mdx',
] as const;

const allowedFrontmatterKeys = new Set(['title', 'description', 'register']);
const forbiddenDraftMetadataKeys = [
  'article_type',
  'locale',
  'stage',
  'status',
  'version',
  'author',
  'authorship',
  'license_notice',
  'zeitgeist_grounding',
  'source_intake',
  'canonical_source_repo_path',
  'canonical_relation',
  'canonical_target_path',
  'canonical_register',
  'canonical_locale',
  'source_register',
  'source_draft',
  'register_set',
  'promotion_targets',
  'distribution_channels',
  'register_routes',
] as const;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const fromYamlKeyList = (category: string, values: readonly string[]): LeakPattern[] =>
  values.map((value) => ({
    category,
    label: value,
    pattern: new RegExp(`(?:^|\\n)${escapeRegExp(value)}:`),
  }));

const fromEnvironmentLiteralList = (environmentKey: string): LeakPattern[] =>
  (process.env[environmentKey] ?? '')
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value, index) => ({
      category: 'extra private pattern',
      label: `${environmentKey}[${index}]`,
      pattern: new RegExp(escapeRegExp(value)),
    }));

const privatePathPatterns: readonly LeakPattern[] = [
  {
    category: 'private path class',
    label: 'absolute macOS home path',
    pattern: /(?:^|[^A-Za-z0-9_-])\/Users\/[A-Za-z0-9._-]+(?:\/|$)/,
  },
  {
    category: 'private path class',
    label: 'absolute Linux home path',
    pattern: /(?:^|[^A-Za-z0-9_-])\/home\/[A-Za-z0-9._-]+(?:\/|$)/,
  },
  {
    category: 'private path class',
    label: 'absolute Windows user path',
    pattern: /[A-Za-z]:\\Users\\[A-Za-z0-9._-]+\\/,
  },
  {
    category: 'private path class',
    label: 'local file URL',
    pattern: /file:\/\/(?:\/|[A-Za-z]:)/i,
  },
];

const workflowMetadataKeys = [
  'distribution_channels',
  'promotion_targets',
  'register_routes',
  'zeitgeist_grounding',
] as const;

const publicCopyForbiddenPatterns: readonly LeakPattern[] = [
  {
    category: 'public UI implementation field',
    label: 'source hook copy',
    pattern: /source hook/i,
  },
  { category: 'public UI implementation field', label: 'source id copy', pattern: /source id/i },
  { category: 'public UI implementation field', label: 'route id copy', pattern: /route id/i },
  { category: 'public UI implementation field', label: 'anchorId field', pattern: /anchorId/ },
  {
    category: 'public UI implementation field',
    label: 'targetRegister field',
    pattern: /targetRegister/,
  },
  { category: 'public UI implementation field', label: 'routeId field', pattern: /routeId/ },
];

const sourceLeakPatterns: readonly LeakPattern[] = [
  ...privatePathPatterns,
  ...fromYamlKeyList('draft metadata key', forbiddenDraftMetadataKeys),
  ...fromYamlKeyList('workflow metadata key', workflowMetadataKeys),
  ...fromEnvironmentLiteralList('POC_PRIVATE_LEAK_PATTERNS'),
];

const read = (relativePath: string) => readFileSync(new URL(relativePath, repoRoot), 'utf8');

const extractFrontmatter = (content: string) => {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match?.[1] ?? '';
};

const frontmatterKeys = (frontmatter: string) =>
  frontmatter
    .split('\n')
    .map((line) => line.match(/^([A-Za-z0-9_-]+):/)?.[1])
    .filter((key): key is string => Boolean(key));

const collectFiles = (root: URL, extensions: readonly string[]): URL[] => {
  if (!existsSync(root)) return [];

  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, root);
    if (entry.isDirectory()) return collectFiles(child, extensions);
    return extensions.includes(extname(entry.name)) ? [child] : [];
  });
};

const toRepoRelativePath = (file: URL) =>
  decodeURIComponent(file.pathname.replace(repoRoot.pathname, ''));

const publicTextValues = (value: unknown): string[] => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(publicTextValues);
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      [
        'title',
        'label',
        'href',
        'supports',
        'limits',
        'note',
        'signal',
        'question',
        'entryLabel',
      ].includes(key)
        ? publicTextValues(child)
        : [],
    );
  }
  return [];
};

describe('first structural essay publication contract', () => {
  it('publishes public MDX frontmatter from the allowlist only', () => {
    for (const path of firstEssayContentPaths) {
      const keys = frontmatterKeys(extractFrontmatter(read(path)));
      expect(
        keys.every((key) => allowedFrontmatterKeys.has(key)),
        path,
      ).toBe(true);

      for (const forbiddenKey of forbiddenDraftMetadataKeys) {
        expect(keys, `${path} should not include ${forbiddenKey}`).not.toContain(forbiddenKey);
      }
    }
  });

  it('keeps public source content free of private paths and draft metadata', () => {
    const contentFiles = collectFiles(new URL('apps/site/src/content/', repoRoot), ['.mdx', '.md']);
    const failures: string[] = [];

    for (const filePath of contentFiles) {
      const content = readFileSync(filePath, 'utf8');
      for (const pattern of sourceLeakPatterns) {
        if (pattern.pattern.test(content)) {
          failures.push(
            `${toRepoRelativePath(filePath)} matched ${pattern.category}: ${pattern.label}`,
          );
        }
      }
    }

    expect(failures, 'public source boundary leaks found').toEqual([]);
  });

  it('keeps direct source entries unique, public, and bounded', () => {
    const ids = directSourceEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const source of directSourceEntries) {
      expect(source.href).toMatch(/^https:\/\//);
      expect(source.supports.trim().length).toBeGreaterThan(20);
      expect(source.limits.trim().length).toBeGreaterThan(20);
    }
  });

  it('keeps further reading distinct from direct source entries', () => {
    const directIds = new Set(directSourceEntries.map((entry) => entry.id));

    for (const entry of furtherReadingEntries) {
      expect(directIds.has(entry.id)).toBe(false);
      expect(entry.href).toMatch(/^https:\/\//);
      expect(entry.note.trim().length).toBeGreaterThan(20);
    }
  });

  it('uses only declared source entries from the practitioner essay', () => {
    const content = read(firstEssayContentPaths[0]);
    const usedIds = [...content.matchAll(/sourceId="([^"]+)"/g)].map((match) => match[1]);
    const declaredIds = new Set(directSourceEntries.map((entry) => entry.id));

    expect(usedIds.length).toBeGreaterThan(0);
    for (const id of usedIds) {
      expect(declaredIds.has(id), `${id} should be declared`).toBe(true);
    }
  });

  it('keeps anchors unique and pointed at available public registers', () => {
    const route = getRouteById(ESSAY_ROUTE_ID);
    const availability = getRegisterAvailabilityForRouteId(ESSAY_ROUTE_ID);
    const anchorIds = essayAnchors.map((anchor) => anchor.anchorId);

    expect(route).not.toBeNull();
    expect(new Set(anchorIds).size).toBe(anchorIds.length);

    for (const anchor of essayAnchors) {
      expect(anchor.routeId).toBe(ESSAY_ROUTE_ID);
      expect(availability.available).toContain(anchor.targetRegister);
      expect(anchor.href).toBe(buildEssayHref(anchor.targetRegister));
      expect(anchor.href).toMatch(/^\/en-us\/signals\/structural-essays\//);
    }
  });

  it('keeps anchor cards from rendering internal field names', () => {
    const anchorCard = read('apps/site/src/components/AnchorCard.astro');

    for (const forbidden of ['targetRegister', 'routeId', 'anchorId']) {
      expect(anchorCard).not.toContain(forbidden);
    }

    for (const value of publicTextValues(essayAnchors)) {
      for (const pattern of publicCopyForbiddenPatterns) {
        expect(
          value,
          `${value} should not match ${pattern.category}: ${pattern.label}`,
        ).not.toMatch(pattern.pattern);
      }
    }
  });

  it('keeps source and anchor labels reader-facing', () => {
    const sourceLedger = read('apps/site/src/components/SourceLedger.astro');
    const anchorMap = read('apps/site/src/components/AnchorMap.astro');

    for (const label of [
      'Sources',
      'What this supports',
      'Limits',
      'Further reading',
      'Deeper context',
      'Ways into this essay',
    ]) {
      expect(`${sourceLedger}\n${anchorMap}`).toContain(label);
    }
  });
});
