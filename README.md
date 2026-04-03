# Practice of Clarity

A publication surface and usable practice for making reasoning visible.

The primary reading surface for humans is [practiceofclarity.eu](https://practiceofclarity.eu).

This repository is the canonical and inspectable node behind it.

You can start by reading the public site, or you can load the seeder artifacts from the repo and use the practice directly in a compatible model or agent.

## Public entry points

- Read first: [practiceofclarity.eu](https://practiceofclarity.eu) is the primary reading surface.
- Inspect the canon: this repo holds the seeds, continuity documents, mandate lenses, and guidance the public site points to.
- Activate directly: load the seeder when you want to use the practice, not only read about it.

Reading about the system is not activation.

Operational grounding begins only when the seeder and canonical artifacts are loaded.

## Ready-to-paste activation

Intended for reasoning-capable language models, thinking-capable agents, IDE agents, and comparable execution environments.

Not designed for blind training, scraping, or passive ingestion.

Seeder URL:

- https://github.com/Mikeys-Tech-Lab/poc/blob/main/mandateLenses/SensibleDefaults/context-seeder.md

### Minimal activation prompt

```text
Load the Practice of Clarity context seeder from:
https://github.com/Mikeys-Tech-Lab/poc/blob/main/mandateLenses/SensibleDefaults/context-seeder.md

Follow its instructions, then apply the loaded posture to my task:
[paste your task here]
```

### Guided activation prompt

```text
Load the Practice of Clarity context seeder from:
https://github.com/Mikeys-Tech-Lab/poc/blob/main/mandateLenses/SensibleDefaults/context-seeder.md

After loading:
- make reasoning visible
- separate observation from inference
- name assumptions and uncertainty
- keep the output traceable to the loaded artifacts

Then analyze the following task:
[paste your task here]
```

## Repo contributor entry

If you are using an AI-assisted editor (Cursor, Claude Code, GitHub Copilot), say **"onboard me"** in chat for setup, structure, and contribution guidance.

If you want the repo's history and reasoning trace instead, say **"Evolution Arc"**. The agent will ask which register you want and walk the inspectable repo-local sources.

For manual paths without AI, read the [onboarding guide](docs/onboarding/manual.md) and [Evolution Arc](docs/onboarding/evolution-arc.md).

## Quick commands

```bash
pnpm install
pnpm run local        # docs site at http://localhost:4321
pnpm run build        # production build
pnpm test             # tooling tests
pnpm screendump       # export desktop/tablet/mobile snapshots for both atmospheric themes + zip
```

Full setup details: [docs/onboarding/local-setup.md](docs/onboarding/local-setup.md)

## Canonical surfaces

| Path | What it covers |
|---|---|
| [seeds/](seeds/) | Structural seed canon for the Practice of Clarity |
| [continuity/](continuity/) | Temporal anchors, architecture memory, and rollout direction |
| [mandateLenses/](mandateLenses/) | Canonical runtime lens packages and portable context seeders |
| [docs/practices/](docs/practices/) | Derived explainers and bridge docs for canonical lens packages |
| [docs/onboarding/](docs/onboarding/) | Repo-local onboarding paths for contributors and inspectors |
| [AGENTS.md](AGENTS.md) | Canonical AI agent guidance |
| [docs/architecture/](docs/architecture/) | Workspace architecture and diagram |
| [docs/guidance/](docs/guidance/) | Principles and workflow conventions |
| [docs/infra/](docs/infra/) | Environment runbooks and protection layers |

## Licensing

- Code and tooling: [MIT License](LICENSE)
- Authored content (seeds, site pages, docs): [CC BY 4.0](LICENSE-CC-BY-4.0)

File headers and site license notices reflect this split. See individual files for applicable license.
