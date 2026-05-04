/**
 * Public route migration map.
 *
 * Stable ids prevent filename, slug, register-entry, and sidebar drift while the
 * public IA moves from the old layout to the new one.
 */

/**
 * @typedef {'home' | 'about' | 'act' | 'seed' | 'lens' | 'signal' | 'license'} RouteType
 * @typedef {'about' | 'core-system-practice-of-clarity' | 'core-system-seeds' | 'core-system-mandate-lenses' | 'signals-operational-work-delivery' | 'license' | 'home'} RouteSection
 * @typedef {'pending' | 'migrated' | 'verified'} RouteStatus
 *
 * @typedef {object} RouteMapEntry
 * @property {string} id
 * @property {string | null} oldPath
 * @property {string} newPath
 * @property {RouteType} type
 * @property {RouteSection} section
 * @property {boolean} hasRegisterPair
 * @property {boolean} redirect
 * @property {RouteStatus} status
 */

export const LOCALE_PREFIX = '/en-us';
export const WRITING_SECTION_DECISION = 'removed';

/** @type {readonly RouteMapEntry[]} */
export const ROUTE_MAP = Object.freeze([
  {
    id: 'home',
    oldPath: '',
    newPath: '',
    type: 'home',
    section: 'home',
    hasRegisterPair: true,
    redirect: false,
    status: 'verified',
  },
  {
    id: 'about-what-this-is',
    oldPath: 'about/what-this-is',
    newPath: 'about/what-this-is',
    type: 'about',
    section: 'about',
    hasRegisterPair: true,
    redirect: false,
    status: 'verified',
  },
  {
    id: 'about-architecture',
    oldPath: 'about/architecture',
    newPath: 'about/architecture',
    type: 'about',
    section: 'about',
    hasRegisterPair: true,
    redirect: false,
    status: 'verified',
  },
  {
    id: 'about-glossary',
    oldPath: 'about/glossary',
    newPath: 'about/glossary',
    type: 'about',
    section: 'about',
    hasRegisterPair: true,
    redirect: false,
    status: 'verified',
  },
  {
    id: 'about-the-author',
    oldPath: 'about/about-the-author',
    newPath: 'about/about-the-author',
    type: 'about',
    section: 'about',
    hasRegisterPair: true,
    redirect: false,
    status: 'verified',
  },
  {
    id: 'practice-of-clarity-act-1',
    oldPath: 'writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding',
    newPath: 'core-system/practice-of-clarity/act-1-when-output-outpaces-understanding',
    type: 'act',
    section: 'core-system-practice-of-clarity',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'practice-of-clarity-act-2',
    oldPath:
      'writing/articles/practice-of-clarity/act-2-practicing-decision-hygiene-under-ai-speed',
    newPath: 'core-system/practice-of-clarity/act-2-practicing-decision-hygiene-under-ai-speed',
    type: 'act',
    section: 'core-system-practice-of-clarity',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'practice-of-clarity-act-3',
    oldPath: 'writing/articles/practice-of-clarity/act-3-nodes-bridges-and-drift',
    newPath: 'core-system/practice-of-clarity/act-3-nodes-bridges-and-drift',
    type: 'act',
    section: 'core-system-practice-of-clarity',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'practice-of-clarity-act-4',
    oldPath: 'writing/articles/practice-of-clarity/act-4-a-public-node-you-can-inspect',
    newPath: 'core-system/practice-of-clarity/act-4-a-public-node-you-can-inspect',
    type: 'act',
    section: 'core-system-practice-of-clarity',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'seeds-overview',
    oldPath: 'seeds',
    newPath: 'core-system/seeds',
    type: 'seed',
    section: 'core-system-seeds',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'seed-a-living-practice-of-clarity',
    oldPath: 'seeds/a-living-practice-of-clarity',
    newPath: 'core-system/seeds/a-living-practice-of-clarity',
    type: 'seed',
    section: 'core-system-seeds',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'seed-practice-foundations',
    oldPath: 'seeds/practice-foundations',
    newPath: 'core-system/seeds/practice-foundations',
    type: 'seed',
    section: 'core-system-seeds',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'seed-beginners-mind',
    oldPath: 'seeds/beginners-mind',
    newPath: 'core-system/seeds/beginners-mind',
    type: 'seed',
    section: 'core-system-seeds',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'seed-bridge-between-conflicting-nodes',
    oldPath: 'seeds/bridge-between-conflicting-nodes',
    newPath: 'core-system/seeds/bridge-between-conflicting-nodes',
    type: 'seed',
    section: 'core-system-seeds',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'seed-translation-and-register-guidance',
    oldPath: 'seeds/translation-and-register-guidance',
    newPath: 'core-system/seeds/translation-and-register-guidance',
    type: 'seed',
    section: 'core-system-seeds',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'seed-voice-of-guidance',
    oldPath: 'seeds/voice-of-guidance',
    newPath: 'core-system/seeds/voice-of-guidance',
    type: 'seed',
    section: 'core-system-seeds',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'mandate-lenses-overview',
    oldPath: 'mandate-lenses',
    newPath: 'core-system/mandate-lenses',
    type: 'lens',
    section: 'core-system-mandate-lenses',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'mandate-lens-sensible-defaults',
    oldPath: 'mandate-lenses/sensible-defaults-a-lens-you-can-load',
    newPath: 'core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load',
    type: 'lens',
    section: 'core-system-mandate-lenses',
    hasRegisterPair: true,
    redirect: true,
    status: 'verified',
  },
  {
    id: 'signal-integration-lag',
    oldPath: null,
    newPath: 'signals/operational/work-delivery/integration-lag',
    type: 'signal',
    section: 'signals-operational-work-delivery',
    hasRegisterPair: true,
    redirect: false,
    status: 'verified',
  },
  {
    id: 'signal-a-path-through-integration-lag',
    oldPath: null,
    newPath: 'signals/operational/work-delivery/a-path-through-integration-lag',
    type: 'signal',
    section: 'signals-operational-work-delivery',
    hasRegisterPair: true,
    redirect: false,
    status: 'verified',
  },
  {
    id: 'license-cc-by-4-0',
    oldPath: 'licenses/cc-by-4-0',
    newPath: 'licenses/cc-by-4-0',
    type: 'license',
    section: 'license',
    hasRegisterPair: true,
    redirect: false,
    status: 'verified',
  },
]);

export const ROUTE_MAP_BY_ID = Object.freeze(
  Object.fromEntries(ROUTE_MAP.map((entry) => [entry.id, entry])),
);

export const MIGRATION_SECTION_ORDER = Object.freeze([
  'core-system-practice-of-clarity',
  'core-system-seeds',
  'core-system-mandate-lenses',
  'signals-operational-work-delivery',
]);

export const MIGRATION_CHECKPOINTS = Object.freeze(
  MIGRATION_SECTION_ORDER.map((section) => ({
    section,
    routeIds: ROUTE_MAP.filter((entry) => entry.section === section).map((entry) => entry.id),
  })),
);

const localizedPath = (path) => (path ? `${LOCALE_PREFIX}/${path}/` : `${LOCALE_PREFIX}/`);
const localizedPathWithoutTrailingSlash = (path) =>
  path ? `${LOCALE_PREFIX}/${path}` : LOCALE_PREFIX;

export const getRouteById = (id) => ROUTE_MAP_BY_ID[id] ?? null;

export const getActivePath = (entry) => {
  if (entry.status === 'migrated' || entry.status === 'verified') {
    return entry.newPath;
  }

  return entry.oldPath;
};

export const getActiveContentPaths = () =>
  ROUTE_MAP.map((entry) => getActivePath(entry)).filter((path) => typeof path === 'string');

export const getPlannedContentPaths = () => ROUTE_MAP.map((entry) => entry.newPath);

export const getLocalizedRoutePath = (id, mode = 'active') => {
  const entry = getRouteById(id);

  if (!entry) {
    throw new Error(`Unknown route id: ${id}`);
  }

  const path = mode === 'planned' ? entry.newPath : getActivePath(entry);

  if (path === null) {
    throw new Error(`Route id ${id} does not have an active path yet.`);
  }

  return localizedPath(path);
};

export const buildRouteRedirects = () =>
  Object.fromEntries(
    ROUTE_MAP.flatMap((entry) => {
      if (!entry.redirect || !entry.oldPath || entry.oldPath === entry.newPath) {
        return [];
      }

      return [[localizedPathWithoutTrailingSlash(entry.oldPath), localizedPath(entry.newPath)]];
    }),
  );
