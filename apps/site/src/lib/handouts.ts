import { getCollection } from 'astro:content';
import {
  getHandoutHref,
  getHandoutSidebarHref,
  getHandoutSlug,
  type HandoutEntry,
  isPublishedHandout,
  isSeriesLanding,
  isThinkfirstLocaleEntry,
  THINKFIRST_BASE_PATH,
  THINKFIRST_COLLECTION_BASE,
  THINKFIRST_SERIES_ID,
  THINKFIRST_SIDEBAR_BASE,
} from './handouts-series';

export {
  getHandoutHref,
  getHandoutSidebarHref,
  getHandoutSlug,
  type HandoutEntry,
  isPublishedHandout,
  isSeriesLanding,
  isThinkfirstLocaleEntry,
  THINKFIRST_BASE_PATH,
  THINKFIRST_COLLECTION_BASE,
  THINKFIRST_SERIES_ID,
  THINKFIRST_SIDEBAR_BASE,
};

const getThinkfirstSeriesEntries = async (): Promise<HandoutEntry[]> => {
  const entries = await getCollection(
    'handouts',
    ({ data }) => data.seriesId === THINKFIRST_SERIES_ID,
  );

  return entries.filter((entry) => isThinkfirstLocaleEntry(entry));
};

export const getThinkfirstHandouts = async (): Promise<HandoutEntry[]> => {
  const entries = await getThinkfirstSeriesEntries();

  return entries
    .filter((entry) => isPublishedHandout(entry) && !isSeriesLanding(entry))
    .sort((left, right) => left.data.order - right.data.order);
};

export const getThinkfirstLanding = async (): Promise<HandoutEntry | undefined> => {
  const entries = await getThinkfirstSeriesEntries();

  return entries.find((entry) => isSeriesLanding(entry));
};

export const getThinkfirstHandoutBySlug = async (
  slug: string,
): Promise<HandoutEntry | undefined> => {
  const entries = await getThinkfirstHandouts();
  return entries.find((entry) => getHandoutSlug(entry) === slug);
};

// Links are locale-relative; Starlight prepends the active locale. The current
// entry is highlighted by Starlight via `url.pathname`, so no manual attrs.
export const buildThinkfirstSidebar = async () => {
  const handouts = await getThinkfirstHandouts();

  return [
    // Locale-relative `/` resolves to the hero landing (`/en-us/`) once Starlight
    // prepends the active locale.
    { label: 'Back to main page', link: '/' },
    {
      label: 'ThinkFirst handouts',
      items: [
        { label: 'Overview', link: `${THINKFIRST_SIDEBAR_BASE}/` },
        ...handouts.map((entry) => ({
          label: entry.data.title,
          link: getHandoutSidebarHref(entry),
        })),
      ],
    },
  ];
};
