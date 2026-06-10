# Content Register Source Workflow

This guidance describes how promoted public-bound content enters the PoC site
without carrying private drafting state, register drift, or weak source shape.

It is a guidance surface, not a gate. The deterministic checks protect structure.
Human and source review still own meaning.

## Boundary Model

Public content lives under `apps/site/src/content/**`.

Drafting and handoff state belongs outside that tree. A handoff source may say
`status: published`, name promotion targets, or carry distribution notes. The
PoC public content tree must not copy that metadata unless the public content
schema intentionally changes.

Public PoC content should be:

- source-clean
- route-clean
- license-clean
- register-clean

That means the page is placed in the right collection, exposes only public
frontmatter, has a valid license notice, appears in the route/register model
when needed, and uses the right source presentation for its register.

## Register Shape

Practitioner pages carry the most trace. They may include detailed evidence,
limits, source hooks, source ledgers, and implementation-facing specificity.
When a practitioner signal includes a repeated "Ways into this signal" entry
surface, use the shared `AnchorMap` card format rather than a raw Markdown
table. This keeps entry points visually consistent across signal families.

Orientation pages bridge the concept step by step. They should not inherit
practitioner source density unless a factual claim would become unsafe without
the citation.

Everyday pages start from recognizable situations. They should stay light,
plain, and usable. Do not turn everyday register pages into citation tables.

Missing register variants are explicit states. Do not scaffold empty placeholder
pages just to satisfy a shape.

## Source Shape

Source-heavy practitioner pages use inline `SourceHook` references and one
`SourceLedger`, not raw Markdown source tables.

Source data lives in locale-owned, page-scoped modules:

```text
apps/site/src/content/sources/<locale>/<content-path>/<page>.sources.ts
```

The source module is a public evidence surface for that locale. It is not an
English-owned appendix.

Future locale source modules are peer editions. If a locale reuses an
English-language source, make that reuse explicit in the locale module. If a
locale substitutes a culturally, legally, or institutionally local source, that
is legitimate and traceable.

Source IDs are unique within a page module. Do not create a central source
registry unless a real retrieval or publishing need appears.

## Contract Surfaces

Use the repo's lightweight schema layer:

- `apps/site/src/content.config.ts` defines public content frontmatter shape.
- `apps/site/src/lib/route-map.js` defines route and register availability.
- `apps/site/src/content/sources/types.ts` defines shared source entry shape.
- `apps/site/src/lib/__tests__/route-map.test.ts` checks route/register integrity.
- `apps/site/src/lib/__tests__/register-boundaries.test.ts` protects named register boundaries.
- `apps/site/src/lib/__tests__/source-contract.test.ts` checks source module structure and hook declarations.
- The same source contract test may protect repeated presentation boundaries
  such as the `AnchorMap` entry-card format when a promoted signal family has an
  established pattern.
- `pnpm license:check` checks markdown-like source license surfaces.

Do not add JSON schemas only to formalize internal TypeScript data. Add a JSON
schema only if an external consumer needs one.

## Verification Boundary

Deterministic tests may check:

- unique direct source IDs within a page module
- further reading IDs distinct from direct source IDs
- public `https://` href shape
- non-empty bounded `supports`, `limits`, and `note` fields
- every inline `SourceHook` `sourceId` is declared
- private drafting metadata is absent from public content frontmatter
- repeated entry-point sections use the established shared component format
  instead of drifting back to ad hoc tables

Deterministic tests must not claim:

- a source proves an article
- an article is publishable
- source interpretation is correct
- live URLs are always reachable

Live source reachability is a publication verification step. Browser inspection
is also required for source-hook loops and register switching because those are
reader-facing behaviors, not only data contracts.

## Intake Checklist

For promoted public-bound content:

1. Identify the public route, locale, and register surfaces.
2. Remove private drafting or handoff metadata before writing public content.
3. Verify the route/register model and sidebar entry if the page is public.
4. Keep orientation and everyday pages lightweight unless a claim needs a source.
5. Put practitioner source-heavy claims behind inline source hooks and a ledger.
6. Run deterministic checks first.
7. Then verify source reachability and local browser behavior.
8. Only call the branch publishable after both structural checks and reader-facing
   inspection pass.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
