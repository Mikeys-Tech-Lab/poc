# Onboarding Topic Index

This directory contains onboarding documentation for the Practice of Clarity workspace.

AI agents read this file to discover topics dynamically. Human readers can follow the same index directly or read `manual.md` for a guided walkthrough.

## How to use this index

Each entry below describes one onboarding topic. Agents parse the entries to build a menu. Human readers can follow the paths directly.

**No-duplication rule.** Onboarding pages summarize and link to deep docs. They do not duplicate procedures, invariants, or configuration that lives elsewhere. If an onboarding page must include steps, it links to a specific section in the authoritative doc. If no deep doc exists yet, the onboarding page is the temporary home, but the content must be promoted before it grows.

## Topics

### local-setup

- **Title:** Local setup
- **Path:** `docs/onboarding/local-setup.md`
- **When to use:** First time cloning the repo or setting up a new machine
- **Prereqs:** none

### ai-guidance

- **Title:** AI guidance architecture
- **Path:** `docs/onboarding/ai-guidance.md`
- **When to use:** Understanding how AI agents are guided in this workspace and why
- **Prereqs:** none

### workspace-overview

- **Title:** Workspace overview
- **Path:** `docs/onboarding/workspace-overview.md`
- **When to use:** Understanding what lives where and how pieces relate
- **Prereqs:** none

### security

- **Title:** Security and public repo hygiene
- **Path:** `docs/onboarding/security.md`
- **When to use:** Handling secrets, writing public-facing text, understanding what is safe to commit
- **Prereqs:** none

### infrastructure

- **Title:** Infrastructure and environments
- **Path:** `docs/onboarding/infrastructure.md`
- **When to use:** Understanding the deployment environments, protection layers, and what is intentionally not described here
- **Prereqs:** security

### contributing

- **Title:** Contributing
- **Path:** `docs/onboarding/contributing.md`
- **When to use:** Making changes, opening PRs, understanding the workflow
- **Prereqs:** local-setup

### manual

- **Title:** Manual onboarding (non-AI path)
- **Path:** `docs/onboarding/manual.md`
- **When to use:** Onboarding without an AI-assisted editor
- **Prereqs:** none
