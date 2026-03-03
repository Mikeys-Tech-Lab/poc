# Protection Layers

How web traffic reaches each environment and what blocks unauthorized access at each layer.

All environments are hosted on an Infomaniak managed Cloud Server behind Cloudflare's proxy. No environment is directly accessible from the public internet by design.

## Shared baseline: direct-to-origin block

Every environment deploys an `.htaccess` file that rejects requests lacking the `CF-Connecting-IP` header. Cloudflare sets this header on every proxied request. If someone discovers the origin server IP and hits it directly, the header is absent and Apache returns 403 Forbidden.

```apache
RewriteEngine On
RewriteCond %{HTTP:CF-Connecting-IP} ^$
RewriteRule ^ - [F,L]
```

This baseline is generated during CI/CD and never committed to the repo.

### Why `CF-Connecting-IP` and not `REMOTE_ADDR`

Infomaniak enables `mod_remoteip`, which restores the real visitor IP into `REMOTE_ADDR`. This means `REMOTE_ADDR` is the visitor's IP, not a Cloudflare edge IP. Apache `Order`/`Allow`/`Deny` directives based on Cloudflare IP ranges will not work because the IPs have already been rewritten. The `CF-Connecting-IP` header is the reliable signal for "this request came through Cloudflare."

### Limitation

A direct-to-origin request could forge the `CF-Connecting-IP` header since Apache does not validate its source. For stronger protection, Cloudflare Authenticated Origin Pulls (mTLS) can be added. This is not yet configured.

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

Production is a public site. The only protection is the baseline direct-to-origin block, ensuring all traffic flows through Cloudflare for DDoS protection, caching, and SSL termination.

Deployment is `workflow_dispatch` only (manual trigger). The operator validates a release on preview before deploying to production.

## Traffic flow summary

```
Visitor → Cloudflare edge → (Access check, if configured) → Origin server → .htaccess check → Site content
                                                              ↑
                              Direct request (no Cloudflare) → blocked by .htaccess (no CF-Connecting-IP)
```

## SSL

Cloudflare terminates SSL at the edge. The connection between Cloudflare and the origin uses Cloudflare's "Full (strict)" mode with the Infomaniak SSL certificate, maintaining end-to-end encryption.

## Future improvements

- **Cloudflare Authenticated Origin Pulls (mTLS)**: validates at the TLS layer that the connection comes from Cloudflare, eliminating the header-forgery limitation
- **Origin firewall rules**: restrict the server's firewall to only accept connections from Cloudflare IP ranges on ports 80/443

## Maintenance page assets

When an environment is parked (not yet deployed or intentionally offline), Infomaniak's built-in maintenance mode is used. Assets for the maintenance page are stored in `docs/infra/assets/`:

| File | Description |
|---|---|
| `maintenance-bg.png` | Blurred landing background with Catppuccin Frappe tint |
| `maintenance-logo.png` | Hero image scaled to 128px for the logo slot |

These are generated from the site's source assets (`apps/site/src/assets/`) and uploaded manually to Infomaniak's maintenance editor.
