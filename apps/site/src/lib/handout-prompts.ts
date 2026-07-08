import {
  type HandoutPrompt,
  handoutPrompts as repoForensicsStarterPrompts,
} from '../content/handouts/en-us/thinkfirst/repo-forensics-starter-prompt.prompts';

export type { HandoutPrompt };

export const HANDOUT_PROMPT_REGISTRY = {
  'repo-forensics-starter-prompt': repoForensicsStarterPrompts,
} as const satisfies Record<string, readonly HandoutPrompt[]>;

export type HandoutPromptSlug = keyof typeof HANDOUT_PROMPT_REGISTRY;

export const getHandoutPrompts = (slug: string): readonly HandoutPrompt[] | undefined => {
  if (!(slug in HANDOUT_PROMPT_REGISTRY)) {
    return undefined;
  }

  return HANDOUT_PROMPT_REGISTRY[slug as HandoutPromptSlug];
};
