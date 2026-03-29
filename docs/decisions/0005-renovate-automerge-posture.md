# 0005 — Renovate automerge posture for routine and vulnerability updates

**Status:** accepted
**Date:** 2026-03-29
**Supersedes:** [0004](0004-renovate-primary-dependency-engine.md)
**PR:** pending

## Context

ADR 0004 established Renovate as the primary dependency update engine and kept major updates out of the routine queue. That part worked. After merge, Renovate immediately opened the expected release, vulnerability, and config-migration PRs.

The first live queue also exposed a mismatch. The written policy still described security fixes as manual review only, but the actual Renovate behavior on this repo was already treating vulnerability PRs as auto-merge candidates after checks passed.

That left the workspace in an unstable position. Either the docs needed to pull the repo back toward manual review, or the repo needed to acknowledge the real operator preference: automate as much of dependency maintenance as possible, and treat manual review as the exception rather than the default.

## Decision

1. **Routine non-major dependency updates remain auto-merge eligible after required checks pass.**

2. **Renovate vulnerability PRs are also auto-merge eligible after required checks pass.** The explicit `vulnerabilityAlerts` configuration becomes the source of truth instead of relying on incidental rule inheritance.

3. **Vulnerability fixes use the lowest fixed version by default.** This keeps security remediation smaller and more legible than jumping automatically to the newest possible release.

4. **Major updates remain gated behind Dependency Dashboard approval.** High-friction review remains focused there rather than spread across the routine queue.

5. **Manual dependency work becomes an exception path.** If a Renovate PR fails checks, needs code changes, or exposes a real regression, the repo handles it manually. The baseline posture is still automation first.

6. **Future Renovate config changes must re-check live Renovate documentation before editing `renovate.json`.** The repo should not fossilize an old interpretation of Renovate behavior.

## Alternatives considered

**Keep the manual-security wording from ADR 0004.** Rejected: it no longer matched the repo's actual automation posture or the operator's preference. A policy that describes a different system from the one that is running is drift.

**Allow all updates, including majors, to auto-merge.** Rejected: this would remove the one deliberate review boundary that still matters. Major updates change behavior too often to treat them as ordinary queue flow.

**Disable vulnerability PR auto-merge entirely and require manual review for every security fix.** Rejected: this recreates the exact maintenance bottleneck the new strategy was supposed to remove.

## Consequences

**What improves:**
- The live Renovate behavior now matches the written policy.
- Security remediation can stay fast without returning to a manual queue.
- The repo becomes clearer about what "safe enough to automate" means in practice.

**What becomes explicit:**
- Vulnerability PRs are part of the automation posture, not a separate manual lane.
- Failing PRs, code-breaking upgrades, and majors remain the exception path for human intervention.
- Renovate docs must be refreshed when config changes are made, rather than treated as static background knowledge.

**What becomes harder:**
- Strong CI becomes even more important, because more updates are allowed to merge automatically.
- Misconfigured automerge rules can now create fast-moving drift if they are not checked against live docs.

## References

- `renovate.json`
- `docs/guidance/dependency-update-operations.md`
- `.cursor/skills/dependency-management/SKILL.md`
- `.cursor/skills/renovate-operations/SKILL.md`

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
