# Agent Guidance (Canonical)

**Author:** Mikey Sebastian Drozd  
**Source:** https://github.com/Mikeys-Tech-Lab/poc/blob/main/AGENTS.md  
**Copyright:** © 2026 Mikey Sebastian Drozd  
**License:** [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).

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

## Repo bootstrap posture

The default workspace bootstrap is not "load every lens."

For repo-native development and agent work, the always-on grounding layer is:

- `AGENTS.md`
- the root seed set in `seeds/`
- the continuity layer in `continuity/`

This baseline is the default self-boot posture for a fresh chat in this
workspace.

Mandate lenses are overlays, not universal bootstrap.

Load `mandateLenses/SensibleDefaults/context-seeder.md` only when:

- the user explicitly asks for `Sensible Defaults`
- the prompt names that seeder or clearly asks for that posture
- a development or overall workspace change needs delivery-reality framing

If the seeder was not loaded, do not claim operation under that lens.

## Public site boundary

Content under `apps/site/src/content/**` is the public practice layer.

- Lead with condition and practice, not repo, system, or agent mechanics.
- Do not include repo-operation instructions in public pages.
- Public pages may point toward activation only after conceptual grounding, and only by sending readers to a mandate lens or its context seeder.
- Do not treat repo navigation or repo workflows as activation.
- The site explains the practice. Mandate lenses activate it. The repo supports its evolution.

Repo planning and coordination may assume `Sensible Defaults` as an internal
stance, but that assumption must never be required for a reader to understand
the public site.

If the `Sensible Defaults` seeder was not actually loaded in a given chat, do
not claim that it was loaded or that you are operating under it.

## Execution honesty

Agents must not assert operational outcomes without evidence from actual tool execution.

- **Do not claim commands succeeded** unless you executed them via a tool and received output confirming success. "Tests pass" requires actual test runner output. "Build succeeds" requires actual build output.
- **Do not narrate file creation** without using a file-editing tool or terminal command that produces verifiable output. Saying "I created the file" without a tool call is fabrication.
- **Do not mark tasks complete** without evidence of completion. If a plan system exists, interact with it. If not, provide the evidence trail (commands run, outputs received, files changed).
- **Label every operational claim.** Any claim about an operational outcome (tests passed, build succeeded, file created, command ran) must either include raw tool output as evidence, or explicitly state that it is a relayed report from a subagent or tool. Unlabeled claims erode trace. Not everything must be verified manually, but everything must be labeled.
- **Pause when execution is not available.** If you cannot run commands, say so. Output the commands for the operator to run. Do not simulate execution and narrate success.
- **Do not make architectural changes during execution without approval.** If the work reveals that a structural change is needed (renaming, moving, restructuring), stop and ask. Even if the change is clearly better, unilateral structural drift during execution violates trace discipline.

These rules exist because high-capability reasoning models can simulate execution convincingly. Simulated execution that is presented as real execution is compliance theater. This practice is explicitly anti-theater.

### Plans declare intent, not tool invocations

Plans and documentation should declare what needs to be verified (e.g., "verify documentation changes") rather than prescribing specific tool invocations. Agents resolve intent to commands by reading the workspace's declared tool preferences and scripts at execution time. Hardcoding tool commands into plans creates a second source of truth for tooling that drifts when tooling evolves.

## Structural awareness

Agents must orient in the workspace before acting on it. A change that is correct in isolation but ignores its connections is a change that creates drift.

### Orient before acting

Before substantive work, understand what you are acting within:

- What directories, docs, and config files describe the area you are about to change?
- What other systems reference or depend on the thing you are changing?
- What documentation surfaces will need to evolve with this change?

This is not overhead. It is the difference between working in a system and working on a fragment in isolation.

### Path verification before execution

If a plan names files to create or update, verify they exist (or confirm they do not, if creating) before executing. Cached context drifts. An agent can orient conceptually while still referencing paths that have moved or never existed. This is the difference between orienting conceptually and grounding against actual state.

### Ripple check

Before committing or marking work complete, trace the ripple:

- What did this change touch beyond the immediate files?
- Which docs, tests, onboarding pages, architecture descriptions, rules, or skills now describe something that no longer matches reality?
- If the same control, preference, or action is exposed in multiple UI surfaces, do those surfaces still express the same option model and the same action semantics?
- If nothing else was affected, state that explicitly. Silence is not the same as "nothing changed."

### No flattening

This workspace is a connected system: code, documentation, AI guidance, infrastructure, and practices all reference each other. Agents must not reduce it to just the immediate task.

- A code change may affect onboarding docs, architecture descriptions, and security posture.
- A docs change may affect the topic index, the manual onboarding path, and adapter files.
- An infrastructure change may affect protection layers, deployment runbooks, and security guidance.

If you see only the file you are editing, you are flattening. Zoom out, then act.

## Reflection and evolution discipline

Reflection in this workspace must be structural.

A useful reflection does not stop at the local bug, local file, or local workaround. It climbs from the incident to the pattern, from the pattern to the guardrail, and from the guardrail to the workspace surfaces that must evolve.

### Required climb

When documenting a mistake, correction, or retrospective:

1. **Name the incident.** What happened in concrete terms?
2. **Name the underlying pattern.** What class of failure does this belong to?
3. **Name the structural rule.** What principle or invariant should prevent recurrence?
4. **Update the right surfaces.** Canonical guidance first, then affected skills, rules, docs, and tests.
5. **Verify the contract.** Tests and checks must protect the intended behavior, not the accidental implementation that caused the bug.

### Anti-pattern

If a reflection ends at "fixed the selector", "updated the command", or "made the test pass", it is incomplete. That is patching, not evolution.

The purpose of reflection here is not only to record what went wrong. It is to improve the architecture of future decisions.

## Security posture

This is a public repository. Everything committed is world-readable. Agents must treat security as a first-class concern.

### Secret handling in AI chat

- **Never display, `cat`, echo, or pipe** private keys, tokens, passwords, or credentials through tool calls. The output transits AI infrastructure and persists in local transcripts. Neither channel is private.
- **Give the operator the command to run.** Do not capture the output. Example: tell the operator to run `cat ~/.ssh/key` in their own terminal and paste the value into GitHub secrets. Do not run it via a tool call.
- **If a secret was accidentally exposed in chat**, flag it immediately and recommend rotation. Treat the secret as compromised.

### Public repo hygiene

- No secrets, IPs, internal hostnames, client IDs, key filenames, or infrastructure paths in committed files.
- The same rule applies to all public-facing text: PR descriptions, commit messages, issue bodies, and review comments. These are world-readable and permanently archived. Use generic references ("origin server", "deploy path updated") instead of actual values.
- Before creating or updating a PR description, scan the draft for origin IPs, internal paths, SSH hostnames/usernames, client IDs, and key filenames. Redact before posting.
- Sensitive operator-specific local values belong only in gitignored local files such as `.local/config.md`. CI/CD values go in GitHub secrets and variables.
- Before writing any file containing secrets or operator-specific values, verify the target path is gitignored. If not, stop and ask.

### Local operator data boundary

- **Do not read populated local config files** that may contain sensitive or operator-specific infrastructure values. Gitignored does not mean safe to expose to AI tooling.
- **Classify local operator data explicitly.**
  - Agent-readable non-sensitive preferences: safe defaults or workflow preferences that can be shared intentionally.
  - Operator-mediated operational facts: values an agent may need, but which the operator discloses minimally at runtime or verifies through operator-run commands.
  - Never-read sensitive local values: secrets, hostnames, internal paths, key filenames, identifiers, or similar infrastructure details that must not transit AI tool output.
- **Reject the old mental model.** One populated local file that agents are expected to read is not an acceptable workspace contract.
- **When runtime facts are needed**, ask the operator for the minimum required non-sensitive value or have the operator run the command locally and relay the result.

### Deployment awareness

- Read the committed deployment docs and the `infomaniak-deployment` skill to understand the current environment topology. If operator-specific runtime facts are needed, use operator-mediated disclosure.
- SSH keys are generated locally. Private keys never transit through AI tools.
- IP restriction is defense-in-depth, not the sole access control layer.

### Supply chain

- Routine dependency and GitHub Actions version updates are managed by Renovate (`renovate.json`).
- Dependabot remains enabled for GitHub-native alerting and security-only update surfaces.
- GitHub Actions are currently referenced by version tags in workflow files. Renovate tracks them as part of the routine update queue.
- No third-party deployment actions. Direct `ssh`/`rsync` reduces supply chain surface.
- CI security scanning runs on every PR and push to `main`: gitleaks (secret detection), Shai-Hulud (npm supply chain), CodeQL (static analysis), OSSF Scorecard (supply chain posture).
- gitleaks uses the MIT-licensed CLI directly to avoid commercial licensing constraints. The version is pinned in the workflow.
- Dependabot alerts and security updates remain enabled.
- When the project matures, pinning to commit SHAs is the next step.

### CI security scanning

| Workflow | Tool | What it checks |
|---|---|---|
| `secret-scan.yml` | gitleaks CLI | Accidentally committed secrets, tokens, credentials |
| `supply-chain.yml` | Shai-Hulud 2.0 Detector | Compromised npm packages from known supply chain attacks |
| `codeql.yml` | GitHub CodeQL | Static analysis for security vulnerabilities in JS/TS |
| `scorecard.yml` | OSSF Scorecard | Supply chain security posture scoring |
| `security-scan-live.yml` | Nuclei | HTTP security header verification on deployed environments |

CodeQL and Scorecard also run on a weekly schedule. Nuclei runs after each deployment and on manual dispatch.

### Credential lifecycle

- Each deployment environment gets its own SSH key pair.
- Keys are rotated if exposed. The setup runbook is at `docs/infra/infomaniak-environment-setup.md`.

## Onboarding

This workspace has structured repo entry paths at `docs/onboarding/`. AI agents can guide newcomers through them interactively.

- Say `onboard me` for setup, workspace orientation, and contribution guidance.
- Say `Evolution Arc` for repo history, reasoning trace, and how the workspace changed. This path asks which register the reader wants, then follows inspectable repo-local sources.
- The topic index is at `docs/onboarding/README.md`. It lists available topics with IDs, paths, descriptions, and prerequisites.
- The Cursor skills at `.cursor/skills/onboarding/SKILL.md` and `.cursor/skills/evolution-arc/SKILL.md` define the agent-driven entry flows.
- For Claude Code and GitHub Copilot: read the topic index and follow the same structure when a user asks for onboarding or repo history.
- For readers without AI assistance: `docs/onboarding/manual.md` and `docs/onboarding/evolution-arc.md` provide the same starting paths.

Onboarding docs summarize and link to deep docs. They do not duplicate content that lives elsewhere.

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

- **Operator config**: do not assume populated local config is agent-readable. Use operator-mediated disclosure for account or identity facts, and treat `.local.example.md` as structure only.
- **GitHub CLI**: use `gh` for PR creation, issue management, and release workflows. Prefer `gh` over raw `curl` or `hub`. Before running `gh`, verify the active account matches the operator-provided account context or other safe local evidence.
- **Package manager**: pnpm. Do not use npm or yarn.
- **Runtime**: Node.js (check version locally before assuming features)
- **Dependency updates**: Renovate (`renovate.json`) is the primary engine for routine version updates and vulnerability-fix PRs. Dependabot remains the GitHub-native alerting surface. Major updates require deliberate review; passing routine and vulnerability PRs may auto-merge after CI according to the repo config.
- **Test runner (unit)**: Vitest. Both `tools/ai-guidance` and `apps/site` have Vitest configs. `pnpm test` runs across all packages.
- **Test runner (E2E)**: Playwright (Chromium only). E2E tests live in `apps/site/e2e/`. Run against the built static output via `pnpm preview`. `pnpm --filter site test:e2e` runs E2E tests.
- **Snapshot export**: use `pnpm screendump` to build the site, export all current page x register x atmospheric theme x viewport screenshots to `.dist/poc-snapshot-images/`, and create `.dist/poc-snapshot-images-snapshot-<version>.zip`
- **Linter and formatter**: Biome (`biome.json` at repo root). Run `pnpm lint` to check, `pnpm lint:fix` to auto-fix. Biome covers `.ts`, `.mjs`, `.js`, `.json`, `.css`. It does not process `.astro` files.
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
- `infra` — CI/CD workflows, deployment config, hosting

Optional later scopes: `release`, `website`

### Automated releases

Version bumps, CHANGELOGs, and GitHub Releases are handled by [Release Please](https://github.com/googleapis/release-please). It reads Conventional Commits on `main`, creates a Release PR with version bumps and CHANGELOG updates, and creates GitHub Releases when the PR is merged.

Three packages are tracked: root `PoC` (CI/CD, security, agent guidance, docs, repo config), `apps/site` (component: `site`), and `tools/ai-guidance` (component: `ai-guidance`). Commits are attributed to packages based on which files they change.

Release Please uses a GitHub App installation token so its PRs trigger CI workflow runs. Without this, GitHub's anti-recursion policy prevents `GITHUB_TOKEN` from triggering checks on Release PRs. Setup: `docs/infra/github-app-release-setup.md`.

Do not bump versions manually. The `github-automation` skill has the full details.

### TDD posture

Tests co-evolve with changes. Document what was verified and what was not.

## Documentation evolution discipline

Documentation evolves with the workspace. Every PR updates all affected documentation in the same PR. There is no "update docs later." Deferred documentation is deferred clarity, and deferred clarity is debt.

This applies to every documentation surface:

- `seeds/` (structural seed canon at repo root)
- `continuity/` (temporal anchors and architecture memory)
- `mandateLenses/` (canonical runtime lens packages and context seeders)
- `AGENTS.md` (agent behavior, tool preferences, conventions, invariants)
- `docs/onboarding/` (topic index and topic pages)
- `docs/architecture/workspace.md` (directory roles, diagram, narrative)
- `docs/decisions/` (Architecture Decision Records for structural rationale)
- `docs/infra/` (runbooks, protection layers, environment setup)
- `docs/guidance/` (principles, workflow)
- `docs/practices/` (derived explainers and bridge docs)
- `.cursor/rules/` and `.cursor/skills/` (agent rules and skills)
- Adapter files (`.claude/CLAUDE.md`, `.github/copilot-instructions.md`)
- `README.md` (gateway)

### What "affected" means

If a PR changes behavior, structure, tooling, conventions, or security posture, every document that describes or references the changed area must be updated to reflect the new state. If a document is not updated, the PR must explicitly state why not.

### Specific obligations

- **Root canon changes** (new canonical package families, moved root artifacts, lens-source changes): update `docs/architecture/workspace.md`, the affected root packages, and any derived explainers such as `docs/practices/`.
- **Structural changes** (repo layout, new directories, moved files): update `docs/architecture/workspace.md`. If the diagram and the file tree diverge, the file tree wins and the diagram must be updated.
- **Structural decisions** that meet the ADR criteria (`docs/decisions/README.md`): write or update an ADR. Not every structural change needs one — only those where the rationale would otherwise be lost.
- **Onboarding-relevant changes** (setup, workflow, AI guidance, security posture): update the topic index (`docs/onboarding/README.md`) and the affected topic page(s).
- **Onboarding and Evolution Arc contract changes**: keep the deterministic guidance drift guard coherent in the same PR. The blocking layer validates explicit mappings between skills, entry docs, adapters, and trace maps. It must not depend on inferred expectations.
- **Infrastructure or security changes**: update `docs/infra/protection-layers.md` and/or relevant runbooks.
- **Agent behavior changes** (new rules, skills, tool preferences): update `AGENTS.md` and any affected adapters.

### No duplication constraint

Onboarding pages summarize and link. Deep docs hold authoritative procedures. If an onboarding topic page grows beyond a summary, the content must be promoted to a deep doc. Two sources of truth is not clarity — it is drift waiting to happen.

### Guidance drift guard

This workspace uses a two-layer guard for `onboard me` and `Evolution Arc`:

- A **blocking deterministic validator** checks path integrity, topic index consistency, explicit mapping contracts, and referenced guidance surfaces.
- A **non-blocking advisory review** uses an AI reasoning layer over inspectable repo traces to surface broader drift, missing reflection, or missing guidance evolution.

The blocking layer must stay explicit and checkable. It must not fail on interpretation, tone, or inferred intent.

The advisory layer must stay advisory. It is a visibility mechanism, not a scoring or compliance system.

## Architectural invariants (v1)

These are non-negotiable unless explicitly revised with a trace explaining why:

- Canon is this file (`AGENTS.md`). Adapters only point to it.
- Default workspace bootstrap is `AGENTS.md` + `seeds/` + `continuity/`. Mandate lens seeders are on-demand overlays, not universal bootstrap.
- `seeds/` is dev-only and never becomes the site content tree.
- `seeds/`, `continuity/`, and `mandateLenses/` are sibling root canon surfaces. Do not introduce a nested `root/` wrapper around them.
- `mandateLenses/*/lens.md` is the canonical lens artifact. `context-seeder.md` is derivative. `docs/practices/` can explain and bridge, but it is not the runtime source of truth for a lens.
- `docs/architecture/workspace.md` is the canonical architecture diagram and is updated with any structural change.
- Capability checks degrade to a manual checklist and mark results `unknown` rather than guessing.
- Reports are for local alignment only. Never aggregated or attached to individuals.
- Drift requires explicit revision. Change the invariant, don't silently bypass it.
