import type { CollectionEntry } from 'astro:content';
import { HANDOUT_PROMPT_REGISTRY } from './handout-prompts';

export const THINKFIRST_SERIES_ID = 'thinkfirst' as const;

// Handouts are locale-nested in both content and routing so future languages
// can add their own tree. `en-us` is the only locale for now.
export const THINKFIRST_LOCALE = 'en-us';

// Collection id prefix for this locale's series, e.g. `en-us/thinkfirst`.
// The `handouts` glob loader ids include the locale + series folder segments.
export const THINKFIRST_COLLECTION_BASE = `${THINKFIRST_LOCALE}/${THINKFIRST_SERIES_ID}`;

// Locale-relative base. Starlight's sidebar config prepends the active locale to
// non-absolute `link` entries, so sidebar links must NOT include the locale.
export const THINKFIRST_SIDEBAR_BASE = '/shared/thinkfirst';

// Fully-qualified localized base for canonical URLs, card links, and routing.
export const THINKFIRST_BASE_PATH = `/${THINKFIRST_LOCALE}${THINKFIRST_SIDEBAR_BASE}`;

export type HandoutEntry = CollectionEntry<'handouts'>;

export const getHandoutSlug = (entry: Pick<HandoutEntry, 'id'>): string => {
  const segments = entry.id.split('/');
  return segments.at(-1) ?? entry.id;
};

/** Fully-qualified localized href (e.g. `/en-us/shared/thinkfirst/<slug>/`). */
export const getHandoutHref = (entry: Pick<HandoutEntry, 'id'>): string =>
  `${THINKFIRST_BASE_PATH}/${getHandoutSlug(entry)}/`;

/** Locale-relative href for Starlight sidebar config (locale is prepended). */
export const getHandoutSidebarHref = (entry: Pick<HandoutEntry, 'id'>): string =>
  `${THINKFIRST_SIDEBAR_BASE}/${getHandoutSlug(entry)}/`;

/** True for any entry in this locale's ThinkFirst series (landing or handout). */
export const isThinkfirstLocaleEntry = (entry: Pick<HandoutEntry, 'id'>): boolean =>
  entry.id === THINKFIRST_COLLECTION_BASE || entry.id.startsWith(`${THINKFIRST_COLLECTION_BASE}/`);

export const isSeriesLanding = (entry: Pick<HandoutEntry, 'id'>): boolean =>
  entry.id === THINKFIRST_COLLECTION_BASE ||
  entry.id.endsWith('/index') ||
  getHandoutSlug(entry) === 'index';

export const isPublishedHandout = (entry: Pick<HandoutEntry, 'id'>): boolean =>
  getHandoutSlug(entry) in HANDOUT_PROMPT_REGISTRY;
