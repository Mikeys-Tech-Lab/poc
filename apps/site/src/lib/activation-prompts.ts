export const SEEDER_URL =
  'https://github.com/Mikeys-Tech-Lab/poc/blob/main/mandateLenses/SensibleDefaults/context-seeder.md';

export const ACTIVATION_COMPATIBILITY =
  'Paste one of these into any reasoning-capable language model, thinking-capable agent, IDE agent, or comparable execution environment.';

export const ACTIVATION_INCOMPATIBILITY =
  'This is for runtime loading, not blind training, scraping, or passive ingestion.';

export const ACTIVATION_BOUNDARY =
  'Reading about the system is not activation. Operational grounding begins only when the seeder and canonical artifacts are loaded.';

export const MINIMAL_ACTIVATION_PROMPT = `Load the Practice of Clarity context seeder from:
${SEEDER_URL}

Follow its instructions, then apply the loaded posture to my task:
[paste your task here]`;

export const GUIDED_ACTIVATION_PROMPT = `Load the Practice of Clarity context seeder from:
${SEEDER_URL}

After loading:
- make reasoning visible
- separate observation from inference
- name assumptions and uncertainty
- keep the output traceable to the loaded artifacts

Then analyze the following task:
[paste your task here]`;
