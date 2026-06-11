# Release Please Squash Merge Title Guardrail

**Status:** draft
**Date:** 2026-05-10
**Trigger class:** required
**Scope:** workspace | tooling
**Origin trace:** Operator asked why seed and preview did not deploy automatically after PR #191 merged. Investigation traced the break to the non-Conventional squash-merge title `Publish the first structural essay and harden route-scoped public boundaries (#191)`, then the operator directed that the incident receive a Trace Climb on a new branch and PR.
**Activation trace:** none
**Runtime propagation:** enforced — the pr-title-conventional workflow blocks non-conforming titles. No new propagation in this backfill.
**Related PR:** pending

## Why this record exists

The failed deploy was not caused by the deploy workflows themselves.

It exposed a contract gap between three layers that were documented separately
but not guarded together: squash merge on `main`, Release Please parsing the
`main` commit title, and seed or preview deployment triggering only from
`release.published`.

## What was observed

- `deploy-dev.yml` and `deploy-preview.yml` trigger from published releases, not
  from pushes to `main`.
- `release.yml` triggers on pushes to `main` and delegates release creation to
  Release Please.
- The merge commit that landed on `main` for PR #191 was `Publish the first
  structural essay and harden route-scoped public boundaries (#191)`, which is
  not a Conventional Commit title.
- Release Please therefore had no parseable release commit on `main`, so the
  release path that feeds seed and preview did not advance.
- Existing guidance correctly said "use Conventional Commits" but did not name
  the squash-merge title as the parsed unit or guard PR titles before merge.

## Missed assumptions

- We treated branch commits as sufficient evidence that Release Please would cut
  a release.
- We assumed a merged PR title could remain narrative while the branch commits
  stayed conventional.
- We treated the absence of deploy runs as a deploy problem before checking the
  release trigger contract.

## Missed guidance

The workspace documented Conventional Commits, Release Please, and squash merge
as separate facts, but it did not state the binding rule that the PR title must
be Conventional Commit-safe under squash merge.

No deterministic repo-side guard failed early when a PR title would produce an
unparseable commit on `main`.

## Structural gap

This failure belongs to a boundary class where automation parses a different
artifact than contributors think they are authoring.

The local branch honored commit discipline, but the release system consumed the
squash-merge title on `main`. Without a guard at that boundary, the repo could
satisfy local workflow expectations while silently breaking release and
deployment automation.

## Proposed evolution

Add a PR-time workflow that validates PR titles against the Conventional Commit
contract used by squash merge.

Add a release preflight check in `release.yml` so pushes to `main` fail loudly
when the landing title is unparseable.

Update canon, onboarding, PR template, and release setup guidance so
contributors and agents know that the PR title is part of the release contract,
not just presentation.

## Research delta

None.

## Propagation decision

update operational surfaces now

This incident already has a clear guardrail and a concrete propagation target.
It does not need an ADR because the repo already chose squash merge plus
Release Please. The missing layer was the binding contract between them.

## Surfaces updated

- `AGENTS.md`
- `.cursor/skills/github-automation/SKILL.md`
- `.github/workflows/pr-title-conventional.yml`
- `.github/workflows/release.yml`
- `.github/pull_request_template.md`
- `.github/copilot-instructions.md`
- `docs/guidance/README.md`
- `docs/onboarding/ai-guidance.md`
- `docs/onboarding/contributing.md`
- `docs/onboarding/infrastructure.md`
- `docs/infra/github-app-release-setup.md`
- `docs/architecture/workspace.md`

## Verification

- `pnpm lint`
- `pnpm guidance:check`
- local regex spot-checks for a valid title and the incident title
- PR CI should show the new title guard on future branches

## PR-visible learning trace

Trigger class: `required`.

The branch captures a release-contract gap exposed by PR #191. Release Please
parses the squash-merge title that lands on `main`, not the branch commit
history in isolation. This PR adds a deterministic PR-title guard, a release
preflight failure, and the guidance updates needed to keep seed and preview
auto-deploy tied to parseable release commits.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
