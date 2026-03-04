# Security and Public Repo Hygiene

This is a public repository. Everything committed is world-readable and permanently archived. This page covers what you need to know to work safely.

## The core rule

No secrets, IPs, internal hostnames, client IDs, key filenames, or infrastructure paths in committed files. The same rule applies to PR descriptions, commit messages, issue bodies, and review comments.

Use generic references instead of actual values:
- "origin server" not the IP address
- "deploy path updated" not the path value
- "SSH key rotated" not the key filename

## Where sensitive values live

| What | Where | Accessible to |
|---|---|---|
| Operator-specific config | `.local/config.md` (gitignored) | Local machine only |
| CI/CD credentials | GitHub Secrets (per environment) | GitHub Actions runners |
| Infrastructure details | GitHub Variables (per environment) | GitHub Actions runners |

The template at `.local.example.md` shows the structure without real values.

## Secrets in AI chat

AI chat sessions transit external infrastructure and persist in local transcripts. Neither channel is private.

- Never display, `cat`, echo, or pipe private keys, tokens, or credentials through AI tool calls.
- If you need to use a secret, run the command in your own terminal. Do not ask the AI to capture the output.
- If a secret is accidentally exposed in chat, treat it as compromised and rotate it.

Full details: [`AGENTS.md` § Secret handling in AI chat](../../AGENTS.md)

## Before creating a PR

Scan your PR description for:
- IP addresses (except well-known public examples like `1.2.3.4`)
- Internal paths (`/home/`, `/sites/`, deploy paths)
- SSH hostnames, usernames, or key filenames
- Client IDs or long hex identifiers (except git commit SHAs)

If any appear, replace with generic references before posting.

## CI security scanning

Four automated scans run on every PR and push to `main`:

| Workflow | What it checks |
|---|---|
| Secret scan (gitleaks) | Accidentally committed secrets, tokens, credentials |
| Dependency audit (Shai-Hulud) | Compromised npm packages from known supply chain attacks |
| Code analysis (CodeQL) | Static analysis for security vulnerabilities in JS/TS |
| OSSF Scorecard | Supply chain security posture scoring |

These are not optional. They run automatically and block merging if they find issues.

A fifth scan (Nuclei) runs after each deployment to verify HTTP security headers on the live site. Results appear in the workflow run logs. SARIF upload to the Security tab will be enabled when the repository goes public.

## Supply chain posture

- GitHub Actions are pinned to major version tags. Dependabot monitors for updates.
- No third-party deployment actions. Direct `ssh`/`rsync` reduces supply chain surface.
- gitleaks uses the MIT-licensed CLI directly to avoid commercial licensing constraints.

Full security posture: [`AGENTS.md` § Security posture](../../AGENTS.md)
