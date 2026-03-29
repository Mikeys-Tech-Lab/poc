# 0003 — Agent local config boundary

**Status:** accepted
**Date:** 2026-03-28
**PR:** pending

## Context

The workspace already states that AI tool output and chat transcripts are not private. `AGENTS.md` warns agents not to display, echo, or pipe secrets through tool calls because that output transits AI infrastructure and persists in transcripts.

At the same time, multiple authoritative surfaces told agents to read populated local operator config directly. `AGENTS.md`, onboarding docs, the security rule, the Infomaniak deployment skill, the architecture diagram, and the local template all treated `.local/config.md` as a normal agent input for operator preferences and deployment details.

That created a structural contradiction. The workspace warned that tool output is not private, while also normalizing reads of a gitignored local file that may contain operator-specific infrastructure values, paths, identifiers, and other details the operator does not want transiting AI tooling.

This is not just a wording issue. Without an explicit boundary, risky values drift into the "safe enough" category, and one populated local file becomes the default agent-readable surface by habit.

## Decision

1. **Agents must not read populated local config files that may contain sensitive or operator-specific infrastructure values.** A gitignored file is not automatically safe to expose to AI tooling.

2. **The workspace classifies local operator data into three categories:**
   - **Agent-readable non-sensitive preferences**: defaults and preferences that are safe to structure and share with an agent, such as workflow defaults or non-sensitive tool preferences.
   - **Operator-mediated operational facts**: facts an agent may need for a task, but which must be disclosed minimally by the operator at runtime or verified through operator-run commands.
   - **Never-read sensitive local values**: secrets, hostnames, internal paths, key filenames, identifiers, or similar local infrastructure details that must not transit AI tool output.

3. **The old mental model is rejected.** One undifferentiated populated local file that agents are expected to read is no longer an acceptable workspace contract.

4. **When runtime facts are needed, the operator discloses only the minimum required non-sensitive value, or runs the command locally and relays the result.** This replaces direct file reads as the default behavior.

5. **Workspace guidance must teach the boundary consistently.** Canon, always-on rules, onboarding docs, infrastructure runbooks, skills, templates, and architecture docs must stop describing populated local config as a normal agent input.

## Alternatives considered

**Keep the current model and add stronger warnings.** Rejected: a warning attached to contradictory behavior does not resolve the contradiction. If the same canon still tells agents to read the file, the unsafe pattern remains normalized.

**Ban all local operator data from any agent-readable surface.** Rejected: too coarse. Some non-sensitive preferences may still be useful to structure explicitly. The problem is not "local" by itself. The problem is collapsing all local data into one agent-readable channel.

**Treat `.local/config.md` as safe because it is gitignored.** Rejected: gitignored only means "not committed." It does not mean "safe to expose through AI tooling." Transcript exposure and model context are the relevant boundaries here.

## Consequences

**What improves:**
- The security model becomes internally consistent.
- Agents get a clear replacement behavior instead of an implied prohibition with no workflow.
- Future config work can introduce a safer split mechanism without carrying forward the old assumption.

**What becomes explicit:**
- Gitignored local files can still be too sensitive for agent reads.
- Some facts may be disclosed to agents, but only minimally and intentionally.
- Canonical guidance must distinguish non-sensitive preferences from operational facts and from never-read values.

**What becomes harder:**
- Agents can no longer assume they can inspect local operator configuration to infer missing deployment context.
- Some workflows will require explicit operator mediation until a safer split mechanism is introduced.

## References

- [`AGENTS.md`](../../AGENTS.md)
- [`.cursor/rules/security-awareness.mdc`](../../.cursor/rules/security-awareness.mdc)
- [`docs/onboarding/local-setup.md`](../onboarding/local-setup.md)
- [`docs/onboarding/security.md`](../onboarding/security.md)
- [`docs/infra/infomaniak-environment-setup.md`](../infra/infomaniak-environment-setup.md)
- [`.cursor/skills/infomaniak-deployment/SKILL.md`](../../.cursor/skills/infomaniak-deployment/SKILL.md)
- [`docs/architecture/workspace.md`](../architecture/workspace.md)

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
