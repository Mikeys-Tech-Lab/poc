# Authenticated Origin Pulls (mTLS)

How to verify at the TLS layer that connections to the origin server come from Cloudflare, closing the `CF-Connecting-IP` header forgery gap.

## Why this matters

The current `.htaccess` protection checks for the `CF-Connecting-IP` header to block direct-to-origin requests. This header can be forged: an attacker who discovers the origin IP can send a request with a fake `CF-Connecting-IP` header and bypass the check.

Authenticated Origin Pulls (AOP) adds client certificate verification to the TLS handshake between Cloudflare and the origin. Without a valid Cloudflare client certificate, the TLS connection fails before any HTTP headers are exchanged. This eliminates the forgery gap.

## How it works

Cloudflare presents a client certificate during the TLS handshake with the origin. The origin's web server validates this certificate against a known CA certificate. If validation fails, the connection is rejected at the TLS layer.

This is mutual TLS (mTLS): both sides authenticate. Cloudflare already validates the origin's server certificate (Full strict mode). AOP adds the reverse direction.

## Prerequisite

SSL/TLS encryption mode must be **Full** or **Full (strict)**. AOP is not compatible with Off or Flexible modes. The workspace already uses Full (strict).

## Setup checklist

### Cloudflare dashboard

- [ ] Go to **SSL/TLS > Origin Server** in the Cloudflare dashboard for the zone
- [ ] Enable **Authenticated Origin Pulls**
- [ ] Download the Cloudflare CA certificate from [developers.cloudflare.com](https://developers.cloudflare.com/ssl/static/authenticated_origin_pull_ca.pem)

### Origin server (Apache)

The following directives must be set in the **SSL virtual host configuration** (not `.htaccess`):

```apache
SSLVerifyClient require
SSLCACertificateFile /path/to/authenticated_origin_pull_ca.pem
```

These directives are server/virtual-host level only. They cannot be placed in `.htaccess` because TLS client authentication is negotiated before Apache processes `.htaccess` files.

### Infomaniak constraint

On Infomaniak managed Cloud Server, direct access to `httpd.conf` or virtual host configuration may not be available through the standard control panel. Options:

- [ ] Check the Infomaniak admin panel for SSL/TLS client certificate settings
- [ ] Contact Infomaniak support to request `SSLVerifyClient` configuration for the relevant web hosting(s)
- [ ] If neither is available, this feature cannot be enabled on the current hosting plan

This step must be investigated before proceeding. If Infomaniak does not support it, the `.htaccess` header check remains the primary defense and the origin IP must be kept confidential.

### Verification

After enabling on both sides:

- [ ] Send a direct HTTPS request to the origin IP (bypassing Cloudflare). It should fail with a TLS handshake error.
- [ ] Send a request through Cloudflare (normal domain). It should succeed.
- [ ] Confirm that the existing `.htaccess` rules still work (defense in depth — both layers active).

## Certificate scope

The Cloudflare-provided CA certificate is shared across all Cloudflare customers. It proves the request came from the Cloudflare network, not that it came from your specific account. For stricter isolation (or FIPS compliance), a custom client certificate can be uploaded via the Cloudflare API instead.

For this workspace, the shared certificate is sufficient. The primary threat is direct-to-origin access from outside Cloudflare, not cross-customer attacks within Cloudflare's network.

## Relationship to existing protections

AOP does not replace the `.htaccess` rules. Both layers serve different purposes:

| Layer | Protects against |
|---|---|
| `.htaccess` CF-Connecting-IP check | HTTP-level direct access (forgeable but catches naive probes) |
| Authenticated Origin Pulls (mTLS) | TLS-level direct access (not forgeable, stops connections before HTTP) |
| IP allowlist (seed only) | Restricts which visitor IPs can access the environment |
| Cloudflare Access (preview only) | Authenticates visitors at the edge |

All layers remain active simultaneously. Defense in depth.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
