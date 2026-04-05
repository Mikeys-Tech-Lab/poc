import { extname } from 'node:path';

export interface LicenseSurfaceFile {
  readonly path: string;
  readonly content: string;
}

export interface LicenseSurfaceFailure {
  readonly path: string;
  readonly message: string;
}

export interface LicenseSurfaceCheckResult {
  readonly failures: readonly LicenseSurfaceFailure[];
  readonly checkedPaths: readonly string[];
}

export const LICENSED_MARKDOWN_EXTENSIONS = ['.md', '.mdx', '.mdc'] as const;

const EXPLICIT_LICENSE_PATTERNS = [
  /\*\*License:\*\*.*CC BY 4\.0/s,
  /Licensed under \[CC BY 4\.0\]/,
  /Licensed under CC BY 4\.0\. Repository code and tooling: MIT\./,
] as const;

export const requiresExplicitLicenseNotice = (filePath: string): boolean =>
  LICENSED_MARKDOWN_EXTENSIONS.includes(
    extname(filePath) as (typeof LICENSED_MARKDOWN_EXTENSIONS)[number],
  );

export const hasExplicitLicenseNotice = (content: string): boolean =>
  EXPLICIT_LICENSE_PATTERNS.some((pattern) => pattern.test(content));

export const runLicenseSurfaceCheck = (
  files: readonly LicenseSurfaceFile[],
): LicenseSurfaceCheckResult => {
  const checkedFiles = files.filter((file) => requiresExplicitLicenseNotice(file.path));
  const failures = checkedFiles.flatMap((file) =>
    hasExplicitLicenseNotice(file.content)
      ? []
      : [
          {
            path: file.path,
            message:
              'Tracked markdown-like source file is missing an explicit CC BY 4.0 license notice.',
          },
        ],
  );

  return {
    failures,
    checkedPaths: checkedFiles.map((file) => file.path),
  };
};
