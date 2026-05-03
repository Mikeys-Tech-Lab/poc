# Authenticated Origin Pulls (mTLS)

Status of Cloudflare Authenticated Origin Pulls for this workspace.

## Current status

Authenticated Origin Pulls is not available on the current Infomaniak managed
Cloud Server hosting path.

Infomaniak support stated that Apache is behind HAProxy, so Apache cannot be
used directly for TLS client certificate verification. The required
`SSLVerifyClient` configuration would need to run where the TLS handshake is
handled, before requests reach Apache and `.htaccess`.

The current direct-to-origin boundary is therefore the `.htaccess` baseline
described in [`docs/infra/protection-layers.md`](protection-layers.md).
Infomaniak support stated that non-Cloudflare requests have
`CF-Connecting-IP` stripped before Apache. A manual direct-to-origin request
with a forged `CF-Connecting-IP` header returned 403 Forbidden, confirming
that boundary on this hosting path.

This conclusion is specific to this Infomaniak architecture. It does not
generalize to hosting environments where Apache, NGINX, or another origin
server receives TLS traffic directly.

## Why AOP still matters conceptually

Authenticated Origin Pulls (AOP) adds client certificate verification to the
TLS handshake between Cloudflare and the origin. Without a valid Cloudflare
client certificate, the TLS connection fails before any HTTP headers are
exchanged.

## How it works

Cloudflare presents a client certificate during the TLS handshake with the origin. The origin's web server validates this certificate against a known CA certificate. If validation fails, the connection is rejected at the TLS layer.

This is mutual TLS (mTLS): both sides authenticate. Cloudflare already validates the origin's server certificate (Full strict mode). AOP adds the reverse direction.

## Prerequisite

SSL/TLS encryption mode must be **Full** or **Full (strict)**. AOP is not compatible with Off or Flexible modes. The workspace already uses Full (strict).

## Reference setup on compatible architectures

This is not a procedure for the current Infomaniak hosting path. It records
what AOP requires when the origin server can enforce client certificate
verification.

### Cloudflare dashboard

- Go to **SSL/TLS > Origin Server** in the Cloudflare dashboard for the zone
- Enable **Authenticated Origin Pulls**
- Download the Cloudflare CA certificate from [developers.cloudflare.com](https://developers.cloudflare.com/ssl/static/authenticated_origin_pull_ca.pem)

### Origin server (Apache)

The following directives must be set in the **SSL virtual host configuration** (not `.htaccess`):

```apache
SSLVerifyClient require
SSLCACertificateFile /path/to/authenticated_origin_pull_ca.pem
```

These directives are server/virtual-host level only. They cannot be placed in `.htaccess` because TLS client authentication is negotiated before Apache processes `.htaccess` files.

### Infomaniak constraint

On the current Infomaniak managed Cloud Server path, this feature is not just
missing from the standard control panel. Apache is behind HAProxy, so Apache
cannot directly enforce TLS client certificate verification for inbound
requests.

Authenticated Origin Pulls should remain disabled unless Infomaniak provides an
origin-side enforcement point that validates Cloudflare client certificates
before traffic reaches Apache.

### Verification on this hosting path

- [x] Infomaniak support stated that Apache is behind HAProxy and that
  non-Cloudflare requests have `CF-Connecting-IP` stripped before Apache.
- [x] A manual direct-to-origin request with a forged `CF-Connecting-IP`
  header returned 403 Forbidden.
- [x] Normal requests through Cloudflare continue to use the existing
  environment-specific access layers.

## Certificate scope

The Cloudflare-provided CA certificate is shared across all Cloudflare customers. It proves the request came from the Cloudflare network, not that it came from your specific account. For stricter isolation (or FIPS compliance), a custom client certificate can be uploaded via the Cloudflare API instead.

For this workspace, this remains background context only. AOP is not active on
the current hosting architecture.

## Relationship to existing protections

AOP does not replace the `.htaccess` rules on architectures where both are
available. The layers serve different purposes:

| Layer | Protects against |
|---|---|
| `.htaccess` CF-Connecting-IP check on this Infomaniak path | HTTP-level direct access after HAProxy strips forged provenance headers |
| Authenticated Origin Pulls (mTLS) on compatible architectures | TLS-level direct access before HTTP headers are exchanged |
| IP allowlist (seed only) | Restricts which visitor IPs can access the environment |
| Cloudflare Access (preview only) | Authenticates visitors at the edge |

The active workspace boundary is documented in
[`docs/infra/protection-layers.md`](protection-layers.md).

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
