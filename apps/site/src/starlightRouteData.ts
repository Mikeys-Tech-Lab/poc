import { getCollection } from 'astro:content';
import path from 'node:path';
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import sharp from 'sharp';
import { SIGNAL_FALLBACK_SOCIAL_IMAGE, SIGNAL_FALLBACK_SOCIAL_IMAGE_ALT } from './consts';
import {
  type BreadcrumbItem,
  buildSocialImageHeadEntries,
  buildStructuredDataHeadEntry,
  hasSocialImageOverride,
  headHasMeta,
  imageTypeFromPath,
  resolveSocialImageUrl,
} from './lib/seo';

interface ImageDimensions {
  width: number;
  height: number;
  type?: string;
}

/** Read image dimensions from the public asset at build time. */
async function readImageDimensions(socialPath: string): Promise<ImageDimensions> {
  const filePath = path.join(process.cwd(), 'public', socialPath);
  try {
    const metadata = await sharp(filePath).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error('image dimensions are unavailable');
    }
    return { width: metadata.width, height: metadata.height, type: imageTypeFromPath(socialPath) };
  } catch (error) {
    throw new Error(`Unable to read declared social image "${socialPath}".`, { cause: error });
  }
}

async function buildBreadcrumbs(canonicalUrl: string, title: string): Promise<BreadcrumbItem[]> {
  const entries = await getCollection('docs');
  const titleById = new Map(entries.map((entry) => [entry.id, entry.data.title]));
  const segments = new URL(canonicalUrl).pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  for (let length = 1; length < segments.length; length += 1) {
    const path = segments.slice(0, length).join('/');
    const parentTitle = titleById.get(path) ?? titleById.get(`${path}/index`);
    if (!parentTitle) continue;
    breadcrumbs.push({
      name: parentTitle,
      url: new URL(`/${path}/`, canonicalUrl).href,
    });
  }

  breadcrumbs.push({ name: title, url: canonicalUrl });
  return breadcrumbs;
}

/** Add image-based social preview tags for pages that declare a `socialImage`. */
export const onRequest = defineRouteMiddleware(async (context, next) => {
  const route = context.locals.starlightRoute;
  const data = route.entry.data;
  const isSignal = route.entry.id.includes('/signals/');
  const socialImage = data.socialImage ?? (isSignal ? SIGNAL_FALLBACK_SOCIAL_IMAGE : undefined);
  const socialImageAlt =
    data.socialImageAlt ?? (isSignal ? SIGNAL_FALLBACK_SOCIAL_IMAGE_ALT : undefined);
  const imageUrl = resolveSocialImageUrl({ socialImage }, context.site);
  if (!imageUrl || !socialImage || !socialImageAlt) return next();

  if (hasSocialImageOverride(route.head)) return next();

  const dimensions = await readImageDimensions(socialImage);
  const entries = buildSocialImageHeadEntries({
    title: data.title,
    description: data.description,
    imageUrl,
    imageAlt: socialImageAlt,
    imageWidth: dimensions?.width,
    imageHeight: dimensions?.height,
    imageType: dimensions?.type,
  });

  route.head.push(...entries.filter((entry) => !headHasMeta(route.head, entry)));

  if (data.structuredDataType) {
    const canonical = route.head.find(
      (entry) => entry.tag === 'link' && entry.attrs?.rel === 'canonical',
    );
    const canonicalUrl = canonical?.attrs?.href;
    if (typeof canonicalUrl !== 'string') {
      throw new Error(`Article structured data requires a canonical URL for "${route.entry.id}".`);
    }

    route.head.push(
      buildStructuredDataHeadEntry({
        pageType: data.structuredDataType,
        canonicalUrl,
        title: data.title,
        description: data.description,
        locale: route.lang,
        imageUrl,
        imageAlt: socialImageAlt,
        imageWidth: dimensions.width,
        imageHeight: dimensions.height,
        breadcrumbs: await buildBreadcrumbs(canonicalUrl, data.title),
      }),
    );
  }

  await next();
});
