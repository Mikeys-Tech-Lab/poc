# Renovate App Setup

This repo uses Renovate as the primary dependency update engine. This document captures the operator setup that lives outside the repo.

## Why the app model

The GitHub App model keeps dependency automation attributable to a bot account and avoids storing a Personal Access Token in repo secrets.

It also gives Renovate the control surface this repo now expects:

- Dependency Dashboard visibility
- grouped non-major updates
- major-update approval flow
- automatic coverage for current and future workspace packages

## Required GitHub features

In the repository settings, verify:

1. Dependency graph is enabled.
2. Dependabot alerts are enabled.
3. Auto-merge is enabled for pull requests.

The first two keep GitHub's vulnerability surface available. The third allows Renovate's low-risk automerge policy to work after CI passes.

## Install the Renovate GitHub App

1. Install the Renovate GitHub App for the organization or user that owns the repository.
2. Grant the app access to this repository.
3. Verify the app can open pull requests and read repository metadata.
4. If vulnerability-fix PRs will later be delegated to Renovate, verify the app also has read access to Dependabot alerts.

## Verify the repo-side contract

After the app is installed:

1. Confirm `renovate.json` is present at the repo root.
2. Confirm `.github/dependabot.yml` no longer drives routine version updates.
3. Wait for Renovate onboarding or the first scheduled run.
4. Check that a Dependency Dashboard issue appears.
5. Check that major updates wait in the dashboard instead of flooding the open PR list.
6. Check that grouped non-major PRs are labeled `dependencies` and arrive in a bounded batch.

## What this runbook does not do

This doc does not duplicate Renovate's product documentation or act as a substitute for the app's own onboarding flow. It only records the repo contract this workspace expects.

## References

- `renovate.json`
- `.github/dependabot.yml`
- `docs/guidance/dependency-update-operations.md`
- `docs/decisions/0004-renovate-primary-dependency-engine.md`

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
