---
name: git-commit
description: Enforces proper Conventional Commits, atomic commit discipline, and pre-commit verification. Use before every git commit in this workspace.
---

# Git Commit Discipline

## When to use

Before every `git commit`. No exceptions.

## Pre-commit checklist

Before staging and committing, verify in this order:

1. **Build passes**: run `pnpm run build` if you changed assets, config, content structure, or frontmatter.
2. **Tests pass**: run `pnpm test` if you changed tooling code.
3. **Internal references are valid**: if you added or changed any markdown link, backtick path, or file reference, verify the target exists. A build catches broken links in site content, but not in skills, rules, or docs outside the Astro site.
4. **Scope is atomic**: the staged changes do exactly one logical thing. If you need to describe two unrelated changes, split into two commits.
5. **Nothing unintended is staged**: run `git diff --cached --stat` and review the file list.
6. **GPG signing is active**: this repo requires signed commits. If you cannot sign, output the commands for the operator to run. Do not use `--no-gpg-sign`.

## Post-commit: PR description upkeep

After pushing commits to a branch that has an open PR, update the PR description as the last step. This is not optional.

1. Check if the branch has an open PR: `gh pr view --json number,title -q .number`
2. If a PR exists, verify the description reflects all commits on the branch
3. Update: `gh pr edit <number> --body-file <temp-file>`

What to check:
- "What this PR adds" lists every feature, fix, and change
- "Evolution during implementation" covers any new decisions, mistakes, or corrections
- "Trace" assumptions are still accurate (versions, tools)
- Skills and file lists are current

If you pushed new commits and did not update the PR description, the PR is out of date. Fix it before moving on.

## Commit message format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Subject line rules

- **Imperative mood**: "add", "fix", "remove" — not "added", "fixes", "removed"
- **Lowercase**: do not capitalize the first letter of the subject
- **No period** at the end
- **Max 72 characters** for the full first line (`type(scope): subject`)
- **Be specific**: "add hero image to splash page" not "update site"

### Types

| Type | Use when |
|---|---|
| `feat` | Adding new functionality or content |
| `fix` | Correcting a bug or broken behavior |
| `chore` | Maintenance that doesn't change functionality (deps, config) |
| `docs` | Documentation-only changes (READMEs, comments, doc site content) |
| `test` | Adding or updating tests only |
| `refactor` | Restructuring code without changing behavior |

### Scopes (area-based)

| Scope | Covers |
|---|---|
| `seedpack` | Seed maintenance (files in `seeds/`) |
| `ai` | AGENTS.md, Cursor rules/skills, Copilot/Claude adapters, `.local` config |
| `tooling` | pnpm, TS, Vitest, scripts, capability checkers |
| `docs` | Starlight content pages and information architecture |
| `astro` | Starlight scaffolding, config, theme, components, CSS, assets |

If a change touches multiple scopes, use the primary scope. If truly cross-cutting, omit the scope: `chore: update gitignore`.

### Body

Include a body when:

- The "why" is not obvious from the subject
- There are trade-offs or alternatives considered
- The change has known limitations

Wrap the body at 72 characters. Separate from subject with a blank line.

### Footer

Use for:

- `BREAKING CHANGE: <description>` — when the change is not backward compatible
- `Refs: #<issue>` — link to related issues
- `Co-authored-by: Name <email>` — if pair-authored

## Atomic commit discipline

A commit is atomic when:

- It does one logical thing
- It can be reverted without side effects on unrelated code
- Its subject line fully describes all staged changes

### Signs you need to split

- The subject uses "and" to describe two actions
- The diff touches files in unrelated scopes
- You staged a fix alongside a feature

### How to split

```bash
# Stage only the files for the first commit
git add <file1> <file2>
git commit -m "feat(astro): add hero image to splash page"

# Then stage the rest
git add <file3>
git commit -m "fix(ai): correct image path syntax in skill docs"
```

## Common mistakes

- **Vague subjects**: "update files", "fix stuff", "wip" — always be specific
- **Wrong type**: using `chore` for a new feature, or `feat` for a bug fix
- **Wrong scope**: using `docs` for Astro config changes (use `astro`)
- **Mixing concerns**: bundling an unrelated fix with a feature
- **Committing broken builds**: always verify the build before committing asset/config changes
- **Forgetting workspace.md**: if repo structure changed, update `docs/architecture/workspace.md` in the same commit or a dedicated follow-up commit in the same PR

## Examples

Good:
```
feat(astro): add hero image with circular center crop
fix(astro): use relative path for hero image in frontmatter
feat(ai): add operator config template (.local.example.md)
chore: add .local/ to .gitignore for operator config
docs(docs): add contribution guide to site
test(tooling): add parse-version edge cases
refactor(tooling): extract report formatting into pure function
```

Bad:
```
update site                          # vague
feat: add hero and fix paths         # two things
Fixed the build                      # past tense, no scope, no detail
chore(astro): add new feature        # wrong type
```
