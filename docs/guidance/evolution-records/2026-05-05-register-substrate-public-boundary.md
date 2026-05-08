# Register Substrate Public Boundary

**Status:** draft
**Date:** 2026-05-05
**Trigger class:** required
**Scope:** architecture
**Origin trace:** Operator request to evolve the public reading-register system
from a binary model into a substrate for `everyday`, `orientation`, and
`practitioner`, followed by implementation review and `/trace-climb`.
**Activation trace:** `/trace-climb`
**Related PR:** pending

## Why this record exists

The branch introduced a real architecture layer: a reading-register registry,
route-level availability metadata, explicit unavailable states, and a
title-triggered register panel.

The ADR records the structural decision. This record preserves the process
lesson that emerged during close: future-facing architecture language must stay
public-safe. A branch can prepare for later navigation without importing
non-public planning details, local paths, or unreleased naming into public
documentation or PR text.

## What was observed

- The existing public register system encoded a two-register implementation as
  if it were the durable model.
- The first implementation slice correctly needed a register substrate before
  adding more public content.
- UI direction changed during implementation: the register control moved from an
  in-header selector, to a floating control, then back to a title-triggered
  panel below the header.
- The final title-panel model better matched the visible register indicator and
  avoided adding an accessibility preference only to recover from a control that
  no longer needed to float.
- Close-phase PR drafting exposed a wording risk: non-public planning boundaries
  can leak through "what this PR does not do" language even when the code itself
  is safe.

## Missed assumptions

- A future-navigation boundary could be described in public review text using
  the same shorthand used during private planning.
- A visible selector was enough of a UX correction without checking whether the
  control still felt attached to the title/register mental model.
- A control-specific accessibility hide/show preference was warranted before the
  control placement had settled.

## Missed guidance

Existing guidance already says public pages should lead with practice and avoid
repo-operation or internal mechanics.

What was missing was a close-phase habit for PR descriptions and ADRs: when a
branch prepares future architecture, scan the public wording for non-public
planning residue, local paths, local tool names, and unreleased naming.

## Structural gap

This is public-boundary drift during architecture preparation.

The failure mode is:

- non-public planning shorthand helps shape a safe implementation
- the implementation is translated into public repo artifacts
- non-goal or future-work language accidentally preserves non-public shorthand
- public readers see non-public planning terms instead of the stable public
  boundary

## Proposed evolution

- Use public-safe names for future work in ADRs and PR descriptions.
- Describe this branch as a reading-register substrate and title-panel UI
  change.
- Refer to later work as future navigation or future public content
  relationships unless a dedicated future ADR establishes sharper public terms.
- Before PR creation, scan the PR body and changed public docs for non-public
  planning residue, local paths, local tool names, and unreleased naming.

## Research delta

None.

## Propagation decision

Defer with named boundary.

The branch already updated the ADR and the site skill for the register substrate
and final title-panel control. The durable lesson does not require a canon
rewrite now. The boundary is: this PR may describe future navigation readiness,
but it must not name or expose non-public planning details or unreleased public
naming.

## Surfaces updated

- `docs/decisions/0008-public-reading-register-substrate.md`
- `.cursor/skills/astro-starlight/SKILL.md`
- `docs/guidance/evolution-records/2026-05-05-register-substrate-public-boundary.md`

## Verification

Verify with:

- `pnpm lint`
- `pnpm test`
- `pnpm run build`
- focused register and accessibility E2E tests when the register control changes
- a public-boundary wording scan before PR creation

The wording scan should check for non-public planning residue, local paths,
local tool names, and unreleased naming.

## PR-visible learning trace

Trace Climb classified this branch as required because it introduced a
register-substrate architecture layer and exposed a public-boundary lesson.

The ADR records the architecture decision. This Evolution Record captures the
close-phase guardrail: future-navigation readiness may be described publicly,
but non-public planning details, local paths, local tool names, and unreleased
naming must stay out of PR text and public repo documentation.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
