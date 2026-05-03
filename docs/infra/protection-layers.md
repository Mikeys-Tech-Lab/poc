# Protection Layers

How web traffic reaches each environment and what blocks unauthorized access
at each layer.

The deployment topology uses an Infomaniak managed Cloud Server behind
Cloudflare's proxy. Infomaniak places Apache behind HAProxy. Seed, preview,
and production are all backed by committed workflows in this repo. Production
uses manual dispatch rather than automatic release-triggered deployment.

## Shared baseline: direct-to-origin block

Every environment deploys an `.htaccess` file that rejects requests lacking
the `CF-Connecting-IP` header. Cloudflare sets this header on every proxied
request. Infomaniak support stated that non-Cloudflare requests have this
header stripped before Apache. A manual direct-to-origin request with a forged
`CF-Connecting-IP` header returned 403 Forbidden, confirming the boundary on
this hosting path.

```apache
RewriteEngine On
RewriteCond %{HTTP:CF-Connecting-IP} ^$
RewriteRule ^ - [F,L]
```

This baseline is generated during CI/CD and never committed to the repo.

### Why `CF-Connecting-IP` and not `REMOTE_ADDR`

Infomaniak enables `mod_remoteip`, which restores the real visitor IP into `REMOTE_ADDR`. This means `REMOTE_ADDR` is the visitor's IP, not a Cloudflare edge IP. Apache `Order`/`Allow`/`Deny` directives based on Cloudflare IP ranges will not work because the IPs have already been rewritten. The `CF-Connecting-IP` header is the reliable signal for "this request came through Cloudflare."

### Boundary

This direct-to-origin boundary depends on the Infomaniak hosting path:
Cloudflare proxy, then Infomaniak HAProxy, then Apache `.htaccess`. Do not
generalize it to hosting architectures where Apache receives direct traffic or
where upstream proxies do not strip forged provenance headers.

Cloudflare Authenticated Origin Pulls (mTLS) is not available on the current
hosting architecture because Apache is behind HAProxy and cannot directly
enforce TLS client certificate verification.

## Per-environment layers

### Seed (`seed.practiceofclarity.eu`)

| Layer | Mechanism |
|---|---|
| Edge | Cloudflare proxy (DNS proxied, orange cloud) |
| Origin baseline | `.htaccess` direct-to-origin block |
| Access control | `.htaccess` IP allowlist via `CF-Connecting-IP` |

Only requests from specific IPs (operator's static IPs) pass the allowlist. The allowed IPs are stored as a GitHub Actions secret and injected into `.htaccess` at deploy time. The IP allowlist uses `mod_rewrite` conditions:

```apache
RewriteCond %{HTTP:CF-Connecting-IP} !^<ESCAPED_IP_1>$
RewriteCond %{HTTP:CF-Connecting-IP} !^<ESCAPED_IP_2>$
RewriteRule ^ - [F,L]
```

Multiple `RewriteCond` lines are AND'd: the request is blocked unless the visitor IP matches at least one entry.

### Preview (`preview.practiceofclarity.eu`)

| Layer | Mechanism |
|---|---|
| Edge | Cloudflare proxy (DNS proxied, orange cloud) |
| Edge auth | Cloudflare Access (Zero Trust, email one-time PIN) |
| Origin baseline | `.htaccess` direct-to-origin block |

Cloudflare Access intercepts every request at the edge before it reaches the origin. Visitors must authenticate with an email address and one-time PIN. Only allowed email addresses (configured in Cloudflare Zero Trust) can pass.

No IP allowlist is needed. Cloudflare Access is the access control layer, and the baseline `.htaccess` ensures only Cloudflare-proxied traffic reaches the origin.

### Production (`practiceofclarity.eu`)

| Layer | Mechanism |
|---|---|
| Edge | Cloudflare proxy (DNS proxied, orange cloud) |
| Origin baseline | `.htaccess` direct-to-origin block |
| Access control | None (public site) |

Production is the public environment. The only protection is the baseline direct-to-origin block, ensuring traffic flows through Cloudflare for DDoS protection, caching, and SSL termination.

The production deploy workflow (`.github/workflows/deploy-production.yml`) is triggered by manual dispatch only. Seed and preview auto-deploy on every release to serve as validation layers; the operator explicitly promotes to production after verification.

## Traffic flow summary

```
Visitor → Cloudflare edge → (Access check, if configured) → Infomaniak HAProxy → Apache .htaccess → Site content
                                                                        ↑
                              Direct request (no Cloudflare) → header stripped → blocked by .htaccess
```

## HTTP security headers

Every environment's `.htaccess` includes a security header block generated during CI/CD. These instruct browsers to enforce protections against common attack vectors:

| Header | Purpose |
|---|---|
| `X-Content-Type-Options: nosniff` | Prevents MIME-type sniffing |
| `X-Frame-Options: DENY` | Blocks clickjacking via iframe embedding |
| `Referrer-Policy: strict-origin-when-cross-origin` | Limits URL leakage to third parties |
| `Permissions-Policy` | Disables unused browser APIs (geolocation, camera, etc.) |
| `X-Permitted-Cross-Domain-Policies: none` | Blocks Flash/PDF cross-domain policy files |
| `Cross-Origin-Opener-Policy: same-origin` | Isolates browsing context from cross-origin popups |
| `Cross-Origin-Resource-Policy: same-origin` | Prevents cross-origin resource reads |
| `Content-Security-Policy-Report-Only` | CSP in observation mode (not yet enforcing) |

CSP starts in report-only mode to avoid breaking Starlight's inline styles. Violations appear in the browser console. Once the policy is verified clean, it will be promoted to enforcing `Content-Security-Policy`.

`Strict-Transport-Security` (HSTS) is omitted from `.htaccess` because Cloudflare injects it at the edge.

## Post-deploy security scanning

The `security-scan-live.yml` workflow runs [Nuclei](https://github.com/projectdiscovery/nuclei) against deployed environments to verify HTTP security headers are present and correctly configured. It triggers automatically after seed and preview deployments and supports manual dispatch for scanning any URL, including a production URL if one exists.

Results appear in the workflow run logs. SARIF upload to the GitHub Security tab is currently disabled in this repo setup.

## SSL

Cloudflare terminates SSL at the edge. The connection between Cloudflare and the origin uses Cloudflare's "Full (strict)" mode with the Infomaniak SSL certificate, maintaining end-to-end encryption.

## Future improvements

- **Enforce Content-Security-Policy**: promote CSP from report-only to enforcing after verifying no violations on the live site.
- **Provider-managed origin firewall rules**: if Infomaniak supports it for
  default web ports, restrict HTTP(S) ingress to Cloudflare's published IP
  ranges as another network-level layer.
- **Authenticated Origin Pulls on another architecture**: revisit Cloudflare
  Authenticated Origin Pulls only if the hosting path changes to one where the
  origin server can enforce client certificate verification.

## Maintenance page assets

When an environment is parked (not yet deployed or intentionally offline), Infomaniak's built-in maintenance mode is used. Assets for the maintenance page are stored in `docs/infra/assets/`:

| File | Description |
|---|---|
| `maintenance-bg.png` | Blurred landing background with Catppuccin Frappe tint |
| `maintenance-logo.png` | Hero image scaled to 128px for the logo slot |

These are generated from the site's source assets (`apps/site/src/assets/`) and uploaded manually to Infomaniak's maintenance editor.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
