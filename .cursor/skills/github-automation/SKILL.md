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

Version bumps and CHANGELOG updates are handled automatically by Release Please. Do not bump versions manually unless Release Please is broken or the operator explicitly asks.

Release Please reads Conventional Commit types to determine the bump:
- `feat` → minor bump
- `fix` → patch bump
- `BREAKING CHANGE` footer → major bump
- `chore`, `docs`, `refactor`, `test` → patch bump (if files in a versioned package changed)

If files changed are outside both versioned packages, no version bump occurs.

#### 3d. Final verification

- `pnpm run build` passes with zero warnings.
- `pnpm test` passes (if tooling code changed).
- `git status` is clean.

#### 3e. Create PR

- Push all remaining commits.
- Create the PR with a full reasoning trace (see PR sections below).
- Return the PR URL to the operator.

## Version policy

Three packages in this workspace carry versions:

| Package | Path | What it captures |
|---|---|---|
| `workspace` | `package.json` (root) | CI/CD, security scanning, agent guidance, skills, rules, docs, repo config |
| `site` | `apps/site/package.json` | User-visible changes: content, theme, layout, icons, Astro config |
| `ai-guidance` | `tools/ai-guidance/package.json` | Capability check logic, report format, dependencies |

Release Please attributes commits to packages based on which files changed. Commits that only touch root-level files (`.github/`, `docs/`, `AGENTS.md`, `.cursor/`) are attributed to the `workspace` package.

### Automated releases (Release Please)

Version bumps, CHANGELOGs, and GitHub Releases are automated via [Release Please](https://github.com/googleapis/release-please).

**How it works:**

1. Commits land on `main` via squash-merged PRs (with Conventional Commit messages).
2. Release Please analyzes the commits and determines which packages need a version bump based on which files changed.
3. It creates or updates a **Release PR** with version bumps in `package.json` and CHANGELOG updates.
4. When the GitHub App token is configured, auto-merge is enabled on the Release PR. CI checks run (triggered by the App token), and the PR merges automatically when all required checks pass. Without the App token, the operator merges manually.
5. On merge, Release Please creates **GitHub Releases** with tags (e.g., `site-v0.2.0`, `ai-guidance-v0.2.0`).
6. Published releases trigger environment deployments (seed deploys on `release: published`).

**Configuration files:**

| File | Purpose |
|---|---|
| `release-please-config.json` | Package definitions, changelog sections, release behavior |
| `.release-please-manifest.json` | Tracks current version of each package |

**Token strategy:**

The `release.yml` workflow uses a GitHub App installation token instead of the default `GITHUB_TOKEN`. This is required because GitHub's anti-recursion policy prevents `GITHUB_TOKEN` from triggering workflow runs. Without the App token, CI checks (gitleaks, Shai-Hulud, CodeQL) never run on Release Please PRs, and `enforce_admins` blocks merging.

The workflow falls back to `GITHUB_TOKEN` if the App is not configured (variable `RELEASE_APP_ID` is empty). In fallback mode, auto-merge is disabled and Release PRs require the admin bypass workaround to merge.

Setup: `docs/infra/github-app-release-setup.md`.

**Deployment trigger:**

Deployments are triggered by `release: types: [published]`, not `push: branches: [main]`. This ensures the version bump lands on `main` before the deploy runs, so every deployment corresponds to a tagged release. Manual deploys remain available via `workflow_dispatch`.

**Commit type → version bump mapping:**

| Commit type | Bump | Example |
|---|---|---|
| `feat` | Minor | `feat(astro): add dark mode toggle` |
| `fix` | Patch | `fix(astro): correct sidebar link` |
| `BREAKING CHANGE` | Major | Footer `BREAKING CHANGE: remove legacy API` |
| `chore`, `docs`, `refactor` | Patch | Only if files in a versioned package changed |

**When no bump occurs:**

- Commits of type `test` (hidden in changelog sections config).
- Commits that touch only files already covered by a more specific package (e.g., a change in `apps/site/` only bumps `site`, not `workspace`).

### Semver guidance

Follow semver:

- **Patch** (`0.1.0` → `0.1.1`): bug fixes, minor content corrections, dependency updates
- **Minor** (`0.1.0` → `0.2.0`): new features, significant content additions, theme changes
- **Major** (`0.x.y` → `1.0.0`): reserved for first stable release or breaking changes

The workspace is pre-1.0. Minor bumps are cheap.

## Conventional Commits

Format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

Scopes: `seedpack`, `ai`, `tooling`, `docs`, `astro`, `infra`

Each commit does one thing. If explaining two unrelated changes, split them.

For full commit discipline, see the `git-commit` skill.

## PR as reasoning trace

Every PR description is a reasoning trace, not just a changelog. Someone reading the PR should understand how the work evolved, what decisions were made, what went wrong, and what was learned.

### PR description security scan

Before posting or updating any PR description, scan the text for:

- Origin server IPs or any IP address that is not a public example
- Internal paths (`/home/clients/`, `/sites/`, deploy paths)
- SSH hostnames, usernames, or key filenames
- Client IDs or long hex identifiers (except git commit SHAs)
- Port numbers in infrastructure context

If any appear, replace with generic references. This is a public repository. PR descriptions are world-readable and permanently archived.

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
