export const CONTENT_PATHS = [
  '',
  'about/what-this-is',
  'about/about-the-author',
  'writing/articles/practice-of-clarity/act-1-when-output-outpaces-understanding',
  'licenses/cc-by-4-0',
  'licenses/mit',
];

export const REGISTERS = ['practitioner', 'orientation'];

export const VIEWPORTS = Object.freeze({
  desktop: Object.freeze({ width: 1440, height: 2200 }),
  tablet: Object.freeze({ width: 834, height: 1400 }),
  mobile: Object.freeze({ width: 390, height: 1200 }),
});

export const OUTPUT_DIRNAME = 'poc-snapshot-images';
export const HOME_SLUG = 'home';

export const toScreenshotSlug = (path) => (path || HOME_SLUG).replaceAll('/', '__');

export const screenshotFileName = (path, register) => `${toScreenshotSlug(path)}__${register}.png`;

export const zipFileName = (version, baseName = OUTPUT_DIRNAME) =>
  `${baseName}-snapshot-${version}.zip`;

export const buildPageUrl = (baseUrl, path, register) => {
  const url = new URL(path, baseUrl);

  if (register === 'orientation') {
    url.searchParams.set('register', 'orientation');
  }

  return url.toString();
};

export const createScreendumpPlan = ({
  baseUrl,
  paths = CONTENT_PATHS,
  registers = REGISTERS,
  viewports = VIEWPORTS,
} = {}) =>
  Object.entries(viewports).flatMap(([viewportName, viewport]) =>
    paths.flatMap((path) =>
      registers.map((register) => ({
        viewportName,
        viewport,
        path,
        register,
        fileName: screenshotFileName(path, register),
        url: buildPageUrl(baseUrl, path, register),
      })),
    ),
  );
