import { getActiveContentPaths } from '../route-map.js';

export const LOCALES = ['en-US'] as const;
export const LOCALE_PREFIXES = ['/en-us/'] as const;
export const CONTENT_PATHS = getActiveContentPaths();
export const REGISTERS = ['practitioner', 'orientation'] as const;
