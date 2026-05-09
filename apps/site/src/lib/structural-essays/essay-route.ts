import { getLocalizedRoutePath, getRouteById } from '../route-map.js';

export const ESSAY_ROUTE_ID = 'signal-ai-is-not-magic-it-is-a-mirror-with-a-motor';

const essayRoute = getRouteById(ESSAY_ROUTE_ID);

if (!essayRoute?.newPath) {
  throw new Error(`Route metadata missing for ${ESSAY_ROUTE_ID}.`);
}

export const ESSAY_PATH = essayRoute.newPath;
export const ESSAY_HREF = getLocalizedRoutePath(ESSAY_ROUTE_ID);

export type EssayRegister = 'everyday' | 'orientation' | 'practitioner';

export const buildEssayHref = (register: EssayRegister = 'practitioner') => {
  if (register === 'practitioner') return ESSAY_HREF;
  return `${ESSAY_HREF}?register=${register}`;
};
