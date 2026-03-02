---
name: github-automation
description: Guides the full feature lifecycle for this workspace — from branch creation through work, reflection, version bump, and PR. Use at the start of any non-trivial work and before every PR. Enforces GitHub Flow, Conventional Commits, and context-traced PRs.
---

# GitHub Automation

Adaptation of `AGENTS.md` for GitHub workflow execution.

## When to use

- Starting any non-trivial work (new feature, fix, refactor)
- Committing and pushing changes
- Opening or updating pull requests
- Managing issues or releases via `gh`

## Capability alignment

Before relying on any `gh` subcommand or flag:

1. Run `gh --version` to confirm installed version.
2. Run `gh <subcommand> --help` to verify flags.
3. If not checkable, produce a manual checklist and mark the result unknown.

## Feature lifecycle

Every piece of work follows three phases: **Start**, **Work**, **Close**. Do not skip phases. If the operator asks to "just commit" or "just push", still check which phase you are in and what steps remain.

### Phase 1: Start

Before making any commits:

1. **Check branch**: run `git branch --show-current`. If on `main`, create a feature branch.
2. **Branch naming**: `<type>/<scope>/<short-description>` (e.g., `feat/astro/add-catppuccin-theme`).
3. **Confirm scope**: understand what the work will change. If the scope is unclear, ask before starting.

```bash
git checkout -b feat/astro/add-catppuccin-theme
```

If you are resuming work on an existing branch, verify it is up to date with `main`:

```bash
git fetch origin
git log --oneline main..HEAD   # understand what is already on the branch
```

### Phase 2: Work

During implementation:

1. **Atomic commits**: each commit does one thing (see `git-commit` skill).
2. **Push periodically**: do not accumulate unpushed work. Push after each logical commit or small group.
3. **PR upkeep**: if a PR already exists for this branch, update its description after every push (see PR description upkeep below).

### Phase 3: Close

When the work is functionally complete, do not immediately create the PR. First:

#### 3a. Reflect

Audit the branch for issues the work introduced or exposed:

- **Build warnings**: run `pnpm run build` and check for zero warnings.
- **Dead code**: search for unused exports, unreferenced files, or orphaned config.
- **Broken or missing links**: check all content pages for unlinked repo references, wrong URLs, or stale paths.
- **Skill and doc drift**: does the work introduce patterns, conventions, or constraints not yet documented in skills, rules, or `AGENTS.md`?
- **Consistency**: are naming conventions, URL patterns, and file organization consistent with the rest of the repo?

Present findings to the operator. Be specific: "I found X, Y, Z. Here is what I recommend fixing."

#### 3b. Cleanup

Fix the issues found during reflection. Each fix is its own atomic commit.

#### 3c. Version bump

Check whether a version bump is needed (see version policy below). If yes:

- Bump the version in the relevant `package.json`.
- Commit: `chore(<scope>): bump <package> version to <version>`
- This is always a separate commit, never bundled with feature work.

#### 3d. Final verification

- `pnpm run build` passes with zero warnings.
- `pnpm test` passes (if tooling code changed).
- `git status` is clean.

#### 3e. Create PR

- Push all remaining commits.
- Create the PR with a full reasoning trace (see PR sections below).
- Return the PR URL to the operator.

## Version policy

Two packages in this workspace carry versions:

| Package | Path | When to bump |
|---|---|---|
| `site` | `apps/site/package.json` | Any user-visible change: content, theme, layout, icons, config |
| `ai-guidance` | `tools/ai-guidance/package.json` | Any change to capability check logic, report format, or dependencies |

Skill, rule, and doc-only changes do not require a version bump unless they ship as part of a package.

### How to choose the version

Follow semver:

- **Patch** (`0.1.0` → `0.1.1`): bug fixes, minor content corrections, dependency updates
- **Minor** (`0.1.0` → `0.2.0`): new features, significant content additions, theme changes
- **Major** (`0.x.y` → `1.0.0`): reserved for first stable release or breaking changes

When in doubt, prefer minor over patch. The workspace is pre-1.0; minor bumps are cheap.

### When not to bump

- Changes that only touch skills, rules, `AGENTS.md`, or docs outside a versioned package.
- Changes to CI/CD, GitHub config, or repo-level files.

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

### Context section guidance

- Be specific about decisions: "restructured apps/site sidebar because..." not "made some changes"
- Include mistakes: if something broke and was fixed, say so and link to the fixing commit
- State what was not verified: this is honesty, not weakness
- Keep it concise but complete: a reader should understand the full journey in 2-3 minutes

### Why this matters

- A diff shows what changed. Context shows why.
- Future contributors (including agents) can reconstruct intent from the PR description.
- Mistakes documented in PRs become institutional knowledge.
- This is the Practice of Clarity applied to the development process itself.

## PR description upkeep

The PR description must stay current with every push. This is the last step after pushing commits to a branch with an open PR.

### When to update

Every time you push one or more commits to a branch that has an open PR. No exceptions.

### What to verify

- **Summary**: does it list everything the branch now contains?
- **Context / Evolution**: are new decisions, mistakes, or corrections documented?
- **Trace assumptions**: are versions, tools, and limits still accurate?
- **Skills, files, and directory lists**: do they match the current state?
- **Checklist**: are all items still correct?

### How to update

```bash
gh pr view <number> --json body -q .body > /tmp/pr-body.md
# Edit /tmp/pr-body.md with the updates
gh pr edit <number> --body-file /tmp/pr-body.md
rm /tmp/pr-body.md
```

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
- Do not commit on `main`. All work happens on feature branches.
