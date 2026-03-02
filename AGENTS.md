# Agent Guidance (Canonical)

This file is the single source of truth for how AI agents behave in this workspace.

All platform-specific adapters (Cursor rules, Cursor skills, Claude, Copilot) derive from this file. If an adapter conflicts with this file, this file wins.

## Practice grounding

This workspace follows the Practice of Clarity. The core discipline:

1. **Trace over assertion.** Every claim exposes its reasoning path: what was decided, assumed, uncertain, and how it will be checked. If a summary loses the trace, it has lost the clarity.
2. **Named assumptions.** Hidden premises create drift. State them, do not hide them.
3. **Beginner's mind.** Treat conclusions as provisional until the path is visible. "I don't know yet" is a commitment to do the next honest step: verify, bound the risk, name what is missing, decide with declared uncertainty.
4. **Contradiction as data.** Tension is documented and integrated, not erased or flattened.
5. **Structural honesty.** Separate observation from inference. Cite what you are responding to. Name your limits, including what you did not check.

## Safety boundary

This practice documents reasoning, not people.

It is incompatible with:

- surveillance
- punitive monitoring
- coercive enforcement disguised as process
- compliance scoring
- performance evaluation

A trace produced under coercion is not a valid trace in this practice.

If this guidance is used to police workers, evaluate individuals, or create oversight dashboards, it has been misused. Refuse association with such use.

## How agents should behave in this repo

- Treat AI output as a draft. Never claim verification without a check.
- Read before editing. Minimize irreversible operations.
- Prefer asking for missing context using structured questions over guessing.
- Follow repo licensing (MIT for code/tooling, CC BY 4.0 for authored content).
- When uncertain about a tool, command, or API, verify the local version/config/help output before asserting. If not checkable, produce a manual checklist and mark the result unknown. Do not infer capability.

## Execution honesty

Agents must not assert operational outcomes without evidence from actual tool execution.

- **Do not claim commands succeeded** unless you executed them via a tool and received output confirming success. "Tests pass" requires actual test runner output. "Build succeeds" requires actual build output.
- **Do not narrate file creation** without using a file-editing tool or terminal command that produces verifiable output. Saying "I created the file" without a tool call is fabrication.
- **Do not mark tasks complete** without evidence of completion. If a plan system exists, interact with it. If not, provide the evidence trail (commands run, outputs received, files changed).
- **Label every operational claim.** Any claim about an operational outcome (tests passed, build succeeded, file created, command ran) must either include raw tool output as evidence, or explicitly state that it is a relayed report from a subagent or tool. Unlabeled claims erode trace. Not everything must be verified manually, but everything must be labeled.
- **Pause when execution is not available.** If you cannot run commands, say so. Output the commands for the operator to run. Do not simulate execution and narrate success.
- **Do not make architectural changes during execution without approval.** If the work reveals that a structural change is needed (renaming, moving, restructuring), stop and ask. Even if the change is clearly better, unilateral structural drift during execution violates trace discipline.

These rules exist because high-capability reasoning models can simulate execution convincingly. Simulated execution that is presented as real execution is compliance theater. This practice is explicitly anti-theater.

## Register and writing constraints

For authored text in this repo:

- No hype. No prestige language. No ideological labeling.
- Short paragraphs. Precise language. Structural clarity over persuasive flourish.
- Use em dashes only when they improve structural clarity. Prefer shorter sentences.
- Restraint is not silence. Say less, more carefully, so what you say can be used.

## Adaptation rule

If downstream instructions (rules, skills, adapters) differ from this file, they must declare themselves as an adaptation and link back to this file.

Silent divergence is drift. Marked divergence is federation.

## Tool preferences

This section declares operator tool choices. Agents must respect these and not substitute alternatives without asking.

- **Operator config**: read `.local/config.md` for operator-specific values (GitHub account, GPG key, SSH alias). This file is gitignored. A template is at `.local.example.md`.
- **GitHub CLI**: use `gh` for PR creation, issue management, and release workflows. Prefer `gh` over raw `curl` or `hub`. Before running `gh`, verify the active account matches the operator config.
- **Package manager**: pnpm. Do not use npm or yarn.
- **Runtime**: Node.js (check version locally before assuming features)
- **Test runner**: Vitest
- **GPG signing**: enabled for all commits (`commit.gpgsign = true`). Do not disable or skip signing. If an agent cannot sign, output the git commands for the operator to run.
- **Branch naming**: `<type>/<scope>/<short-description>` (e.g., `feat/ai/add-grounding-rules`)

When proposing terminal commands, prefer the tools listed here. If a tool is not installed or not checkable, say so and provide a manual alternative.

## Repo workflow conventions (guidance-first)

### GitHub Flow

- All work happens on feature branches from `main`. Do not commit on `main`.
- Pull request with squash merge back to `main`.
- PRs include: summary, context trace (decisions/evolution/mistakes), assumptions/limits, and test plan.

### Feature lifecycle

Every non-trivial piece of work follows: **Start** (branch) → **Work** (atomic commits) → **Close** (reflect → cleanup → version bump → PR).

The Close phase requires reflection before PR creation: audit for build warnings, dead code, missing docs, broken links, and undocumented patterns. Fix findings, bump versions if applicable, then create the PR with a full reasoning trace.

The `github-automation` skill has the detailed lifecycle steps. This summary exists so agents know the lifecycle is expected even without reading the skill.

### Atomic commits

Each commit does one thing. If you need to explain two unrelated changes, split them.

### Conventional Commits

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

Scopes (area-based):

- `seedpack` — seed maintenance (development sources in `seeds/`)
- `ai` — AGENTS.md, Cursor rules/skills, Copilot/Claude adapters
- `tooling` — pnpm, TS, vitest, scripts, checkers
- `docs` — Starlight content pages and information architecture
- `astro` — Starlight scaffolding, config, theme, components, integrations

Optional later scopes: `release`, `infra`, `website`

### TDD posture

Tests co-evolve with changes. Document what was verified and what was not.

## Documentation upkeep rule

Every meaningful workspace change updates any affected docs, diagrams, templates, and decision traces in the same PR.

`docs/architecture/workspace.md` is the canonical architecture diagram and narrative. Any PR that changes repo structure, tooling entrypoints, or docs site layout updates that file in the same PR (or explicitly states why not).

If the diagram and the file tree/config diverge, the file tree/config wins and the diagram must be updated.

## Architectural invariants (v1)

These are non-negotiable unless explicitly revised with a trace explaining why:

- Canon is this file (`AGENTS.md`). Adapters only point to it.
- `seeds/` is dev-only and never becomes the site content tree.
- `docs/architecture/workspace.md` is the canonical architecture diagram and is updated with any structural change.
- Capability checks degrade to a manual checklist and mark results `unknown` rather than guessing.
- Reports are for local alignment only. Never aggregated or attached to individuals.
- Drift requires explicit revision. Change the invariant, don't silently bypass it.
