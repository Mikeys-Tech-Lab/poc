# Content Register Source Workflow Boundary

**Status:** applied
**Date:** 2026-06-10
**Trigger class:** required
**Scope:** content | migration | guidance
**Origin trace:** operator request to make the locally promoted Integration Lag register triad publishable, then refine and execute the Source Register Alignment plan
**Activation trace:** Trace Climb requested by the operator because the work exposed a missing promotion workflow boundary
**Runtime propagation:** enforced — source contract tests pin source integrity, with content-register-source-workflow guidance and the public-content-intake skill on-demand. No new propagation in this backfill.
**Related PR:** pending

## Why this record exists

This record is required because the work exposed a repeated promotion workflow
gap. Source/register boundaries were not explicit enough during publication
readiness, so the agent had to rediscover where source data should live, which
registers should carry source-heavy structure, and which checks are deterministic
versus live review.

The trigger class is `required` under Trace Climb because this is both a guidance
gap and repeated friction with a shared pattern. It is not required because every
content migration needs an Evolution Record.

## What was observed

The Integration Lag triad had public content moving into the site before the
source presentation model was fully aligned.

The existing AI structural article already used strong `SourceHook` and
`SourceLedger` behavior. The new practitioner operational pages initially used
Markdown source tables, which made the evidence interface weaker and less
consistent.

The source data also lived under `apps/site/src/content/structural/`, which made
structural essay ownership look like the general home for public source entries.
That was not the right long-term model for operational pages or future locales.

The public content tree also needed a more explicit boundary against private
drafting metadata such as `status`, `source_draft`, `promotion_targets`,
`register_routes`, and `distribution_channels`.

After the first PR draft, review found another boundary miss: the Integration
Lag practitioner pages used Markdown tables for "Ways into this signal" while
the AI signal used the shared `AnchorMap` card format. That made the entry
surface inconsistent even after the source ledger work was aligned.

The PR then failed remote CI because the local verification gate had not run
`pnpm --filter site check`. `pnpm build` and Vitest passed, but `astro check`
caught bad type-only import paths in the new source modules.

The operator then named a broader Trace Climb gap: reasoning-time corrections
must evolve the agent operating architecture, not merely appear as runtime
narration in the PR.

The operator also caught that the entry-card data had been placed under
`apps/site/src/content/operational/**`, creating a misleading parallel content
authority beside the real practitioner pages under
`apps/site/src/content/docs/en-us/signals/operational/**`.

While reading the published Integration Lag article, the operator then noticed
the footnotes ran out of order in the body text. The footnote number is derived
from a source's position in the `directSourceEntries` array, and the three
operational pages had been declared in their old Markdown-table order, not the
order the sources were cited. So the inline numbers jumped, for example 1, 2, 4,
5, 3, 6. The original structural AI article was unaffected because it was
authored in citation order from the start.

A later reading pass found a different regression: existing public pages on
`main` had component-backed examples, activation prompts, and public-node
callout boxes that had been flattened or removed during the rewrite. The new
branch preserved many headings and added stronger source architecture, but some
reader affordances disappeared because the migration compared prose intent
rather than rendered surfaces.

## Missed assumptions

The work initially assumed that publication readiness was mostly a page, route,
and build problem.

That was incomplete. Publication readiness also needed source UX parity,
register-specific source density, public metadata hygiene, source reachability,
and local reader-facing inspection.

Another missed assumption was that shared source types could remain under
structural ownership. The migration showed that only reusable source-entry types
should move to shared ownership. Structural-only anchor types should remain with
the structural article model.

The follow-up review also showed that source parity was not enough. Repeated
reader-entry surfaces need the same presentation contract as source-heavy
evidence surfaces whenever practitioner pages expose that same "Ways into this
signal" surface.

Another missed assumption was that a passing build meant the new TypeScript
content modules were type-clean. Type-only imports can be erased during build and
still fail Astro's explicit type check.

The final missed assumption was that writing the Evolution Record and PR trace
was enough after each correction. That preserved the story but did not fully
evolve the skill path that future agents would load before making the same
mistake.

Another missed assumption was that any page-supporting data should either stay
somewhere under `src/content` or move into `src/lib`. The better boundary is
narrower: rendered public pages and their page-owned editorial sidecars stay
together, source ledger data lives in `src/content/sources`, and shared
reusable behavior stays in `src/lib`.

Another missed assumption was that preserving the conceptual content was enough
when rewriting existing public pages. That is incomplete. Component-backed
examples, activation prompts, and callout boxes are part of the reader-facing
article, not decoration. They must be compared against the current public branch
before a rewrite is called publishable.

## Missed guidance

The repo had good local examples and tests for the first structural essay, but
it did not have a named content-intake workflow for promoted public content.

The missing guidance was:

- how practitioner, orientation, and everyday registers differ in source density
- where page source modules belong
- which drafting metadata must not enter public content
- which source checks belong in Vitest
- which source checks must remain live publication verification
- when source-heavy pages should use `SourceHook` and `SourceLedger`
- when repeated "Ways into this signal" sections should use shared entry-card
  components instead of ad hoc Markdown tables
- that PR close for site content/module changes must run the site type check,
  not only lint, tests, and build
- that Trace Climb itself must capture reasoning-time evolution and propagate it
  into the runtime skill or check that should guide the next agent
- that non-content helper data must not create parallel authority trees under
  `apps/site/src/content/**`
- that `directSourceEntries` must be declared in first-citation order, because
  the footnote number is the array position and migration from a Markdown table
  silently carries the wrong order
- that existing public pages need branch-to-`main` comparison for visible render
  surfaces, not only prose headings and route shape

## Structural gap

This was a boundary gap between drafting/handoff surfaces and public content
surfaces.

The underlying pattern is content promotion without a named intake protocol.
When that protocol is missing, source data location, register shape, metadata,
route registration, and verification all become local rediscovery tasks.

## Proposed evolution

Name the target source ownership model as locale-owned and page-scoped.

Implement only the source modules needed by current pages. Do not scaffold future
locales or empty source directories.

Use TypeScript source modules and Vitest contracts as the lightweight schema
layer. Avoid JSON schemas until a real external consumer appears.

Keep practitioner source-heavy claims behind inline `SourceHook` references and
one `SourceLedger`. Keep orientation and everyday registers lightweight unless a
claim would be unsafe without a citation.

Use the shared `AnchorMap` card format for repeated practitioner signal entry
points when the page provides "Ways into this signal" links.

Separate deterministic source contracts from live source reachability and local
browser inspection.

Include `pnpm --filter site check` in the site-content PR close gate so local
verification matches the CI job that runs `astro check`.

Make reasoning-time evolution a first-class Trace Climb input. When an operator
correction, failed check, or implementation surprise reveals an incomplete agent
contract, update the skill or guidance surface that future agents will load
before the same decision point.

Keep repeated entry-card maps in page-colocated `*.ways.ts` sidecars next to
their practitioner pages. Do not create parallel pseudo-authority trees such as
`apps/site/src/content/operational/**`, and do not scatter page-owned editorial
maps into generic `src/lib` drawers.

Declare `directSourceEntries` in first-citation order so footnote numbers ascend
as the reader moves down the page. Name this convention in the workflow guidance
and the intake skill, and enforce it with a deterministic test, because the
failure mode is invisible at authoring time and arrives silently through Markdown
table migration.

When rewriting an existing public page, compare the branch against `main` for
reader-facing render surfaces: examples, callout boxes, activation prompts,
imports, and links that create actions. Protect high-risk surfaces with
deterministic snippets in `register-boundaries.test.ts` when they define the
article's usable shape.

## Research delta

None.

## Propagation decision

Update operational surfaces now.

The durable lesson belongs in a guidance document, a project skill, and
deterministic source contract tests. It does not require changing `AGENTS.md`,
GitHub automation guidance, or an ADR because the source architecture is
currently a scoped content ownership model, not a repo-wide structural decision.

## Surfaces updated

- `apps/site/src/content/sources/types.ts`
- `apps/site/src/content/sources/en-us/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier.sources.ts`
- `apps/site/src/content/sources/en-us/signals/operational/work-delivery/*.sources.ts` (reordered to first-citation order)
- `apps/site/src/content/docs/en-us/signals/operational/work-delivery/*.ways.ts`
- `apps/site/src/content/docs/en-us/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier.ways.ts`
- `apps/site/src/content/register/orientation/en-us/signals/operational/work-delivery/*.mdx`
- `apps/site/src/components/AnchorMap.astro`
- `apps/site/src/components/AnchorCard.astro`
- `apps/site/src/components/anchor-map-types.ts`
- `apps/site/src/lib/__tests__/source-contract.test.ts`
- `docs/guidance/content-register-source-workflow.md`
- `docs/guidance/README.md`
- `docs/guidance/testing-strategy.md`
- `.cursor/skills/public-content-intake/SKILL.md`
- `.cursor/skills/astro-starlight/SKILL.md`
- `.cursor/skills/git-commit/SKILL.md`
- `.cursor/skills/github-automation/SKILL.md`
- `docs/guidance/agent-pre-commit-verification.md`
- `.cursor/skills/trace-climb/SKILL.md`
- `docs/guidance/trace-climb.md`
- `docs/guidance/structural-reflection-and-evolution.md`

## Verification

The new contract is checked through deterministic tests for:

- unique direct source IDs
- unique and distinct further reading IDs
- public `https://` source hrefs
- bounded `supports`, `limits`, and `note` fields
- declared and used inline `SourceHook` source IDs
- absence of private drafting metadata from public content frontmatter
- use of the shared `AnchorMap` format for repeated Integration Lag entry
  points and any other practitioner page with "Ways into this signal", with the
  old Markdown entry table blocked
- local `*.ways.ts` sidecar imports for practitioner entry maps where that
  surface exists
- footnote numbering reads in order: first-citation order of inline `sourceId`s
  matches declared `directSourceEntries` order on every source-hooked page
- existing Integration Lag examples, activation prompts, and public-node boxes
  remain visible through `register-boundaries.test.ts`
- explicit site type checking through `pnpm --filter site check` for site
  content/module changes before PR readiness
- reasoning-time corrections are captured in Trace Climb and propagated to the
  operational guidance surface that should change future agent behavior
- the source contract test rejects accidental helper files under
  `apps/site/src/content/operational/**`

Publication readiness still requires live source URL reachability and local
browser inspection of source hook loops and register switching.

## PR-visible learning trace

The Integration Lag promotion exposed a reusable publication boundary: public
content intake must preserve register shape, keep source-heavy evidence in
page-scoped locale source modules, exclude private drafting metadata, and split
deterministic source contracts from live source reachability. Follow-up review
also added the repeated entry-point presentation contract after the old Markdown
table format diverged from the AI signal's `AnchorMap` cards. Remote CI then
exposed a local verification gap: the PR close gate must include
`pnpm --filter site check` for site module changes, because build can miss
type-only import errors. The final reflection extended the Trace Climb contract
itself: reasoning-time corrections must evolve the agent operating architecture,
not only narrate what happened. A later correction rejected both a mistaken
`src/content/operational` tree and an over-generic `src/lib` placement, landing
instead on page-colocated `*.ways.ts` sidecars beside practitioner pages that
actually render "Ways into this signal", including the earlier structural AI
signal. That preserves a single content authority while keeping page-owned
editorial maps close to the page they shape. A final reading-time catch found
footnotes numbering out of order on the migrated operational pages, because
declaration order had drifted from citation order. The fix reordered the three
source modules to first-citation order, named the convention in the workflow
guidance and intake skill, and added a deterministic test so the next runtime is
guided before authoring rather than corrected after. Another reading pass found
that the rewrite had flattened or removed component-backed examples, activation
prompts, and public-node boxes from existing pages. Those affordances were
restored and protected with register-boundary snippets, and the intake workflow
now requires branch-to-`main` comparison for visible reader surfaces before
publishability. This branch updates the source architecture, adds a
`public-content-intake` skill, documents the workflow, and captures the learning
here.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
