/**
 * Public route migration map.
 *
 * Stable ids prevent filename, slug, register-entry, and sidebar drift while the
 * public IA moves from the old layout to the new one.
 */

import {
  DEFAULT_REGISTER_AVAILABILITY,
  normalizeRegisterAvailability,
} from './register-registry.js';

/**
 * @typedef {'home' | 'about' | 'act' | 'seed' | 'lens' | 'signal' | 'license'} RouteType
 * @typedef {'about' | 'core-system-practice-of-clarity' | 'core-system-seeds' | 'core-system-mandate-lenses' | 'signals-structural-essays' | 'signals-operational-work-delivery' | 'license' | 'home'} RouteSection
 * @typedef {'pending' | 'migrated' | 'verified'} RouteStatus
 *
 * @typedef {object} RouteMapEntry
 * @property {string} id
 * @property {string | null} oldPath
 * @property {string} newPath
 * @property {RouteType} type
 * @property {RouteSection} section
 * @property {{ defaultRegister: string, available: readonly string[], absent: Readonly<Record<string, string>> }} registerAvailability
 * @property {boolean} redirect
 * @property {RouteStatus} status
 */

export const LOCALE_PREFIX = '/en-us';
export const WRITING_SECTION_DECISION = 'removed';

const THREE_REGISTER_AVAILABILITY = Object.freeze({
  defaultRegister: 'practitioner',
  available: Object.freeze(['everyday', 'orientation', 'practitioner']),
  absent: Object.freeze({}),
});

const withDefaultRegisterAvailability = (entry) =>
  Object.freeze({
    ...entry,
    registerAvailability: normalizeRegisterAvailability(
      entry.registerAvailability ?? DEFAULT_REGISTER_AVAILABILITY,
    ),
  });

/** @type {readonly RouteMapEntry[]} */
export const ROUTE_MAP = Object.freeze(
  [
    {
      id: 'home',
      oldPath: '',
      newPath: '',
      type: 'home',
      section: 'home',
      redirect: false,
      status: 'verified',
    },
    {
      id: 'about-what-this-is',
      oldPath: 'about/what-this-is',
      newPath: 'about/what-this-is',
      type: 'about',
      section: 'about',
      redirect: false,
      status: 'verified',
    },
    {
      id: 'about-architecture',
      oldPath: 'about/architecture',
      newPath: 'about/architecture',
      type: 'about',
      section: 'about',
      redirect: false,
      status: 'verified',
    },
    {
      id: 'about-how-to-inspect-this-node',
      oldPath: null,
      newPath: 'about/how-to-inspect-this-node',
      type: 'about',
      section: 'about',
      registerAvailability: THREE_REGISTER_AVAILABILITY,
      redirect: false,
      status: 'verified',
    },
    {
      id: 'about-glossary',
      oldPath: 'about/glossary',
      newPath: 'about/glossary',
      type: 'about',
      section: 'about',
      redirect: false,
      status: 'verified',
    },
    {
      id: 'about-the-author',
      oldPath: 'about/about-the-author',
      newPath: 'about/about-the-author',
      type: 'about',
      section: 'about',
      redirect: false,
      status: 'verified',
    },
    {
      id: 'practice-of-clarity-act-1',
      oldPath: 'writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding',
      newPath: 'core-system/practice-of-clarity/act-1-when-output-outpaces-understanding',
      type: 'act',
      section: 'core-system-practice-of-clarity',
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
      redirect: true,
      status: 'verified',
    },
    {
      id: 'practice-of-clarity-act-3',
      oldPath: 'writing/articles/practice-of-clarity/act-3-nodes-bridges-and-drift',
      newPath: 'core-system/practice-of-clarity/act-3-nodes-bridges-and-drift',
      type: 'act',
      section: 'core-system-practice-of-clarity',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'practice-of-clarity-act-4',
      oldPath: 'writing/articles/practice-of-clarity/act-4-a-public-node-you-can-inspect',
      newPath: 'core-system/practice-of-clarity/act-4-a-public-node-you-can-inspect',
      type: 'act',
      section: 'core-system-practice-of-clarity',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'seeds-overview',
      oldPath: 'seeds',
      newPath: 'core-system/seeds',
      type: 'seed',
      section: 'core-system-seeds',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'seed-a-living-practice-of-clarity',
      oldPath: 'seeds/a-living-practice-of-clarity',
      newPath: 'core-system/seeds/a-living-practice-of-clarity',
      type: 'seed',
      section: 'core-system-seeds',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'seed-practice-foundations',
      oldPath: 'seeds/practice-foundations',
      newPath: 'core-system/seeds/practice-foundations',
      type: 'seed',
      section: 'core-system-seeds',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'seed-beginners-mind',
      oldPath: 'seeds/beginners-mind',
      newPath: 'core-system/seeds/beginners-mind',
      type: 'seed',
      section: 'core-system-seeds',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'seed-bridge-between-conflicting-nodes',
      oldPath: 'seeds/bridge-between-conflicting-nodes',
      newPath: 'core-system/seeds/bridge-between-conflicting-nodes',
      type: 'seed',
      section: 'core-system-seeds',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'seed-translation-and-register-guidance',
      oldPath: 'seeds/translation-and-register-guidance',
      newPath: 'core-system/seeds/translation-and-register-guidance',
      type: 'seed',
      section: 'core-system-seeds',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'seed-voice-of-guidance',
      oldPath: 'seeds/voice-of-guidance',
      newPath: 'core-system/seeds/voice-of-guidance',
      type: 'seed',
      section: 'core-system-seeds',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'mandate-lenses-overview',
      oldPath: 'mandate-lenses',
      newPath: 'core-system/mandate-lenses',
      type: 'lens',
      section: 'core-system-mandate-lenses',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'mandate-lens-sensible-defaults',
      oldPath: 'mandate-lenses/sensible-defaults-a-lens-you-can-load',
      newPath: 'core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load',
      type: 'lens',
      section: 'core-system-mandate-lenses',
      redirect: true,
      status: 'verified',
    },
    {
      id: 'signal-structural-essays',
      oldPath: null,
      newPath: 'signals/structural-essays',
      type: 'signal',
      section: 'signals-structural-essays',
      registerAvailability: THREE_REGISTER_AVAILABILITY,
      redirect: false,
      status: 'verified',
    },
    {
      id: 'signal-ai-is-not-magic-it-is-a-cognitive-amplifier',
      oldPath: null,
      newPath: 'signals/structural-essays/ai-is-not-magic-it-is-a-cognitive-amplifier',
      type: 'signal',
      section: 'signals-structural-essays',
      registerAvailability: THREE_REGISTER_AVAILABILITY,
      redirect: false,
      status: 'verified',
    },
    {
      id: 'signal-integration-lag',
      oldPath: null,
      newPath: 'signals/operational/work-delivery/integration-lag',
      type: 'signal',
      section: 'signals-operational-work-delivery',
      redirect: false,
      status: 'verified',
    },
    {
      id: 'signal-a-path-through-integration-lag',
      oldPath: null,
      newPath: 'signals/operational/work-delivery/a-path-through-integration-lag',
      type: 'signal',
      section: 'signals-operational-work-delivery',
      redirect: false,
      status: 'verified',
    },
    {
      id: 'license-cc-by-4-0',
      oldPath: 'licenses/cc-by-4-0',
      newPath: 'licenses/cc-by-4-0',
      type: 'license',
      section: 'license',
      redirect: false,
      status: 'verified',
    },
  ].map(withDefaultRegisterAvailability),
);

export const ROUTE_MAP_BY_ID = Object.freeze(
  Object.fromEntries(ROUTE_MAP.map((entry) => [entry.id, entry])),
);

export const MIGRATION_SECTION_ORDER = Object.freeze([
  'core-system-practice-of-clarity',
  'core-system-seeds',
  'core-system-mandate-lenses',
  'signals-structural-essays',
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
const normalizeLocalizedPath = (path) => {
  const pathname = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
  if (pathname === LOCALE_PREFIX || pathname === '') return '';
  if (pathname.startsWith(`${LOCALE_PREFIX}/`)) {
    return pathname.slice(LOCALE_PREFIX.length + 1).replace(/\/+$/, '');
  }
  return pathname.replace(/^\/+/, '').replace(/\/+$/, '');
};

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

export const getRegisterAvailabilityForRouteId = (id) => {
  const entry = getRouteById(id);
  return entry?.registerAvailability ?? DEFAULT_REGISTER_AVAILABILITY;
};

export const getRegisterAvailabilityForPath = (path) => {
  const normalizedPath = normalizeLocalizedPath(path);
  const entry = ROUTE_MAP.find((route) => getActivePath(route) === normalizedPath);
  return entry?.registerAvailability ?? DEFAULT_REGISTER_AVAILABILITY;
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
