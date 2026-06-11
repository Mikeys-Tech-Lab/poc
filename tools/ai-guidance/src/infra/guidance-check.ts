import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { type GuidanceCheckInput, runGuidanceDriftGuard } from '../domain/guidance-drift-guard.js';

const REPO_ROOT = resolve(import.meta.dirname, '../../../../');
const TARGET_FILES = [
  'README.md',
  'mandateLenses/SensibleDefaults/README.md',
  'AGENTS.md',
  '.github/copilot-instructions.md',
  '.github/pull_request_template.md',
  '.claude/CLAUDE.md',
  '.cursor/skills/github-automation/SKILL.md',
  '.cursor/skills/onboarding/SKILL.md',
  '.cursor/skills/evolution-arc/SKILL.md',
  '.cursor/skills/trace-reflect-and-evolve/SKILL.md',
  'docs/onboarding/README.md',
  'docs/onboarding/manual.md',
  'docs/onboarding/ai-guidance.md',
  'docs/onboarding/contributing.md',
  'docs/onboarding/evolution-arc.md',
  'docs/onboarding/trace-reflect-and-evolve.md',
  'docs/onboarding/workspace-overview.md',
  'docs/guidance/README.md',
  'docs/guidance/evolution-arc.md',
  'docs/guidance/trace-reflect-and-evolve.md',
  'docs/guidance/evolution-records/README.md',
  'docs/architecture/workspace.md',
  'apps/site/src/lib/activation-prompts.ts',
  'apps/site/src/content/docs/en-us/core-system/mandate-lenses/index.mdx',
  'apps/site/src/content/docs/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
  'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/index.mdx',
  'apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx',
];

const toPosix = (value: string): string => value.replaceAll('\\', '/');

const collectRepoEntries = async (
  currentPath: string,
  rootPath: string,
  files: Set<string>,
  directories: Set<string>,
): Promise<void> => {
  const entries = await readdir(currentPath, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = resolve(currentPath, entry.name);
    const relativePath = toPosix(absolutePath.replace(`${rootPath}/`, ''));

    if (entry.isDirectory()) {
      directories.add(relativePath);
      await collectRepoEntries(absolutePath, rootPath, files, directories);
      continue;
    }

    if (entry.isFile()) {
      files.add(relativePath);
    }
  }
};

const loadChangedFiles = async (args: readonly string[]): Promise<readonly string[]> => {
  const flagIndex = args.indexOf('--changed-files');
  if (flagIndex === -1) return [];
  const targetPath = args[flagIndex + 1];
  if (!targetPath) {
    throw new Error('Missing path after --changed-files.');
  }

  const absolutePath = targetPath.startsWith('/') ? targetPath : resolve(REPO_ROOT, targetPath);
  const content = await readFile(absolutePath, 'utf-8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(toPosix);
};

const main = async () => {
  const repoFiles = new Set<string>();
  const repoDirectories = new Set<string>();
  await collectRepoEntries(REPO_ROOT, REPO_ROOT, repoFiles, repoDirectories);

  const files = Object.fromEntries(
    await Promise.all(
      TARGET_FILES.map(async (filePath) => [
        filePath,
        await readFile(resolve(REPO_ROOT, filePath), 'utf-8'),
      ]),
    ),
  );

  const evolutionRecordPaths = [...repoFiles].filter(
    (filePath) =>
      filePath.startsWith('docs/guidance/evolution-records/') && filePath.endsWith('.md'),
  );

  const evolutionRecords = Object.fromEntries(
    await Promise.all(
      evolutionRecordPaths.map(async (filePath) => [
        filePath,
        await readFile(resolve(REPO_ROOT, filePath), 'utf-8'),
      ]),
    ),
  );

  const input: GuidanceCheckInput = {
    files,
    repoFiles,
    repoDirectories,
    changedFiles: await loadChangedFiles(process.argv.slice(2)),
    evolutionRecords,
  };

  const result = runGuidanceDriftGuard(input);

  if (result.failures.length === 0) {
    const mappingSummary =
      result.activatedMappings.length === 0
        ? 'core integrity checks only'
        : `activated mappings: ${result.activatedMappings.join(', ')}`;
    console.log(`Guidance drift guard passed (${mappingSummary}).`);
    return;
  }

  console.error('Guidance drift guard failed.');
  for (const failure of result.failures) {
    console.error(`- [${failure.scope}] ${failure.message}`);
  }
  process.exit(1);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
