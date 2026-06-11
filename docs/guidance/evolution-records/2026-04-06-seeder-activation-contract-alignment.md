# Seeder Activation Contract Alignment

**Status:** applied
**Date:** 2026-04-06
**Trigger class:** required
**Scope:** workspace
**Origin trace:** Post-merge external analysis flagged that activation-facing
surfaces still pointed the Sensible Defaults seeder at GitHub `blob/` URLs
instead of a direct runtime-readable artifact URL
**Activation trace:** none
**Runtime propagation:** enforced — the guidance drift guard sensible-defaults-activation mapping pins the seeder contract. No new propagation in this backfill.
**Related PR:** pending

## Why this record exists

This branch did more than swap one URL string.

It clarified a durable boundary: activation surfaces that invite runtime loading
must use a direct readable artifact URL, while ordinary GitHub reading and
provenance links can remain human-facing.

## What was observed

The same seeder `blob/` URL was duplicated across:

- `README.md`
- `mandateLenses/SensibleDefaults/README.md`
- `apps/site/src/lib/activation-prompts.ts`
- public mandate-lens pages in both active content trees

The repo already had the rule that GitHub `blob/` views are not canonical
runtime surfaces. The activation-facing texts had drifted away from that rule.

## Missed assumptions

- A human-readable GitHub file view was good enough for runtime activation
- The seeder contract was already inspectable enough because the path itself was
  correct
- Existing drift checks would catch this kind of contract mismatch

## Missed guidance

`continuity/canonical-readability-requirement.md` already said canonical runtime
loading must use direct raw artifact URLs or an equivalent direct surface.

That rule was not yet propagated into the highest-signal activation surfaces or
into deterministic validation.

## Structural gap

The workspace had the readability rule, but not a bounded contract separating:

- runtime-entry activation links
- human-reading or provenance links

Without that distinction, activation surfaces could silently drift back toward
repository UI URLs.

## Proposed evolution

- use the raw seeder URL on activation-facing surfaces
- keep ordinary GitHub reading links where the surface is acting as citation or
  provenance
- guard the highest-signal activation surfaces with a narrow deterministic check

## Research delta

None.

## Propagation decision

Choose:

- update canon now
- update operational surfaces now

This branch updated the rule where people actually activate the seeder and added
a bounded tooling contract so the same mismatch is harder to reintroduce.

## Surfaces updated

- `README.md`
- `mandateLenses/SensibleDefaults/README.md`
- `apps/site/src/lib/activation-prompts.ts`
- `apps/site/src/content/docs/en-us/core-system/mandate-lenses/index.mdx`
- `apps/site/src/content/docs/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx`
- `apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/index.mdx`
- `apps/site/src/content/register/orientation/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load.mdx`
- `tools/ai-guidance/src/infra/guidance-check.ts`
- `tools/ai-guidance/src/domain/guidance-drift-guard.ts`
- `tools/ai-guidance/src/__tests__/guidance-drift-guard.test.ts`

## Verification

Verified with:

- `pnpm guidance:check`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm --filter site check`

## PR-visible learning trace

This branch separates runtime-entry seeder URLs from ordinary GitHub reading
links and guards the highest-signal activation surfaces against drift back to
`blob/` views.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
