# Workspace Architecture

This is the canonical architecture document for the Practice of Clarity workspace.

## Update rules

- Any PR that changes repo structure, tooling entrypoints, or docs site layout updates this file in the same PR (or explicitly states why not).
- If the diagram and the actual file tree/config diverge, the file tree/config is the source of truth and this file must be corrected.
- This document is descriptive. It must not become a gate or a compliance artifact.

## What this diagram represents

The diagram shows the current repo architecture: where canonical guidance lives, how adapters derive from it, where tooling and reports sit, and how the frontend relates to the rest.

## What this diagram does not represent

- Runtime behavior or deployment topology
- Future aspirational state (only current reality)
- Relationships between individual files (only directories and roles)

## Current architecture

```mermaid
flowchart TD
  Seeds[seeds/] -->|"dev-only sources"| Agents[AGENTS.md]
  Practices["docs/practices/"] -->|"operational lenses"| Agents

  Agents -->|"always-apply rules"| CursorRules[.cursor/rules/]
  Agents -->|"stack skills"| CursorSkills[.cursor/skills/]
  Agents -->|"thin pointer"| Claude[.claude/]
  Agents -->|"thin pointer"| Copilot[.github/copilot-instructions.md]

  Agents -->|"capability checks"| Tooling[tools/ai-guidance/]
  Tooling -->|"auditable reports"| DocsAI[docs/ai/]
  Tooling -->|"informs"| CursorSkills

  Guidance[docs/guidance/] -.->|"describes"| Agents
  Architecture[docs/architecture/] -.->|"describes"| Agents

  LocalConfig[".local/config.md"] -.->|"operator prefs"| Agents
  Dependabot[".github/dependabot.yml"] -.->|"version updates"| Tooling

  AstroSite[apps/site/] -->|"site content"| SiteDocs["apps/site/src/content/docs/"]
```

## Directory roles

| Path | Role | Status |
|---|---|---|
| `seeds/` | Development-only canonical sources for the Practice of Clarity | Exists |
| `docs/practices/` | Practice documents and operational lenses (e.g., Sensible Defaults) | Exists |
| `AGENTS.md` | Canonical agent guidance (single source of truth) | Exists |
| `.cursor/rules/` | Cursor always-apply and file-scoped rules (includes security-awareness) | Exists |
| `.cursor/skills/` | Cursor project skills (astro-starlight, node-tooling, git-commit, github-automation, dependency-management) | Exists |
| `.claude/` | Claude Code adapter (thin pointer to AGENTS.md) | Exists |
| `.github/` | PR template, Copilot instructions, Dependabot config | Exists |
| `.local/` | Operator-specific config (gitignored). Template: `.local.example.md` | Exists |
| `docs/guidance/` | Descriptive guidance docs (conventions, change process) | Exists |
| `docs/architecture/` | Architecture docs + this canonical diagram | Exists |
| `docs/ai/` | Capability alignment reports (generated) | Exists |
| `tools/ai-guidance/` | pnpm + TS + Vitest tooling for capability checks | Exists |
| `apps/site/` | Astro Starlight frontend | Exists |
