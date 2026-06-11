---
name: public-content-intake
description: Intakes promoted public-bound PoC site content. Use when moving drafted or handoff content into apps/site/src/content/**, adding register variants, promoting source-heavy practitioner pages, or checking public content for private drafting metadata, route/register shape, source hooks, license notices, and local publication readiness.
---

# Public Content Intake

Use this skill when promoted or drafted content is entering the public PoC site.

The detailed boundary lives in
`docs/guidance/content-register-source-workflow.md`. This skill operationalizes
that boundary.

## Intake Order

1. Identify the target public route, locale, and register surfaces.
2. When editing an existing public page, compare against `main` for visible
   render surfaces before and after the rewrite: examples, callout boxes,
   activation prompts, imports, and reader actions.
3. Strip private drafting or handoff metadata before writing public content.
4. Verify public frontmatter against `apps/site/src/content.config.ts`.
5. Verify route/register availability in `apps/site/src/lib/route-map.js`.
6. Keep practitioner, orientation, and everyday roles distinct.
7. Keep repeated practitioner entry maps in colocated `*.ways.ts` sidecars.
8. For source-heavy practitioner pages, use `SourceHook` and `SourceLedger`.
9. Keep orientation and everyday pages lightweight unless a claim needs a source.
10. Run deterministic checks before browser or live-source review.

## Public Metadata Boundary

Drafting and handoff sources may carry workflow state such as `status:
published`, promotion targets, register routes, or distribution channels.

Public PoC content under `apps/site/src/content/**` must not carry private
workflow metadata unless the public schema intentionally changes.

Watch for keys such as:

- `status`
- `source_draft`
- `promotion_targets`
- `register_routes`
- `distribution_channels`

## Source Boundary

Source-heavy practitioner pages use inline source hooks and one ledger.

Source data belongs in locale-owned, page-scoped modules:

```text
apps/site/src/content/sources/<locale>/<content-path>/<page>.sources.ts
```

Do not create a central source registry. Do not use English source modules as
silent fallback for future locales.

Declare `directSourceEntries` in first-citation order. The footnote number is
the source's array position, so a declaration order that does not match the
reading order makes footnotes jump in the text. When adding an inline source
hook, insert its entry at the matching position, not at the end. This breaks
most easily when sources are migrated out of a Markdown table.

Any practitioner page that renders "Ways into this signal" should keep that
page-owned editorial map in a colocated `*.ways.ts` sidecar next to the
practitioner page. Do not move it into a parallel
`apps/site/src/content/operational/**` tree or a generic `src/lib/**` drawer.

## Verification Routing

Deterministic checks protect structure:

- `pnpm license:check`
- `pnpm lint`
- route/register tests
- register-boundary tests
- source-contract tests
- `pnpm build`
- `pnpm --filter site check`

Live source reachability and browser behavior are publication checks, not unit
test claims.

Before calling content publishable, run a local preview or dev server and name
which mode was used. Inspect source-hook to source-ledger links, ledger back
links, and register switching for the changed pages.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/public-content-intake/SKILL.md
