export const CONTENT_PATHS = [
  '',
  'about/what-this-is',
  'about/architecture',
  'about/about-the-author',
  'writing/articles/practice-of-clarity/00-publication-arc',
  'writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding',
  'writing/articles/practice-of-clarity/act-2-practicing-decision-hygiene-under-ai-speed',
  'writing/articles/practice-of-clarity/act-3-nodes-bridges-and-drift',
  'writing/articles/practice-of-clarity/act-4-a-public-node-you-can-inspect',
  'writing/articles/practice-of-clarity/sensible-defaults-a-lens-you-can-load',
  'licenses/cc-by-4-0',
];

export const REGISTERS = ['practitioner', 'orientation'];

export const THEMES = Object.freeze([
  Object.freeze({ name: 'dark-atmo', storageValue: 'dark' }),
  Object.freeze({ name: 'light-atmo', storageValue: 'light' }),
]);

export const VIEWPORTS = Object.freeze({
  desktop: Object.freeze({ width: 1440, height: 2200 }),
  tablet: Object.freeze({ width: 834, height: 1400 }),
  mobile: Object.freeze({ width: 390, height: 1200 }),
});

export const OUTPUT_DIRNAME = 'poc-snapshot-images';
export const HOME_SLUG = 'home';

export const toScreenshotSlug = (path) => (path || HOME_SLUG).replaceAll('/', '__');

export const screenshotFileName = (path, register, themeName) =>
  `${toScreenshotSlug(path)}__${register}__${themeName}.png`;

export const zipFileName = (version, baseName = OUTPUT_DIRNAME) =>
  `${baseName}-snapshot-${version}.zip`;

export const buildPageUrl = (baseUrl, path, register) => {
  const url = new URL(path, baseUrl);

  if (register === 'orientation') {
    url.searchParams.set('register', 'orientation');
  }

  return url.toString();
};

/**
 * @param {{ baseUrl?: string; paths?: string[]; registers?: string[]; themes?: typeof THEMES; viewports?: typeof VIEWPORTS }} [options]
 */
export const createScreendumpPlan = ({
  baseUrl,
  paths = CONTENT_PATHS,
  registers = REGISTERS,
  themes = THEMES,
  viewports = VIEWPORTS,
} = {}) =>
  Object.entries(viewports).flatMap(([viewportName, viewport]) =>
    paths.flatMap((path) =>
      registers.flatMap((register) =>
        themes.map((theme) => ({
          viewportName,
          viewport,
          path,
          register,
          theme,
          fileName: screenshotFileName(path, register, theme.name),
          url: buildPageUrl(baseUrl, path, register),
        })),
      ),
    ),
  );
