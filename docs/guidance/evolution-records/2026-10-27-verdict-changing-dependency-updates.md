# Verdict-changing dependency updates block grouped PRs

**Status:** applied
**Date:** 2026-10-27
**Trigger class:** required
**Scope:** tooling
**Origin trace:** operator asked whether the `dependency-management` skill was good enough compared to open-source skills, whether Astro was compatible in the open dependency PRs, and how to merge them
**Activation trace:** none
**Runtime propagation:** on-demand — `.cursor/skills/dependency-management/SKILL.md`, loaded when a dependency PR fails or needs a merge decision
**Related PR:** pending

## Why this record exists

A grouped Renovate PR failed CI. The failure looked like a framework compatibility question but came from a test tool update. The skill had no procedure for this case, and its version policy was two majors behind.

## What was observed

- The `npm non-major` group PR bundled 13 updates, including Astro 7.3 to 7.4 and `@axe-core/playwright` 4.13 to 4.14.
- Install, lint, unit tests, build, and `astro check` passed. Four axe E2E scans failed.
- axe-core 4.14.0 enabled `label-content-name-mismatch` (WCAG 2.5.3) by default. In 4.13.0 the rule carried the `experimental` tag and did not run.
- The rule found one real issue in the site-title register button. Its `aria-label` omitted the visible register label. It also flagged Starlight's search button, which is upstream.
- The skill's version policy named Astro 5.x, Vitest 4.x, and TypeScript 5.x while the repo ran 7.x, 5.x, and 6.x. Its override table named an esbuild pin that Renovate had already bumped.

## Missed assumptions

- That a failing group PR reflects its headline packages. One test tool update held back an unrelated framework patch.
- That an exact version written into a skill stays true. Renovate moves pins, including override values.

## Missed guidance

- No triage steps for a failing grouped PR.
- No compatibility check combining peer ranges with CI step results.
- No warning that test and lint tool updates can change the verdict without any code change.

## Structural gap

Live values copied into guidance drift. Group PRs hide which member failed. Both are the same class: guidance that describes state instead of pointing at the source of truth.

## Proposed evolution

- Triage group failures to one package, reproduce on a branch from `main`, fix with the bump included, and let Renovate rebase.
- Treat new findings from tool updates as real until checked. Scope exceptions to the element, not the rule.
- Record floors and reasons in guidance. Point to `package.json` and `pnpm-workspace.yaml` for live values.

## Runtime propagation

`on-demand`. The rule lives in the `dependency-management` skill, which loads when dependency PRs are reviewed. No always-loaded surface needs it.

## Research delta

axe-core 4.14.0 (2026-10-05) enables `label-content-name-mismatch` by default and compares visible text to the accessible name word by word.

## Propagation decision

Update operational surfaces now. The skill gained grouped-PR triage, a framework compatibility check, a current version policy, and a floor-based override table.

## Surfaces updated

- `.cursor/skills/dependency-management/SKILL.md`
- `docs/onboarding/ai-guidance.md`
- `apps/site/src/components/SiteTitle.astro`
- `apps/site/e2e/accessibility.spec.ts`

## Verification

- axe scans fail locally with only the axe bump and pass after the fix.
- The full E2E suite passes with axe-core 4.14.0.
- The guidance drift guard and license check pass.

## PR-visible learning trace

Required. A test tool update failed a grouped PR and looked like a framework break. The dependency skill now carries triage steps and points to live sources for versions.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
