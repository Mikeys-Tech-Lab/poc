# Title

**Status:** draft | applied | superseded
**Date:** YYYY-MM-DD
**Trigger class:** required | recommended
**Scope:** workspace | content | architecture | migration | tooling
**Origin trace:** prompt, handover, issue, or task artifact
**Activation trace:** none | command or lens that materially changed framing
**Runtime propagation:** enforced | on-demand | canon | archive-only — short note naming the surface and load trigger
**Related PR:** link | pending | none

## Why this record exists

Why this learning is worth preserving.

## What was observed

What the work exposed in concrete terms.

## Missed assumptions

What was assumed without being checked.

## Missed guidance

Which rule, skill, doc, or check was absent, stale, or not loaded.

## Structural gap

What class of failure this belongs to.

## Proposed evolution

What should change in future behavior.

## Runtime propagation

The cheapest effective layer where this lesson changes a future reasoning
runtime, or `archive-only`. Name the concrete surface and its load trigger. One
primary class, with an optional short note. Carry the smallest reusable rule to
that surface plus a pointer back to this record (pointer-not-payload).

## Research delta

What newer external development mattered here. Use `None.` if not applicable.

## Propagation decision

Choose one and explain why:

- update canon now
- update operational surfaces now
- open ADR path
- defer with named boundary
- no-op with reason

## Surfaces updated

List the docs, skills, rules, checks, or templates touched by this learning.

## Verification

How the new rule or guardrail will be checked.

## PR-visible learning trace

The bounded summary or link that should appear in the PR.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
