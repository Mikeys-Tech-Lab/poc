---
name: infomaniak-deployment
description: Guides deployment to Infomaniak managed Cloud Server. Use when configuring, deploying, or troubleshooting CI/CD workflows targeting Infomaniak hosting environments. Covers SSH access, rsync deployment, IP restriction, and GitHub Actions integration.
---

# Infomaniak Deployment

Adaptation of `AGENTS.md` for Infomaniak managed hosting deployment.

## When to use

- Setting up or modifying GitHub Actions deployment workflows
- Configuring Infomaniak hosting environments (SSH, paths, domains)
- Managing IP-based access restrictions for non-public environments
- Troubleshooting deployment failures
- Adding or changing deployment targets (for example, introducing a public workflow)

## Capability alignment

Before relying on any deployment command or Infomaniak feature:

1. Verify SSH connectivity to the target host before automating.
2. Confirm rsync is available on both sides (`which rsync` on the server).
3. Test `.htaccess` behavior on the target server (Apache 2.4 vs. LiteSpeed directives differ).
4. If not checkable, produce a manual checklist and mark the result unknown.

## Hosting architecture

The workspace deploys to an Infomaniak managed Cloud Server with multiple web hostings:

| Web hosting | Environment | Domain | Access |
|---|---|---|---|
| Seed | dev | `seed.practiceofclarity.eu` | IP-restricted (`.htaccess` allowlist) |
| Preview | preview | `preview.practiceofclarity.eu` | Cloudflare Access (email OTP) |
| Public | production | `practiceofclarity.eu` | Open (when active) |

Each web hosting has its own document root, FTP/SSH credentials, and domain binding. Credentials are managed per-hosting in the Infomaniak Manager.

### Server details

- Cloud Server type: Managed
- Connection details, IPs, and credentials are in GitHub secrets for CI/CD and `.local/config.md` for local use. Never hardcode them in committed files.

## Deployment method

All environments deploy via **rsync over SSH**:

1. GitHub Actions builds the Astro site (`pnpm run build`)
2. Access restrictions are generated (`.htaccess` for IP allowlisting)
3. rsync transfers `apps/site/dist/` to the server document root
4. `--delete` flag ensures clean deployments (removes stale files)

No third-party deployment actions are used. Direct `ssh`/`rsync` commands reduce supply chain risk for this public repo.

## Environment strategy

| Environment | Trigger | Access control | Status |
|---|---|---|---|
| Development | `release: published` + manual dispatch | `.htaccess` IP allowlist | Active |
| Preview | `release: published` + manual dispatch | Cloudflare Access (email OTP) | Active |
| Public | No committed workflow in current repo | None (public) | Planned topology |

Each environment uses a **GitHub environment** for isolated secrets and variables.

## Defense-in-depth layering

All environments share a baseline: `.htaccess` blocks requests without `CF-Connecting-IP` (direct-to-origin bypass). Each environment adds its own access control layer:

- **Seed**: baseline + IP allowlist. Only requests from allowed IPs (via `CF-Connecting-IP` header) are permitted.
- **Preview**: baseline + Cloudflare Access. All traffic must go through Cloudflare, where Zero Trust enforces email-based authentication (one-time PIN). No IP allowlist needed.
- **Production**: baseline only when active. Public site, no additional auth. Do not assume a committed production workflow exists unless you verify it in `.github/workflows/`.

The baseline `.htaccess` rule:

```apache
RewriteEngine On
RewriteCond %{HTTP:CF-Connecting-IP} ^$
RewriteRule ^ - [F,L]
```

This blocks requests that bypass Cloudflare (hitting the origin IP directly), since they lack the `CF-Connecting-IP` header.

## Cloudflare

All domains are behind Cloudflare. This affects IP restriction and SSL.

### Impact on IP restriction

Cloudflare proxies all HTTP(S) traffic. Infomaniak has `mod_remoteip` configured, which restores the real visitor IP into `REMOTE_ADDR`. This means `Order`/`Allow`/`Deny` directives against Cloudflare IP ranges will fail because `REMOTE_ADDR` is no longer a Cloudflare IP. Use only `mod_rewrite` with the `CF-Connecting-IP` header for IP restriction.

### Impact on SSL

Cloudflare terminates SSL at the edge. The connection between Cloudflare and the origin server should use Cloudflare's "Full (strict)" mode to maintain end-to-end encryption with the Infomaniak SSL certificate.

### Direct server access

Requests that bypass Cloudflare (hitting the server IP directly) will not have the `CF-Connecting-IP` header. The `.htaccess` rewrite rules block these requests because the empty header does not match any allowed IP.

## IP restriction strategy

Non-public environments restrict web access via `.htaccess` using Cloudflare-aware rewrite rules:

```apache
RewriteEngine On

# Block direct-to-origin (no CF-Connecting-IP = not through Cloudflare)
RewriteCond %{HTTP:CF-Connecting-IP} ^$
RewriteRule ^ - [F,L]

# Allow only specific visitor IPs
RewriteCond %{HTTP:CF-Connecting-IP} !^1\.2\.3\.4$
RewriteCond %{HTTP:CF-Connecting-IP} !^5\.6\.7\.8$
RewriteRule ^ - [F,L]
```

Two rules: the first blocks requests without the `CF-Connecting-IP` header (direct-to-origin bypass attempts). The second blocks requests where the header doesn't match any allowed IP. Multiple `RewriteCond` lines are AND'd: the request is blocked unless the visitor IP matches at least one entry.

The `.htaccess` file is **generated during CI/CD** from the `ALLOWED_IPS` secret (comma-separated). It is never committed to the repo.

If `ALLOWED_IPS` is not set, the deployment fails safely rather than leaving the site open.

### Constraints

- `.htaccess` only restricts HTTP(S) access, not SSH.
- The `CF-Connecting-IP` header is set by Cloudflare and cannot be spoofed through the proxy. However, direct-to-origin requests could forge the header. For stronger protection, restrict origin firewall to Cloudflare IP ranges only.
- SSH deployment bypasses Cloudflare entirely (connects to server IP on port 22).

## Site URL configuration

`apps/site/astro.config.mjs` reads `SITE_URL` from the environment:

```js
site: process.env.SITE_URL || "https://practiceofclarity.eu"
```

Each GitHub environment sets `SITE_URL` as a **variable** (not a secret, since URLs are not sensitive):

| Environment | SITE_URL |
|---|---|
| development | Set via `DEVELOPMENT_SITE_URL` variable |
| preview | Set via `PREVIEW_SITE_URL` variable |
| production | Verify current workflow/setup before assuming a value is wired |

## GitHub configuration

### Required secrets

Secret names are prefixed with the environment name (`DEVELOPMENT_`, `PREVIEW_`, `PUBLIC_`) to avoid collisions across deployment targets.

| Secret | Description | Example |
|---|---|---|
| `<ENV>_SSH_PRIVATE_KEY` | Ed25519 private key (no passphrase) | — |
| `<ENV>_SSH_HOST` | Infomaniak SSH hostname | — |
| `<ENV>_SSH_USER` | FTP/SSH username from Infomaniak Manager | — |
| `<ENV>_SSH_PORT` | SSH port (omit to default to 22) | — |
| `<ENV>_DEPLOY_PATH` | Server document root, must end with `/` | — |
| `<ENV>_ALLOWED_IPS` | Comma-separated allowed IPs (omit for public) | — |

### Required variables

| Variable | Description |
|---|---|
| `<ENV>_SITE_URL` | Canonical site URL for Astro build |

### GitHub environment setup

Create a GitHub environment matching the workflow's `environment:` field. Configure secrets and variables per environment in the repo settings.

## SSH setup procedure

See `docs/infra/infomaniak-environment-setup.md` for the full step-by-step runbook.

Key constraints:

- **Algorithm**: ed25519 (RSA keys are refused by Infomaniak)
- **Passphrase**: none (automation requires non-interactive auth)
- **Permissions**: `authorized_keys` chmod 600, `.ssh` directory chmod 700
- **Security**: generate keys locally, copy private key to GitHub secrets from your own terminal, never through AI chat or shared tools

## Workflow reference

| Environment | Workflow file | Trigger |
|---|---|---|
| Development | `.github/workflows/deploy-dev.yml` | `release: published`, manual dispatch |
| Preview | `.github/workflows/deploy-preview.yml` | `release: published`, manual dispatch |
| Public | No committed workflow in current repo | Verify before assuming automation |

## Manual deployment

If CI/CD is unavailable, deploy manually. Read values from `.local/config.md`:

```bash
cd /path/to/poc
SITE_URL=<SITE_URL> pnpm run build

cat > apps/site/dist/.htaccess <<'EOF'
RewriteEngine On
RewriteCond %{HTTP:CF-Connecting-IP} !^<YOUR_IP_ESCAPED>$
RewriteRule ^ - [F,L]
EOF

rsync -avz --delete \
  -e "ssh -i <KEY_PATH> -p <PORT>" \
  apps/site/dist/ \
  <USER>@<HOST>:<DEPLOY_PATH>
```

Escape dots in IPs for the regex (e.g. `89\.36\.76\.75`). For public environments, omit the `.htaccess` generation.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `Permission denied (publickey)` | Wrong key type or permissions | Use ed25519, check chmod 600/700 |
| `Host key verification failed` | First connection or changed host key | Run `ssh-keyscan` manually, verify fingerprint |
| 403 after deployment | `.htaccess` blocking your IP | Check `ALLOWED_IPS` includes your current IP |
| Site shows old content | rsync didn't transfer changes | Verify `DEPLOY_PATH` is correct, `ls` on server |
| Build uses wrong URL | `SITE_URL` not set in environment | Set `SITE_URL` variable in GitHub environment |
| `ALLOWED_IPS` error in workflow | Secret not set or empty | Add secret to the GitHub environment |

## Extending to additional environments

To add a new deployment target, or to add the currently absent Public workflow:

1. Create a new workflow file for the missing target.
2. Create the corresponding GitHub environment with its own secrets and variables.
3. Set the appropriate trigger (push, manual, or both).
4. For Public: omit the IP allowlist generation step, but keep the direct-to-origin block and security headers.
5. Update this skill with the new environment details.
6. Update `docs/architecture/workspace.md` to reflect the new deployment target.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/infomaniak-deployment/SKILL.md
