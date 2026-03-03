# Infrastructure and Environments

A high-level view of the deployment environments and their protection model. This page describes what exists and what each environment is for. Procedures for setting up environments are in the runbooks linked below.

## Environment model

Three environments share an origin hosting server behind a CDN/proxy layer. Each environment has its own domain, access controls, and deployment trigger.

| Environment | Purpose | Deployment trigger | Access |
|---|---|---|---|
| Seed | Development — operator-only, for verifying changes in a live environment | Published release (automatic) | Restricted to specific IPs |
| Preview | Stakeholder review — authenticated access for reviewing before production | Published release (automatic) | Email-based authentication at the edge |
| Production | Public site | Manual dispatch only | Public |

Seed and preview deploy automatically when a release is published. Production requires the operator to validate on preview first, then manually trigger the deploy.

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
- `.local/config.md` (gitignored) — operator-specific connection details
- GitHub Secrets — CI/CD credentials

### Known limitations

The origin baseline checks a request header to verify CDN provenance. A direct-to-origin request could forge this header. Stronger protections (mutual TLS between CDN and origin, origin firewall restricting to CDN IP ranges) are noted as future improvements in the protection layers doc.

## Release and deployment flow

```
Feature PR → main (squash merge)
  → Release Please creates version bump PR (auto-merges)
    → GitHub Release published
      → Seed deploys automatically
      → Preview deploys automatically
        → Operator validates on preview
          → Operator triggers production deploy manually
```

This ensures every deployment corresponds to a tagged release, and production changes are always validated on preview first.

## Runbook reference

| Document | What it covers |
|---|---|
| [`docs/infra/protection-layers.md`](../infra/protection-layers.md) | Full protection layer architecture per environment |
| [`docs/infra/infomaniak-environment-setup.md`](../infra/infomaniak-environment-setup.md) | Step-by-step environment provisioning |
| [`docs/infra/github-app-release-setup.md`](../infra/github-app-release-setup.md) | Release automation GitHub App setup |
