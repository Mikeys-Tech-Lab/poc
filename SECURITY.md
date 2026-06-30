<!--
Licensed under CC BY 4.0 (authored content): https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0
Repository code and tooling: MIT — https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE
© 2026 Mikey Sebastian Drozd
-->

# Security Policy

This is a public, single-maintainer repository. It hosts the Practice of Clarity proof-of-concept site, its agent guidance, and its tooling.

## Reporting a vulnerability

Report suspected vulnerabilities through GitHub private vulnerability reporting.

1. Open the repository **Security** tab.
2. Select **Report a vulnerability**.
3. Describe the issue, the affected surface, and a reproduction path if you have one.

This keeps the report private until a fix is ready. Do not open a public issue for a security problem, and do not include secrets, tokens, or live infrastructure values in the report.

## Scope

In scope:

- The repository source, workflows, and tooling.
- The deployed practice site built from this repository.

Out of scope:

- Findings that require already-compromised maintainer credentials.
- Volumetric denial-of-service testing against deployed environments.
- Reports about third-party dependencies that already have an upstream advisory. Those are tracked through Dependabot and Renovate.

## Supported versions

Only the current `main` line is supported. There are no long-lived release branches to backport to.

## How fixes flow

- Dependency and supply-chain advisories are handled by Dependabot alerting and Renovate fix pull requests. See `docs/guidance/dependency-update-operations.md`.
- Repository and deployment hygiene rules are documented in `docs/onboarding/security.md` and `docs/infra/protection-layers.md`.
- CI security scanning (secret detection, supply-chain checks, static analysis, posture scoring, and deployed-header checks) runs on pull requests, pushes to `main`, and after deployments.

## Coordinated disclosure

Please give a reasonable window for a fix before any public disclosure. This is a small project, so response is best effort rather than bound to a fixed service-level agreement.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
