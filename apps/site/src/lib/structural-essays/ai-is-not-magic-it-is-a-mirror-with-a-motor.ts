export const ESSAY_ROUTE_ID = 'signal-ai-is-not-magic-it-is-a-mirror-with-a-motor';
export const ESSAY_PATH = 'signals/structural-essays/ai-is-not-magic-it-is-a-mirror-with-a-motor';
export const ESSAY_HREF =
  '/en-us/signals/structural-essays/ai-is-not-magic-it-is-a-mirror-with-a-motor/';

export type EssayRegister = 'everyday' | 'orientation' | 'practitioner';

export const buildEssayHref = (register: EssayRegister = 'practitioner') => {
  if (register === 'practitioner') return ESSAY_HREF;
  return `${ESSAY_HREF}?register=${register}`;
};
