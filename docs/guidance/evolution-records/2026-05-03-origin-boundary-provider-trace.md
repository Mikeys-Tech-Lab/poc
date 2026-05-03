# Origin Boundary Provider Trace

**Status:** applied
**Date:** 2026-05-03
**Trigger class:** required
**Scope:** workspace
**Origin trace:** forensic leakage audit follow-up for direct-to-origin exposure
risk, provider support clarification, manual verification, and `/trace-climb`.
**Activation trace:** `/trace-climb`
**Related PR:** https://github.com/Mikeys-Tech-Lab/poc/pull/181

## Why this record exists

The repo had stale guidance about direct-to-origin protection.

It treated `CF-Connecting-IP` as a header that could be forged successfully on
direct origin requests, and it treated Cloudflare Authenticated Origin Pulls as
a pending hardening path for the current hosting tier.

The provider clarification and manual verification changed that assessment.
This is durable learning because future agents must not reintroduce the old
model or generalize the new model beyond this hosting path.

## What was observed

- The current workflows already generate an `.htaccess` baseline that blocks
  requests missing `CF-Connecting-IP`.
- Infomaniak support stated that Apache sits behind HAProxy on this hosting
  path.
- Infomaniak support stated that non-Cloudflare requests have
  `CF-Connecting-IP` stripped before Apache.
- A manual direct-to-origin request with a forged `CF-Connecting-IP` header
  returned 403 Forbidden.
- Cloudflare Authenticated Origin Pulls cannot be enabled here through Apache
  because Apache is not the TLS client-certificate enforcement point.

No origin IP, private hostname, account identifier, deploy path, key name, or
support transcript text belongs in the durable record.

## Missed assumptions

- The audit initially assumed Apache would receive forged headers directly.
- The docs assumed Authenticated Origin Pulls was merely unconfigured or pending
  provider support.
- The PR risk assessment treated origin IP exposure as higher-impact before
  verifying the provider's HAProxy behavior.

## Missed guidance

The workspace had strong public-repo hygiene rules, but the infrastructure
guidance still contained a stale security model:

- `docs/infra/protection-layers.md` described forged provenance headers as the
  active limitation.
- `docs/infra/authenticated-origin-pulls.md` described AOP as an open setup
  path rather than unavailable on this architecture.
- `.cursor/skills/infomaniak-deployment/SKILL.md` and
  `.cursor/rules/security-awareness.mdc` repeated the old boundary model.
- `docs/onboarding/infrastructure.md` summarized the outdated limitation for
  newcomers.

## Structural gap

This is provider-boundary drift.

The failure mode is:

- a generic security model is written before provider behavior is known
- later evidence changes the model
- durable guidance keeps the old generic caveat
- future audits or agents reason from the wrong boundary

The correction is not to claim the provider boundary is universal. The
correction is to name the exact hosting path and the verification that supports
it.

## Proposed evolution

- Separate observation, verification, and inference when documenting provider
  security behavior.
- Treat provider support claims as provisional until a safe manual check can
  confirm the behavior.
- Record the verification result without recording sensitive runtime values.
- Preserve portable concepts, such as AOP/mTLS, while marking them unavailable
  when the current architecture cannot enforce them.
- Keep public repo descriptions free of origin IPs, private hostnames, deploy
  paths, account identifiers, support ticket identifiers, and transcript text.

## Research delta

The material research delta was provider-specific, not upstream product
changelog research.

Infomaniak support clarified that Apache sits behind HAProxy for this managed
Cloud Server hosting path and that non-Cloudflare requests have
`CF-Connecting-IP` stripped before Apache. A manual direct-to-origin request
with a forged header returned 403 Forbidden, confirming the active boundary on
this hosting path.

## Propagation decision

Update operational surfaces now.

The lesson changes how future infrastructure work should reason about this
workspace's origin boundary. It does not need an ADR because it does not choose
a new architecture. It corrects documented operational reality and prevents a
stale threat model from returning.

## Surfaces updated

- `docs/infra/protection-layers.md`
- `docs/infra/authenticated-origin-pulls.md`
- `docs/onboarding/infrastructure.md`
- `.cursor/skills/infomaniak-deployment/SKILL.md`
- `.cursor/rules/security-awareness.mdc`
- `.gitignore`
- `docs/guidance/evolution-records/2026-05-03-origin-boundary-provider-trace.md`

## Verification

Verified with:

- stale-claim search for forged `CF-Connecting-IP`, direct-origin bypass,
  Authenticated Origin Pulls, mTLS, `SSLVerifyClient`, and origin pull
- `.gitignore` inspection for certificate and key material patterns
- `security-awareness.mdc` inspection for removal of the old successful-forgery
  model
- `pnpm lint`
- `pnpm guidance:check`
- `pnpm license:check`
- `pnpm test`
- `pnpm run build`
- `git diff --check`

The runtime direct-origin check was performed manually by the operator without
committing or repeating the origin address in repo text.

## PR-visible learning trace

This branch preserves a provider-boundary correction.

The old docs treated direct-origin `CF-Connecting-IP` forgery as a successful
bypass risk and treated Authenticated Origin Pulls as a pending hardening path.
Provider clarification plus manual verification showed that, on this Infomaniak
HAProxy-to-Apache path, non-Cloudflare requests have the header stripped before
Apache and a forged-header direct-origin request returns 403.

The PR updates the affected infra docs, onboarding summary, Cursor skill, and
security rule so future work uses the verified boundary without publishing
private runtime values or generalizing the behavior to other hosting
architectures.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
