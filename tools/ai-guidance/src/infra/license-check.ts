import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runLicenseSurfaceCheck } from '../domain/license-surface-policy.js';

const REPO_ROOT = resolve(import.meta.dirname, '../../../../');

const toPosix = (value: string): string => value.replaceAll('\\', '/');

const loadTrackedMarkdownPaths = (): readonly string[] => {
  const output = execFileSync('git', ['ls-files', '*.md', '*.mdx', '*.mdc'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(toPosix);
};

const main = async () => {
  const paths = loadTrackedMarkdownPaths();
  const files = await Promise.all(
    paths.map(async (filePath) => ({
      path: filePath,
      content: await readFile(resolve(REPO_ROOT, filePath), 'utf8'),
    })),
  );

  const result = runLicenseSurfaceCheck(files);

  if (result.failures.length === 0) {
    console.log(`License surface check passed (${result.checkedPaths.length} files checked).`);
    return;
  }

  console.error('License surface check failed.');
  for (const failure of result.failures) {
    console.error(`- [${failure.path}] ${failure.message}`);
  }
  process.exit(1);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
