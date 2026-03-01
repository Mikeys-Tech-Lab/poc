---
name: github-automation
description: Guides GitHub workflow automation using gh CLI for this workspace. Use when creating branches, opening PRs, managing issues, or running release workflows. Enforces GitHub Flow, Conventional Commits, and context-traced PRs.
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
2. Make atomic commits using Conventional Commits (see `git-commit` skill).
3. Push and open PR: `gh pr create --title "<type>(<scope>): <subject>" --body-file -`
4. Squash merge to `main`.

## Conventional Commits

Format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

Scopes: `seedpack`, `ai`, `tooling`, `docs`, `astro`

Each commit does one thing. If explaining two unrelated changes, split them.

For full commit discipline, see the `git-commit` skill.

## PR as reasoning trace

Every PR description is a reasoning trace, not just a changelog. Someone reading the PR should understand how the work evolved, what decisions were made, what went wrong, and what was learned.

### Required PR sections

1. **Summary**: what the PR adds or changes (bullet list)
2. **Context**: how the work evolved from its starting point
   - What prompted this work
   - Key decisions and why they were made
   - What changed from the original plan during implementation
   - Mistakes made and corrections applied
   - What was not verified (honest gaps)
3. **Trace**: assumptions, limits, and what was not checked
4. **Test plan**: what was verified, what was not
5. **Checklist**: conventional commits, workspace.md updated, build passes, context included

### Why this matters

- A diff shows what changed. Context shows why.
- Future contributors (including agents) can reconstruct intent from the PR description.
- Mistakes documented in PRs become institutional knowledge.
- This is the Practice of Clarity applied to the development process itself.

### Context section guidance

- Be specific about decisions: "renamed apps/docs to apps/site because..." not "made some changes"
- Include mistakes: if something broke and was fixed, say so and link to the fixing commit
- State what was not verified: this is honesty, not weakness
- Keep it concise but complete: a reader should understand the full journey in 2-3 minutes

## Common commands

```bash
gh pr create --title "feat(ai): add grounding rules" --body-file pr-body.md
gh pr edit <number> --body-file pr-body.md
gh pr list
gh pr view <number>
gh pr merge <number> --squash
gh issue create --title "..." --body "..."
gh release create v<version> --notes "..."
```

Tip: write the PR body to a temp file first, then use `--body-file`. This avoids shell escaping issues with complex markdown.

## Safety

- Do not force push to `main`.
- Do not skip hooks (`--no-verify`) unless explicitly requested.
- Do not amend commits that have been pushed to remote.
