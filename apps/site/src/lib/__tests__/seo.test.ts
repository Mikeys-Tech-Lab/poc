import { describe, expect, it } from 'vitest';

import {
  buildSocialImageHeadEntries,
  buildStructuredDataHeadEntry,
  type HeadTag,
  hasSocialImageOverride,
  headHasMeta,
  imageTypeFromPath,
  resolveSocialImageUrl,
} from '../seo';

const site = new URL('https://practiceofclarity.eu');

describe('resolveSocialImageUrl', () => {
  it('absolutizes a root-relative path against the site', () => {
    expect(resolveSocialImageUrl({ socialImage: '/social/signals/structural/foo.png' }, site)).toBe(
      'https://practiceofclarity.eu/social/signals/structural/foo.png',
    );
  });

  it('returns undefined when no image is declared', () => {
    expect(resolveSocialImageUrl({}, site)).toBeUndefined();
  });

  it('ignores non-root-relative paths', () => {
    expect(resolveSocialImageUrl({ socialImage: 'social/foo.png' }, site)).toBeUndefined();
  });

  it('falls back to the raw path when site is undefined', () => {
    expect(resolveSocialImageUrl({ socialImage: '/social/foo.png' }, undefined)).toBe(
      '/social/foo.png',
    );
  });
});

describe('imageTypeFromPath', () => {
  it('maps known extensions to MIME types', () => {
    expect(imageTypeFromPath('/social/foo.png')).toBe('image/png');
    expect(imageTypeFromPath('/social/foo.jpg')).toBe('image/jpeg');
    expect(imageTypeFromPath('/social/foo.webp')).toBe('image/webp');
  });

  it('returns undefined for unknown extensions', () => {
    expect(imageTypeFromPath('/social/foo.svg')).toBeUndefined();
  });
});

describe('buildSocialImageHeadEntries', () => {
  const imageUrl = 'https://practiceofclarity.eu/social/signals/structural/foo.png';

  it('emits image, dimension and matching title/description tags', () => {
    const entries = buildSocialImageHeadEntries({
      title: 'A Title',
      description: 'A description',
      imageUrl,
      imageAlt: 'Alt text',
      imageWidth: 1200,
      imageHeight: 630,
      imageType: 'image/png',
    });

    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { property: 'og:image', content: imageUrl },
    });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { property: 'og:image:alt', content: 'Alt text' },
    });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { name: 'twitter:image:alt', content: 'Alt text' },
    });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { property: 'og:image:type', content: 'image/png' },
    });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { property: 'og:image:width', content: '1200' },
    });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { property: 'og:image:height', content: '630' },
    });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { name: 'twitter:image', content: imageUrl },
    });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { name: 'twitter:title', content: 'A Title' },
    });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { name: 'twitter:description', content: 'A description' },
    });
  });

  it('omits dimension tags when dimensions are unknown', () => {
    const entries = buildSocialImageHeadEntries({ title: 'A Title', imageUrl });
    expect(entries.some((entry) => entry.attrs?.property === 'og:image:width')).toBe(false);
    expect(entries.some((entry) => entry.attrs?.property === 'og:image:type')).toBe(false);
  });

  it('falls back to the title for image alt when none is given', () => {
    const entries = buildSocialImageHeadEntries({ title: 'A Title', imageUrl });
    expect(entries).toContainEqual({
      tag: 'meta',
      attrs: { property: 'og:image:alt', content: 'A Title' },
    });
  });

  it('omits twitter:description when no description is given', () => {
    const entries = buildSocialImageHeadEntries({ title: 'A Title', imageUrl });
    expect(entries.some((entry) => entry.attrs?.name === 'twitter:description')).toBe(false);
  });
});

describe('buildStructuredDataHeadEntry', () => {
  it('builds an Article graph from the canonical page metadata', () => {
    const entry = buildStructuredDataHeadEntry({
      pageType: 'Article',
      canonicalUrl: 'https://practiceofclarity.eu/en-us/signals/structural/example/',
      title: 'Example',
      description: 'A grounded description.',
      locale: 'en-US',
      imageUrl: 'https://practiceofclarity.eu/social/signals/structural/example.png',
      imageAlt: 'An image with meaning.',
      imageWidth: 1200,
      imageHeight: 630,
      breadcrumbs: [
        { name: 'Practice of Clarity', url: 'https://practiceofclarity.eu/en-us/' },
        {
          name: 'Structural Signals',
          url: 'https://practiceofclarity.eu/en-us/signals/structural/',
        },
        {
          name: 'Example',
          url: 'https://practiceofclarity.eu/en-us/signals/structural/example/',
        },
      ],
    });

    expect(entry.tag).toBe('script');
    expect(entry.attrs).toEqual({ type: 'application/ld+json' });

    const data = JSON.parse(entry.content ?? '{}');
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@graph'].map((node: { '@type': string }) => node['@type'])).toEqual([
      'Organization',
      'ImageObject',
      'BreadcrumbList',
      'WebPage',
      'Article',
    ]);
    expect(data['@graph'][1]).toMatchObject({
      '@type': 'ImageObject',
      width: 1200,
      height: 630,
      caption: 'An image with meaning.',
    });
    expect(data['@graph'][2].itemListElement).toHaveLength(3);
    expect(data['@graph'][4]).toMatchObject({
      '@type': 'Article',
      headline: 'Example',
      description: 'A grounded description.',
      inLanguage: 'en-US',
    });
  });

  it('escapes HTML-significant characters in JSON-LD script content', () => {
    const entry = buildStructuredDataHeadEntry({
      pageType: 'Article',
      canonicalUrl: 'https://practiceofclarity.eu/en-us/example/',
      title: '</script><script>alert(1)</script>',
      locale: 'en-US',
      imageUrl: 'https://practiceofclarity.eu/social/example.png',
      imageAlt: 'Example',
      imageWidth: 1200,
      imageHeight: 630,
      breadcrumbs: [],
    });

    expect(entry.content).not.toContain('</script>');
    expect(entry.content).toContain('\\u003c/script>');
  });

  it('uses CollectionPage without adding an Article node for signal indexes', () => {
    const entry = buildStructuredDataHeadEntry({
      pageType: 'CollectionPage',
      canonicalUrl: 'https://practiceofclarity.eu/en-us/signals/structural/',
      title: 'Structural',
      locale: 'en-US',
      imageUrl: 'https://practiceofclarity.eu/social/signals/default.png',
      imageAlt: 'Signals from the Practice of Clarity.',
      imageWidth: 1200,
      imageHeight: 630,
      breadcrumbs: [],
    });

    const data = JSON.parse(entry.content ?? '{}');
    expect(data['@graph'][3]['@type']).toEqual(['WebPage', 'CollectionPage']);
    expect(data['@graph'].some((node: { '@type': string }) => node['@type'] === 'Article')).toBe(
      false,
    );
  });
});

describe('headHasMeta', () => {
  const head: HeadTag[] = [
    { tag: 'meta', attrs: { property: 'og:image', content: 'https://example.com/existing.png' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: 'Existing' } },
  ];

  it('detects an existing meta tag by property', () => {
    expect(
      headHasMeta(head, { tag: 'meta', attrs: { property: 'og:image', content: 'new' } }),
    ).toBe(true);
  });

  it('detects an existing meta tag by name', () => {
    expect(
      headHasMeta(head, { tag: 'meta', attrs: { name: 'twitter:title', content: 'new' } }),
    ).toBe(true);
  });

  it('returns false for a tag not present in the head', () => {
    expect(
      headHasMeta(head, { tag: 'meta', attrs: { name: 'twitter:image', content: 'new' } }),
    ).toBe(false);
  });
});

describe('hasSocialImageOverride', () => {
  it('treats either root image tag as ownership of the complete metadata group', () => {
    expect(
      hasSocialImageOverride([
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://example.com/card.png' } },
      ]),
    ).toBe(true);
    expect(
      hasSocialImageOverride([
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://example.com/card.png' },
        },
      ]),
    ).toBe(true);
  });

  it('does not treat unrelated metadata as an image override', () => {
    expect(
      hasSocialImageOverride([
        { tag: 'meta', attrs: { property: 'og:title', content: 'Example' } },
      ]),
    ).toBe(false);
  });
});
