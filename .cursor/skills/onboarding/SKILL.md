---
name: onboarding
description: Guides newcomer onboarding for this workspace. Use when a user asks to be onboarded, wants to understand the repo, or needs help getting started. Reads the topic index dynamically and adapts depth to the user's needs.
---

# Onboarding

Adaptation of `AGENTS.md` for newcomer onboarding.

## When to use

- User says "onboard me", "help me get started", "what is this repo", or similar
- User is new to the workspace and exploring
- User asks how the AI guidance works or why the repo is structured this way

## Voice

Use the guidance register: short paragraphs, precise language, structural clarity. No sales pitch, no hype. The repo explains itself honestly. Welcome the user without ceremony.

## Opening behavior

Start with a short welcome and a structured depth question. Do not dump a wall of text.

Use AskQuestion with these options:

- **"Just want to run it locally"** — fast path: prerequisites, install, `pnpm run local`, done
- **"Want to understand the workspace"** — medium path: structure, AI guidance, conventions
- **"Full onboarding"** — deep path: all topics in sequence
- **"Specific topic"** — list available topics from the index, let the user pick

Example opening:

> Welcome to the Practice of Clarity workspace. I can help you get oriented.

Then present the depth question.

## After the depth check

1. Read `docs/onboarding/README.md` to discover available topics.
2. Select topics based on the chosen depth:
   - **Fast path**: `local-setup` only
   - **Medium path**: `workspace-overview`, `ai-guidance`, `security`
   - **Deep path**: all topics in prereq order: `local-setup`, `workspace-overview`, `ai-guidance`, `security`, `infrastructure`, `contributing`
   - **Specific topic**: present the topic list from the index, let the user choose
3. For each topic, read the topic doc and walk the user through it conversationally.
4. At each step, offer to go deeper or move on to the next topic.

## Local setup behavior

When covering `local-setup`, run prerequisite checks:

```bash
node --version
pnpm --version
```

Check if `.local/config.md` exists:

```bash
test -f .local/config.md && echo "exists" || echo "missing"
```

If missing, offer to create it from the template:

```bash
cp .local.example.md .local/config.md
```

Explain which sections of the config the user needs to fill in based on their role (local dev only vs. deployer). Do not treat the populated file as a normal agent input. If runtime facts are needed later, ask for the minimum required non-sensitive value instead of reading the file.

## Topic discovery

Always read the topic index fresh. Do not hardcode topic lists. When new topics are added to `docs/onboarding/README.md`, the onboarding skill picks them up automatically.

Parse each topic entry for:
- **Topic ID** — stable identifier
- **Title** — human-readable name
- **Path** — relative path to the doc
- **When to use** — one sentence
- **Prereqs** — topic IDs that should come first

Respect prereq ordering when presenting topics in sequence.

## Boundaries

- Do not display secrets, IPs, or infrastructure details. Follow `.cursor/rules/security-awareness.mdc`.
- Do not duplicate deep doc content. Summarize and link. Read the no-duplication rule in the topic index.
- Deployment procedures are out of scope for onboarding. Point to `docs/infra/` runbooks if asked.
- If the user asks how the workspace evolved over time, use `Evolution Arc` instead of stretching onboarding into repo history.
- If the user asks about something not covered by a topic, answer from the repo docs (AGENTS.md, docs/guidance/, docs/architecture/) but note that the answer came from outside the onboarding path.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/onboarding/SKILL.md
