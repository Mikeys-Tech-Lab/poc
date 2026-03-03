# AI Guidance Architecture

How AI agents are guided in this workspace, and why it is designed this way.

## The problem

AI coding assistants are powerful but directionless by default. Without explicit guidance, they guess at conventions, invent patterns, and produce output that drifts from the repo's actual structure. In a workspace with cross-cutting architecture (canonical docs, adapters, tooling, a frontend, deployment workflows), unguided changes in one area ripple across many.

## The solution: canonical source with adapters

One file is the single source of truth: `AGENTS.md` in the repo root. Every AI platform reads from it, directly or through a thin adapter.

```
AGENTS.md (canonical)
  ├── .cursor/rules/     (always-apply rules, derived)
  ├── .cursor/skills/    (per-task skills, derived)
  ├── .claude/CLAUDE.md  (thin pointer)
  └── .github/copilot-instructions.md (thin pointer)
```

If an adapter conflicts with `AGENTS.md`, the canonical file wins. Adapters must declare themselves as adaptations and link back.

## What AGENTS.md covers

- **Practice grounding** — the five disciplines (trace over assertion, named assumptions, beginner's mind, contradiction as data, structural honesty)
- **Safety boundary** — what this practice is incompatible with (surveillance, punitive monitoring, compliance scoring)
- **Execution honesty** — agents must not claim outcomes without evidence
- **Security posture** — secret handling, public repo hygiene, supply chain awareness
- **Writing constraints** — no hype, short paragraphs, precise language
- **Tool preferences** — pnpm, Vitest, `gh` CLI, GPG signing, branch naming
- **Workflow conventions** — GitHub Flow, Conventional Commits, feature lifecycle
- **Structural awareness** — orient before acting, ripple check, no flattening
- **Documentation evolution discipline** — every PR updates all affected docs, no exceptions
- **Architectural invariants** — non-negotiable constraints

Full text: [`AGENTS.md`](../../AGENTS.md)

## Cursor: rules and skills

Cursor uses two mechanisms:

**Rules** (`.cursor/rules/*.mdc`) fire automatically. Some apply to every interaction (always-apply), others fire when matching file patterns (file-scoped). Rules handle cross-cutting concerns: Practice grounding, security awareness, writing conventions, visual design.

**Skills** (`.cursor/skills/*/SKILL.md`) are invoked per task. When the agent recognizes a relevant task, it reads the skill file and follows its instructions. Skills handle domain-specific workflows: Astro development, deployment, git commits, GitHub automation, dependency management, onboarding.

Current rules:

| Rule | Scope |
|---|---|
| `poc-grounding.mdc` | Practice of Clarity discipline (always apply) |
| `sensible-defaults.mdc` | Delivery realism lens (always apply) |
| `security-awareness.mdc` | Secret handling, public repo hygiene (always apply) |
| `poc-writing-md.mdc` | Markdown writing conventions |
| `poc-tooling-ts.mdc` | TypeScript + pnpm tooling |
| `astro-starlight.mdc` | Astro + Starlight development |
| `visual-design.mdc` | Visual design |

Current skills:

| Skill | When invoked |
|---|---|
| `onboarding` | Newcomer onboarding and repo orientation |
| `astro-starlight` | Docs site development |
| `node-tooling` | Scripts, tests, TypeScript tooling |
| `git-commit` | Before every commit |
| `github-automation` | Feature lifecycle and PRs |
| `dependency-management` | Adding or updating dependencies |
| `infomaniak-deployment` | Deployment configuration and troubleshooting |

## Claude and Copilot

Both use thin pointer files that reference `AGENTS.md`:

- `.claude/CLAUDE.md` — read by Claude Code
- `.github/copilot-instructions.md` — read by GitHub Copilot

These files contain minimal content. They tell the agent to read `AGENTS.md` for the full guidance. This avoids maintaining parallel copies.

## How to extend

To add a new rule: create a `.mdc` file in `.cursor/rules/`. Declare it as an adaptation of `AGENTS.md`. Set the appropriate scope (always-apply or file-scoped).

To add a new skill: create a directory in `.cursor/skills/` with a `SKILL.md` file. Follow the structure of existing skills (frontmatter with name and description, "When to use" section, capability alignment checks).

To change agent behavior: edit `AGENTS.md`. Adapters follow. If an adapter needs to diverge, it declares the divergence explicitly.

## Why this matters

The guidance system is what makes this workspace coherent across multiple AI agents and human contributors. Without it, each agent session would start from zero, reinventing conventions and potentially contradicting previous decisions. The canonical source ensures consistency. The adaptation rule ensures federation without drift.
