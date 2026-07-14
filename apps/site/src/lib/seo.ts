import type { StarlightRouteData } from '@astrojs/starlight/route-data';

/**
 * Social preview helpers. Starlight emits the text OG/Twitter tags; this adds
 * the image tags (og:image, twitter:image, dimensions) it leaves out.
 */

export type HeadTag = StarlightRouteData['head'][number];

/** Absolutize a root-relative `socialImage` path against `site`. */
export function resolveSocialImageUrl(
  data: { socialImage?: string },
  site: URL | undefined,
): string | undefined {
  const path = data.socialImage;
  if (!path?.startsWith('/')) return undefined;
  return site ? new URL(path, site).href : path;
}

/** Map a file path to its image MIME type, if recognised. */
export function imageTypeFromPath(path: string): string | undefined {
  switch (path.split('.').pop()?.toLowerCase()) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    default:
      return undefined;
  }
}

/** Build the image-based head tags for a page's social preview. */
export function buildSocialImageHeadEntries({
  title,
  description,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  imageType,
}: {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
}): HeadTag[] {
  const alt = imageAlt ?? title;
  const entries: HeadTag[] = [
    { tag: 'meta', attrs: { property: 'og:image', content: imageUrl } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: alt } },
  ];
  if (imageType) {
    entries.push({ tag: 'meta', attrs: { property: 'og:image:type', content: imageType } });
  }
  if (imageWidth && imageHeight) {
    entries.push(
      { tag: 'meta', attrs: { property: 'og:image:width', content: String(imageWidth) } },
      { tag: 'meta', attrs: { property: 'og:image:height', content: String(imageHeight) } },
    );
  }
  entries.push(
    { tag: 'meta', attrs: { name: 'twitter:image', content: imageUrl } },
    { tag: 'meta', attrs: { name: 'twitter:image:alt', content: alt } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
  );
  if (description) {
    entries.push({ tag: 'meta', attrs: { name: 'twitter:description', content: description } });
  }
  return entries;
}

/** Whether a matching `<meta>` tag (by name or property) already exists. */
export function headHasMeta(head: readonly HeadTag[], entry: HeadTag): boolean {
  if (entry.tag !== 'meta' || !entry.attrs) return false;
  const key =
    entry.attrs.name !== undefined
      ? 'name'
      : entry.attrs.property !== undefined
        ? 'property'
        : undefined;
  if (!key) return false;
  const value = entry.attrs[key];
  return head.some((tag) => tag.tag === 'meta' && tag.attrs?.[key] === value);
}

/** Whether a page has taken ownership of its complete social image metadata group. */
export function hasSocialImageOverride(head: readonly HeadTag[]): boolean {
  return head.some(
    (entry) =>
      entry.tag === 'meta' &&
      (entry.attrs?.property === 'og:image' || entry.attrs?.name === 'twitter:image'),
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/** Build a JSON-LD graph from metadata already used in the page head. */
export function buildStructuredDataHeadEntry({
  pageType,
  canonicalUrl,
  title,
  description,
  locale,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  breadcrumbs,
}: {
  pageType: 'Article' | 'CollectionPage';
  canonicalUrl: string;
  title: string;
  description?: string;
  locale: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  breadcrumbs: readonly BreadcrumbItem[];
}): HeadTag {
  const organizationId = `${new URL('/', canonicalUrl).href}#organization`;
  const webPageId = `${canonicalUrl}#webpage`;
  const articleId = `${canonicalUrl}#article`;
  const imageId = `${canonicalUrl}#primaryimage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  const webPage = {
    '@type': pageType === 'CollectionPage' ? ['WebPage', 'CollectionPage'] : 'WebPage',
    '@id': webPageId,
    url: canonicalUrl,
    name: title,
    description,
    inLanguage: locale,
    primaryImageOfPage: { '@id': imageId },
    breadcrumb: { '@id': breadcrumbId },
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Practice of Clarity',
        url: new URL('/', canonicalUrl).href,
      },
      {
        '@type': 'ImageObject',
        '@id': imageId,
        url: imageUrl,
        contentUrl: imageUrl,
        width: imageWidth,
        height: imageHeight,
        caption: imageAlt,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: breadcrumb.name,
          item: breadcrumb.url,
        })),
      },
      webPage,
      ...(pageType === 'Article'
        ? [
            {
              '@type': 'Article',
              '@id': articleId,
              headline: title,
              description,
              inLanguage: locale,
              mainEntityOfPage: { '@id': webPageId },
              image: { '@id': imageId },
              publisher: { '@id': organizationId },
            },
          ]
        : []),
    ],
  };

  return {
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    content: JSON.stringify(graph).replaceAll('<', '\\u003c'),
  };
}
