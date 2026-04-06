import { getActiveContentPaths } from './route-map.js';

export const CONTENT_PATHS = getActiveContentPaths();

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
