# Register Fallback Notice: Absence vs Invalid Input

**Status:** applied
**Date:** 2026-06-11
**Trigger class:** required
**Scope:** architecture | guidance
**Origin trace:** operator reported a live-site bug: opening the site in a fresh Chrome or DuckDuckGo session showed an "Unknown register requested. Showing the default register." notice
**Activation trace:** none
**Related PR:** #240 (fix shipped); this record pending its own PR

## Why this record exists

The register resolver shipped a user-visible defect to the live site. A
first-time visitor with no register preference saw a fallback notice that should
only appear on a real mismatch. The fix was small, but the underlying class of
mistake is general and the existing parity guardrail did not catch it. That
combination — a shipped defect plus a guardrail that looked sufficient but was
not — is durable learning worth preserving.

This record is the bug-class companion to
`2026-06-10-content-register-source-workflow-boundary.md`. That record covers the
content and source-workflow boundary. This one covers the client-side register
state resolution and its duplicated-logic guardrail.

## What was observed

On the deployed site, an incognito visit to `/en-us/` rendered the notice
"Unknown register requested. Showing the default register." for a reader who had
not requested any register.

The cause was in `resolveRegister` (canonical in
`apps/site/src/lib/register-registry.js`, mirrored in the inlined bootstrap of
`apps/site/src/components/ThemeProvider.astro`). The final fallback branch
computed:

```js
const reason = requested ? 'unavailable' : 'unknown';
```

`requested` is null both when no value was provided and when an invalid value
was provided, because `isReadingRegister(value)` is false for both. So a fresh
visitor (no `?register=` param, no stored `poc-register`) fell into the same
branch as `?register=banana` and received the visible `unknown` notice. The
notice renders whenever `registerFallbackMessage` is set, so every first-time
visitor saw it.

## Missed assumptions

- That "no register requested" and "an invalid register requested" were the same
  state. They are not. Absence of a preference is the normal default path and
  must be silent. An actually provided invalid value is a real mismatch and may
  warn.
- That the existing tests covered the default path. The resolver tests asserted
  the visible `unknown` case for the string `'unknown'` but never asserted that
  `null`, `false`, or `''` resolve silently. The most common real input was
  untested.
- That extracting and running the inline bootstrap in a test implied behavioral
  parity. The bootstrap test ran the script for one stored-everyday scenario, not
  for the no-request scenario, so the duplicated logic drifted from intent in
  both copies at once.

## Missed guidance

No rule, skill, or check stated that fallback or notice logic must distinguish
absence of input from invalid input. The duplication between the inline bootstrap
and the shared module is documented as a drift risk (the "update both locations"
comment and `theme-provider-bootstrap.test.ts`), but the parity guardrail only
pinned a subset of branches, so it did not protect the default path.

## Structural gap

This is a fallback-classification failure: collapsing "unset" and "invalid" into
one error state. It is reinforced by a parity-coverage gap: when the same
resolution logic lives in two places, partial test coverage can pass while both
copies share the same defect.

## Proposed evolution

1. In any fallback or notice resolver, treat absence of input as the silent
   default. Reserve a visible notice for an actually provided value that does not
   match an available option.
2. When logic is intentionally duplicated between an inline bootstrap and a
   shared module, the parity test should exercise the same input matrix through
   both, including the empty/absent case, not just one representative scenario.

## Research delta

None.

## Propagation decision

Update operational surfaces now.

- The behavioral fix and its regression tests already shipped in PR #240.
- This record documents the generalizable principle and the parity-coverage gap
  so the lesson is findable beyond the single fix.
- A stronger parity test (same input matrix through bootstrap and module) is
  deferred with a named boundary: it is a guardrail improvement, not a
  correctness fix, and should land as its own scoped change rather than expand
  this reflection.

## Surfaces updated

- `apps/site/src/lib/register-registry.js` — resolver distinguishes absence from
  invalid (shipped in #240).
- `apps/site/src/components/ThemeProvider.astro` — inlined bootstrap mirrors the
  same distinction (shipped in #240).
- `apps/site/src/lib/__tests__/register.test.ts` — added silent-default cases for
  `null`, `false`, and `''` (shipped in #240).
- `apps/site/src/lib/__tests__/theme-provider-bootstrap.test.ts` — added a
  fresh-visitor case asserting no fallback metadata (shipped in #240).
- This Evolution Record — documents the bug class and the deferred parity-test
  boundary.

## Verification

- `pnpm --filter site test -- register theme-provider-bootstrap` exercises the
  silent-default and still-visible invalid cases.
- `pnpm license:check` and `pnpm lint` cover this record as a markdown source
  surface.

## PR-visible learning trace

Fallback logic must separate "no input" from "invalid input." A fresh visitor
with no register preference now resolves to the silent default; only an actually
provided invalid register warns. Regression tests pin both paths. A broader
bootstrap-vs-module parity test is deferred as a named guardrail improvement.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
