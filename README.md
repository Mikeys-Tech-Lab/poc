# Practice of Clarity

A publication surface and usable practice for making reasoning visible.

Start with [practiceofclarity.eu](https://practiceofclarity.eu) if you are new to the work.

This repository is the inspectable node behind it.

Read the site if you want the condition, the practice, and the writing first.

Load the first seeder if you want to step into use in a compatible model or agent.

## Start here

- If you are new, begin with [practiceofclarity.eu](https://practiceofclarity.eu).
- If you want the canon behind the work, this repo holds the seeds, continuity documents, mandate lenses, and guidance the site points toward.
- If you want to move from reading into use, load the first seeder directly.

Reading about the practice is not activation.

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

If you want help finding your way through the repo, say **"onboard me"** in chat for setup, structure, and contribution guidance.

If you want the repo's history and reasoning trace instead, say **"Evolution Arc"**. The agent will ask which register you want and walk the inspectable repo-local sources.

If you prefer the manual path, read the [onboarding guide](docs/onboarding/manual.md) and [Evolution Arc](docs/onboarding/evolution-arc.md).

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
