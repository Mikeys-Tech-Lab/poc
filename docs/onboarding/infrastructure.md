# Infrastructure and Environments

A high-level view of the deployment topology and current workflow coverage. This page distinguishes between environments the architecture accounts for and automation that is actually committed in the repo. Procedures for setting up environments are in the runbooks linked below.

## Environment model

The deployment topology accounts for three environments behind a shared origin hosting server and CDN/proxy layer. Seed, preview, and production are all backed by committed workflows in this repo, but production remains a manual-dispatch path rather than a release-triggered deploy.

| Environment | Purpose | Deployment trigger | Access |
|---|---|---|---|
| Seed | Development — operator-only, for verifying changes in a live environment | Published release (automatic) | Restricted to specific IPs |
| Preview | Stakeholder review — authenticated access for reviewing before production | Published release (automatic) | Email-based authentication at the edge |
| Production | Intended public site | Manual dispatch via committed workflow | Public when active |

Seed and preview deploy automatically when a release is published. Production remains part of the documented topology and has a committed manual-dispatch workflow in this repo.

## Protection layers

All environments use a layered protection model. No single layer is the sole access control boundary. The layers are:

1. **CDN/proxy** — all DNS records are proxied. Traffic flows through the CDN before reaching the origin.
2. **Edge authentication** (where configured) — the CDN provider can enforce authentication before requests reach the origin.
3. **Origin baseline** — the origin server rejects requests that did not come through the CDN. This is enforced via server configuration generated at deploy time, never committed to the repo.
4. **Per-environment access control** — additional restrictions layered on top of the baseline (IP allowlisting, email-based auth, or none for public).

This is intentionally described at the mechanism level, not the product level. The specific providers and configuration details are in the deep docs.

### What is intentionally not described here

- Server IPs, hostnames, or connection details
- Specific CDN or hosting provider configuration steps
- SSH credentials or key management procedures
- Exact `.htaccess` rules or firewall configurations

These details live in:
- [`docs/infra/protection-layers.md`](../infra/protection-layers.md) — the full protection layer architecture
- [`docs/infra/infomaniak-environment-setup.md`](../infra/infomaniak-environment-setup.md) — environment setup runbook
- `.local/config.md` (gitignored) — operator-specific local notes and connection details, not a normal agent input
- GitHub Secrets — CI/CD credentials

### Known limitations

The origin baseline is hosting-path specific. In this workspace, Infomaniak
places Apache behind HAProxy. Infomaniak support stated that non-CDN requests
have the provenance header stripped before Apache, and a manual direct-to-origin
request with a forged header returned 403 Forbidden.

This should not be generalized to every hosting provider. On architectures
where the origin receives direct traffic without upstream header stripping,
mutual TLS or network-level origin firewall rules may still be required.

If an AI agent needs a runtime fact during infrastructure work, disclose only the minimum required non-sensitive value or run the command locally and relay the result.

## Release and deployment flow

```
Feature PR → main (squash merge)
  → Release Please creates version bump PR (auto-merges)
    → GitHub Release published
      → Seed deploys automatically
      → Preview deploys automatically
        → Operator validates on preview
          → Optional operator-run production step (manual dispatch in this repo)
```

This ensures every automated deployment in the repo corresponds to a tagged release. If production deployment is used, it should still be validated on preview first.

One boundary matters here. Release Please parses the squash-merge commit title
that lands on `main`, not the branch commits in isolation. In practice, PR
titles need to use Conventional Commit format unless the merge title is edited
deliberately at merge time.

## Runbook reference

| Document | What it covers |
|---|---|
| [`docs/infra/protection-layers.md`](../infra/protection-layers.md) | Full protection layer architecture per environment |
| [`docs/infra/infomaniak-environment-setup.md`](../infra/infomaniak-environment-setup.md) | Step-by-step environment provisioning |
| [`docs/infra/github-app-release-setup.md`](../infra/github-app-release-setup.md) | Release automation GitHub App setup |
| [`docs/infra/renovate-app-setup.md`](../infra/renovate-app-setup.md) | Renovate GitHub App setup and dependency automation enablement |

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
