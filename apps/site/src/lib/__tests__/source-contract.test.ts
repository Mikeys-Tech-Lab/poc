import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  directSourceEntries as pathDirectSourceEntries,
  furtherReadingEntries as pathFurtherReadingEntries,
} from '../../content/sources/en-us/signals/operational/work-delivery/a-path-through-integration-lag.sources';
import {
  directSourceEntries as integrationLagDirectSourceEntries,
  furtherReadingEntries as integrationLagFurtherReadingEntries,
} from '../../content/sources/en-us/signals/operational/work-delivery/integration-lag.sources';
import {
  directSourceEntries as verificationTaxDirectSourceEntries,
  furtherReadingEntries as verificationTaxFurtherReadingEntries,
} from '../../content/sources/en-us/signals/operational/work-delivery/the-verification-tax.sources';
import {
  directSourceEntries as aiDirectSourceEntries,
  furtherReadingEntries as aiFurtherReadingEntries,
} from '../../content/sources/en-us/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier.sources';
import type { DirectSourceEntry, FurtherReadingEntry } from '../../content/sources/types';

const repoRoot = new URL('../../../../../', import.meta.url);
const privateDraftFrontmatterKeys = [
  'status',
  'source_draft',
  'promotion_targets',
  'register_routes',
  'distribution_channels',
] as const;

interface SourcePageCase {
  readonly name: string;
  readonly practitionerPath: string;
  readonly directSourceEntries: readonly DirectSourceEntry[];
  readonly furtherReadingEntries: readonly FurtherReadingEntry[];
}

interface PractitionerWaysCase {
  readonly name: string;
  readonly practitionerPath: string;
  readonly waysSidecarPath: string;
  readonly waysImport: string;
}

const sourcePageCases: readonly SourcePageCase[] = [
  {
    name: 'AI Is Not Magic',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier.mdx',
    directSourceEntries: aiDirectSourceEntries,
    furtherReadingEntries: aiFurtherReadingEntries,
  },
  {
    name: 'Integration Lag',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag.mdx',
    directSourceEntries: integrationLagDirectSourceEntries,
    furtherReadingEntries: integrationLagFurtherReadingEntries,
  },
  {
    name: 'A Path Through Integration Lag',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/a-path-through-integration-lag.mdx',
    directSourceEntries: pathDirectSourceEntries,
    furtherReadingEntries: pathFurtherReadingEntries,
  },
  {
    name: 'The Verification Tax',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/the-verification-tax.mdx',
    directSourceEntries: verificationTaxDirectSourceEntries,
    furtherReadingEntries: verificationTaxFurtherReadingEntries,
  },
] as const;

const practitionerWaysCases: readonly PractitionerWaysCase[] = [
  {
    name: 'AI Is Not Magic',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier.mdx',
    waysSidecarPath:
      'apps/site/src/content/docs/en-us/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier.ways.ts',
    waysImport: './ai-is-not-magic-it-is-a-cognitive-amplifier.ways',
  },
  {
    name: 'Integration Lag',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag.mdx',
    waysSidecarPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/integration-lag.ways.ts',
    waysImport: './integration-lag.ways',
  },
  {
    name: 'A Path Through Integration Lag',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/a-path-through-integration-lag.mdx',
    waysSidecarPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/a-path-through-integration-lag.ways.ts',
    waysImport: './a-path-through-integration-lag.ways',
  },
  {
    name: 'The Verification Tax',
    practitionerPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/the-verification-tax.mdx',
    waysSidecarPath:
      'apps/site/src/content/docs/en-us/signals/operational/work-delivery/the-verification-tax.ways.ts',
    waysImport: './the-verification-tax.ways',
  },
] as const;

const read = (relativePath: string) => readFileSync(new URL(relativePath, repoRoot), 'utf8');

const ids = (entries: readonly { readonly id: string }[]) => entries.map((entry) => entry.id);

const expectUnique = (values: readonly string[], label: string) => {
  expect(new Set(values).size, `${label} should be unique`).toBe(values.length);
};

const expectBoundedText = (value: string, label: string) => {
  const length = value.trim().length;
  expect(length, `${label} should not be empty`).toBeGreaterThan(20);
  expect(length, `${label} should stay reviewable`).toBeLessThan(500);
};

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

const extractFrontmatter = (content: string) => {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match?.[1] ?? '';
};

const frontmatterKeys = (frontmatter: string) =>
  frontmatter
    .split('\n')
    .map((line) => line.match(/^([A-Za-z0-9_-]+):/)?.[1])
    .filter((key): key is string => Boolean(key));

describe('public source contracts', () => {
  it.each(sourcePageCases)('$name keeps source entries page-local and bounded', ({
    directSourceEntries,
    furtherReadingEntries,
    name,
  }) => {
    const directIds = ids(directSourceEntries);
    const furtherReadingIds = ids(furtherReadingEntries);

    expectUnique(directIds, `${name} direct source ids`);
    expectUnique(furtherReadingIds, `${name} further reading ids`);

    const directIdSet = new Set(directIds);
    for (const id of furtherReadingIds) {
      expect(directIdSet.has(id), `${name} further reading id ${id} should be distinct`).toBe(
        false,
      );
    }

    for (const source of directSourceEntries) {
      expect(source.href, `${name} source ${source.id} should use public https`).toMatch(
        /^https:\/\//,
      );
      expectBoundedText(source.supports, `${name} source ${source.id} supports`);
      expectBoundedText(source.limits, `${name} source ${source.id} limits`);
    }

    for (const entry of furtherReadingEntries) {
      expect(entry.href, `${name} further reading ${entry.id} should use public https`).toMatch(
        /^https:\/\//,
      );
      expectBoundedText(entry.note, `${name} further reading ${entry.id} note`);
    }
  });

  it.each(sourcePageCases)('$name declares every inline SourceHook source id', ({
    directSourceEntries,
    practitionerPath,
    name,
  }) => {
    const content = read(practitionerPath);
    const usedIds = [...content.matchAll(/sourceId="([^"]+)"/g)].map((match) => match[1]);
    const declaredIds = new Set(ids(directSourceEntries));

    expect(usedIds.length, `${name} should use inline source hooks`).toBeGreaterThan(0);

    for (const id of usedIds) {
      expect(declaredIds.has(id), `${name} hook ${id} should be declared`).toBe(true);
    }

    for (const id of declaredIds) {
      expect(usedIds.includes(id), `${name} source ${id} should be used by an inline hook`).toBe(
        true,
      );
    }
  });

  it.each(sourcePageCases)('$name numbers footnotes in reading order', ({
    directSourceEntries,
    practitionerPath,
    name,
  }) => {
    const content = read(practitionerPath);
    const seen = new Set<string>();
    const firstCitationOrder: string[] = [];
    for (const match of content.matchAll(/sourceId="([^"]+)"/g)) {
      const id = match[1];
      if (!seen.has(id)) {
        seen.add(id);
        firstCitationOrder.push(id);
      }
    }

    expect(
      firstCitationOrder,
      `${name} declares sources in the order they are first cited so footnote numbers ascend in the text`,
    ).toEqual(ids(directSourceEntries));
  });

  it('keeps private drafting metadata out of public content frontmatter', () => {
    const contentFiles = collectFiles(new URL('apps/site/src/content/', repoRoot), ['.mdx', '.md']);
    const failures: string[] = [];

    for (const file of contentFiles) {
      const keys = frontmatterKeys(extractFrontmatter(readFileSync(file, 'utf8')));
      for (const forbiddenKey of privateDraftFrontmatterKeys) {
        if (keys.includes(forbiddenKey)) {
          failures.push(`${toRepoRelativePath(file)} includes private key ${forbiddenKey}`);
        }
      }
    }

    expect(failures, 'private public-content frontmatter keys found').toEqual([]);
  });

  it.each(
    practitionerWaysCases,
  )('$name keeps Ways into this signal in the shared AnchorMap card format', ({
    practitionerPath,
    name,
  }) => {
    const content = read(practitionerPath);

    expect(content, `${name} should render the shared entry-card map`).toContain('<AnchorMap');
    expect(content, `${name} should label the section consistently`).toContain(
      'title="Ways into this signal"',
    );
    expect(content, `${name} should not use the old entry table`).not.toContain(
      '| Entry | Register | Reader Question |',
    );
  });

  it.each(
    practitionerWaysCases,
  )('$name keeps page-owned entry data in a colocated .ways sidecar', ({
    practitionerPath,
    waysImport,
    waysSidecarPath,
    name,
  }) => {
    const content = read(practitionerPath);
    const hasLocalImport =
      content.includes(`from '${waysImport}'`) || content.includes(`from "${waysImport}"`);

    expect(hasLocalImport, `${name} should import its local .ways sidecar`).toBe(true);
    expect(
      existsSync(new URL(waysSidecarPath, repoRoot)),
      `${name} should keep its entry data beside the practitioner page`,
    ).toBe(true);
  });

  it('keeps operational entry-card helper data out of the content tree', () => {
    const accidentalContentDataRoot = new URL('apps/site/src/content/operational/', repoRoot);
    const accidentalContentFiles = collectFiles(accidentalContentDataRoot, ['.ts', '.md', '.mdx']);

    expect(
      accidentalContentFiles.map(toRepoRelativePath),
      'entry-card helper data belongs in page-colocated .ways sidecars, not a parallel src/content/operational tree',
    ).toEqual([]);
  });
});
