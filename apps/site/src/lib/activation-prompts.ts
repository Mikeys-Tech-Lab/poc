export const SEEDER_URL =
  'https://raw.githubusercontent.com/Mikeys-Tech-Lab/poc/main/mandateLenses/SensibleDefaults/context-seeder.md';

export const ACTIVATION_COMPATIBILITY =
  'Paste one of these into any reasoning-capable language model, thinking-capable agent, IDE agent, or comparable execution environment.';

export const ACTIVATION_INCOMPATIBILITY =
  'This is for runtime loading, not blind training, scraping, or passive ingestion.';

export const ACTIVATION_BOUNDARY =
  'Reading about the system is not activation. Operational grounding begins only when the seeder and canonical artifacts are loaded.';

export const ACTIVATION_DATA_BOUNDARY =
  'If you are using a third-party model or agent, do not paste secrets, sensitive internal data, client details, private URLs, credentials, internal hostnames, or operator-specific values. Describe the task in safe terms and keep private values outside the prompt.';

export const SEEDER_VERSION_NOTE =
  'This seeder points to the current version of the work. It may evolve over time and can be inspected directly.';

const SAFE_TASK_PLACEHOLDER =
  '[describe your task in safe terms, without secrets, sensitive internal data, or operator-specific values]';

export const MINIMAL_ACTIVATION_PROMPT = `Load the Practice of Clarity context seeder from:
${SEEDER_URL}

Follow its instructions, then apply the loaded posture to my task:
${SAFE_TASK_PLACEHOLDER}`;

export const GUIDED_ACTIVATION_PROMPT = `Load the Practice of Clarity context seeder from:
${SEEDER_URL}

After loading:
- make reasoning visible
- separate observation from inference
- name assumptions and uncertainty
- keep the output traceable to the loaded artifacts

Then analyze the following task:
${SAFE_TASK_PLACEHOLDER}`;
