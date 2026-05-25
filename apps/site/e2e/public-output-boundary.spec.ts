import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { expect, test } from '@playwright/test';
import { directSourceEntries } from '../src/content/structural/en-us/ai-is-not-magic-it-is-a-cognitive-amplifier.data';
import { ESSAY_HREF } from '../src/lib/structural/essay-route';

const distRoot = new URL('dist/', `${pathToFileURL(process.cwd()).href}/`);
interface LeakPattern {
  readonly category: string;
  readonly label: string;
  readonly pattern: RegExp;
}

const scannedExtensions = new Set([
  '.html',
  '.js',
  '.json',
  '.xml',
  '.txt',
  '.css',
  '.map',
  '.webmanifest',
]);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const fromSerializedKeyList = (category: string, values: readonly string[]): LeakPattern[] =>
  values.map((value) => ({
    category,
    label: value,
    pattern: new RegExp(
      `(?:"${escapeRegExp(value)}"|'${escapeRegExp(value)}'|\\b${escapeRegExp(value)}\\b)\\s*:`,
    ),
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

const metadataKey = (...parts: string[]) => parts.join('_');
const draftMetadataKeys = [
  'article_type',
  'authorship',
  'canonical_locale',
  'canonical_register',
  'canonical_relation',
  metadataKey('canonical', 'source', 'repo', 'path'),
  'canonical_target_path',
  'license_notice',
  'register_set',
  'source_draft',
  metadataKey('source', 'intake'),
  'source_register',
] as const;

const workflowMetadataKeys = [
  metadataKey('distribution', 'channels'),
  metadataKey('promotion', 'targets'),
  metadataKey('register', 'routes'),
  'zeitgeist_grounding',
] as const;

const publicUiLeakPatterns: readonly LeakPattern[] = [
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

const leakPatterns: readonly LeakPattern[] = [
  ...privatePathPatterns,
  ...fromSerializedKeyList('draft metadata key', draftMetadataKeys),
  ...fromSerializedKeyList('workflow metadata key', workflowMetadataKeys),
  ...publicUiLeakPatterns,
  ...fromEnvironmentLiteralList('POC_PRIVATE_LEAK_PATTERNS'),
];

const collectDistFiles = (directory: URL): URL[] => {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    if (entry.isDirectory()) return collectDistFiles(child);
    return scannedExtensions.has(extname(entry.name)) ? [child] : [];
  });
};

const toDistRelativePath = (file: URL) =>
  decodeURIComponent(file.pathname.replace(distRoot.pathname, ''));

test.describe('public output boundary', () => {
  test('article source markers render declared reader-facing labels', async ({ page }) => {
    await page.goto(ESSAY_HREF);

    for (const [index, source] of directSourceEntries.entries()) {
      await expect(page.getByRole('link', { name: `Open source: ${source.title}` })).toHaveText(
        `${index + 1}. ${source.title}`,
      );
    }
  });

  test('generated site output does not leak private paths, draft metadata, or internal field names', () => {
    const files = collectDistFiles(distRoot);
    const failures: string[] = [];

    expect(files.length, 'dist output should exist before this check runs').toBeGreaterThan(0);

    for (const file of files) {
      const content = readFileSync(file, 'utf8');

      for (const pattern of leakPatterns) {
        if (pattern.pattern.test(content)) {
          failures.push(
            `${toDistRelativePath(file)} matched ${pattern.category}: ${pattern.label}`,
          );
        }
      }
    }

    expect(failures, 'public output boundary leaks found').toEqual([]);
  });
});
