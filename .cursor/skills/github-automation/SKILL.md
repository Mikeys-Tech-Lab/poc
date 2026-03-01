---
name: github-automation
description: Guides GitHub workflow automation using gh CLI for this workspace. Use when creating branches, opening PRs, managing issues, or running release workflows. Enforces GitHub Flow, Conventional Commits, and atomic commit discipline.
---

# GitHub Automation

## When to use

- Creating feature branches or opening pull requests
- Managing issues or releases via `gh`
- Reviewing or merging PRs
- Running any GitHub-related workflow

## Capability alignment

Before relying on any `gh` subcommand or flag:

1. Run `gh --version` to confirm installed version.
2. Run `gh <subcommand> --help` to verify flags.
3. If not checkable, produce a manual checklist and mark the result unknown.

## GitHub Flow

1. Branch from `main`: `git checkout -b <type>/<scope>/<short-description>`
2. Make atomic commits using Conventional Commits.
3. Push and open PR: `gh pr create --title "<type>(<scope>): <subject>" --body-file -`
4. Squash merge to `main`.

## Conventional Commits

Format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

Scopes: `seedpack`, `ai`, `tooling`, `docs`, `astro`

Each commit does one thing. If explaining two unrelated changes, split them.

## PR expectations

PRs include:

- Summary of the change
- Trace: assumptions, limits, what was not checked
- Test plan: what was verified, what was not
- Checkbox: updated `docs/architecture/workspace.md` if structure changed

## Common commands

```bash
gh pr create --title "feat(ai): add grounding rules" --body-file -
gh pr list
gh pr view <number>
gh pr merge <number> --squash
gh issue create --title "..." --body "..."
gh release create v<version> --notes "..."
```

## Safety

- Do not force push to `main`.
- Do not skip hooks (`--no-verify`) unless explicitly requested.
- Do not amend commits that have been pushed to remote.
