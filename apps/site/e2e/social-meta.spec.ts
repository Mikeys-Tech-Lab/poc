import { expect, test } from '@playwright/test';
import { SIGNAL_FALLBACK_SOCIAL_IMAGE, SIGNAL_FALLBACK_SOCIAL_IMAGE_ALT } from '../src/consts';

const articlePath = '/en-us/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier/';
const articleUrl = `https://practiceofclarity.eu${articlePath}`;
const articleTitle = 'AI Is Not Magic. It Is a Cognitive Amplifier.';
const articleDescription =
  'AI is not magic. It is a cognitive amplifier. Explore how data, infrastructure, ownership, and power determine what AI amplifies, who benefits, who pays, and what trace remains.';
const articleImage =
  'https://practiceofclarity.eu/social/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier.png';
const articleImageAlt =
  'Editorial illustration of a microphone connected to data sources, models, infrastructure, interfaces, and decisions at scale, representing AI as a cognitive amplifier whose societal impact depends on who controls the system.';
const fallbackImage = `https://practiceofclarity.eu${SIGNAL_FALLBACK_SOCIAL_IMAGE}`;
const fallbackSignals = [
  { path: '/en-us/signals/structural/', pageType: 'CollectionPage' },
  { path: '/en-us/signals/operational/work-delivery/', pageType: 'CollectionPage' },
  {
    path: '/en-us/signals/operational/work-delivery/integration-lag/',
    pageType: 'CollectionPage',
  },
  {
    path: '/en-us/signals/operational/work-delivery/integration-lag/we-started-shipping-faster-understanding-less/',
    pageType: 'Article',
  },
  {
    path: '/en-us/signals/operational/work-delivery/integration-lag/a-path-through-integration-lag/',
    pageType: 'Article',
  },
  {
    path: '/en-us/signals/operational/work-delivery/integration-lag/the-verification-tax/',
    pageType: 'Article',
  },
] as const;

const metaContent = (page: import('@playwright/test').Page, selector: string) =>
  page.locator(`head ${selector}`).getAttribute('content');

test.describe('social preview metadata', () => {
  test('the signal article exposes text-based OG and Twitter tags', async ({ page }) => {
    await page.goto(articlePath);

    await expect(page).toHaveTitle(`${articleTitle} | Practice of Clarity`);
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', articleUrl);
    expect(await metaContent(page, 'meta[property="og:title"]')).toBe(articleTitle);
    expect(await metaContent(page, 'meta[property="og:description"]')).toBe(articleDescription);
    expect(await metaContent(page, 'meta[property="og:url"]')).toBe(articleUrl);
    expect(await metaContent(page, 'meta[name="twitter:card"]')).toBe('summary_large_image');
  });

  test('the signal article exposes absolute, category-organized image tags', async ({ page }) => {
    await page.goto(articlePath);

    const ogImage = await metaContent(page, 'meta[property="og:image"]');
    const twitterImage = await metaContent(page, 'meta[name="twitter:image"]');

    expect(ogImage).toBe(articleImage);
    expect(twitterImage).toBe(articleImage);
    expect(await metaContent(page, 'meta[name="twitter:title"]')).toBe(articleTitle);
    expect(await metaContent(page, 'meta[name="twitter:description"]')).toBe(articleDescription);

    const ogAlt = await metaContent(page, 'meta[property="og:image:alt"]');
    const twitterAlt = await metaContent(page, 'meta[name="twitter:image:alt"]');
    expect(ogAlt).toBe(articleImageAlt);
    expect(twitterAlt).toBe(articleImageAlt);
  });

  test('the image tags declare type and dimensions for reliable first-fetch rendering', async ({
    page,
  }) => {
    await page.goto(articlePath);

    expect(await metaContent(page, 'meta[property="og:image:type"]')).toBe('image/png');
    expect(await metaContent(page, 'meta[property="og:image:width"]')).toBe('1200');
    expect(await metaContent(page, 'meta[property="og:image:height"]')).toBe('630');
  });

  test('description is consistent across meta, OG and Twitter tags', async ({ page }) => {
    await page.goto(articlePath);

    const metaDescription = await metaContent(page, 'meta[name="description"]');
    const ogDescription = await metaContent(page, 'meta[property="og:description"]');
    const twitterDescription = await metaContent(page, 'meta[name="twitter:description"]');

    expect(metaDescription).toBeTruthy();
    expect(metaDescription).toBe(articleDescription);
    expect(ogDescription).toBe(articleDescription);
    expect(twitterDescription).toBe(articleDescription);
  });

  test('the article exposes one coherent JSON-LD graph', async ({ page }) => {
    await page.goto(articlePath);

    const scripts = page.locator('head script[type="application/ld+json"]');
    await expect(scripts).toHaveCount(1);
    const data = JSON.parse((await scripts.textContent()) ?? '{}');
    const graph = data['@graph'] as Array<Record<string, unknown>>;

    expect(graph.map((node) => node['@type'])).toEqual([
      'Organization',
      'ImageObject',
      'BreadcrumbList',
      'WebPage',
      'Article',
    ]);
    expect(graph.find((node) => node['@type'] === 'ImageObject')).toMatchObject({
      url: articleImage,
      width: 1200,
      height: 630,
      caption: articleImageAlt,
    });
    expect(graph.find((node) => node['@type'] === 'Article')).toMatchObject({
      headline: articleTitle,
      description: articleDescription,
      inLanguage: 'en-US',
    });
    expect(graph.find((node) => node['@type'] === 'WebPage')).toMatchObject({
      url: articleUrl,
      name: articleTitle,
      description: articleDescription,
    });
    const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList');
    expect(breadcrumb).toBeDefined();
    const breadcrumbItems = breadcrumb?.itemListElement as Array<{ name: string }> | undefined;
    expect(breadcrumbItems?.map((item) => item.name)).toEqual([
      'Practice of Clarity',
      'Structural',
      articleTitle,
    ]);
  });

  test('other signal pages use the fallback card and matching structured data', async ({
    page,
  }) => {
    for (const signal of fallbackSignals) {
      await page.goto(signal.path);

      expect(await metaContent(page, 'meta[property="og:image"]')).toBe(fallbackImage);
      expect(await metaContent(page, 'meta[name="twitter:image"]')).toBe(fallbackImage);
      expect(await metaContent(page, 'meta[property="og:image:alt"]')).toBe(
        SIGNAL_FALLBACK_SOCIAL_IMAGE_ALT,
      );
      expect(await metaContent(page, 'meta[property="og:image:width"]')).toBe('1200');
      expect(await metaContent(page, 'meta[property="og:image:height"]')).toBe('630');

      const script = page.locator('head script[type="application/ld+json"]');
      await expect(script).toHaveCount(1);
      const data = JSON.parse((await script.textContent()) ?? '{}');
      const graph = data['@graph'] as Array<Record<string, unknown>>;
      if (signal.pageType === 'Article') {
        expect(graph.some((node) => node['@type'] === 'Article')).toBe(true);
      } else {
        expect(
          graph.some(
            (node) => Array.isArray(node['@type']) && node['@type'].includes('CollectionPage'),
          ),
        ).toBe(true);
      }
    }
  });

  test('the social image is reachable', async ({ page, request }) => {
    await page.goto(articlePath);
    const ogImage = await metaContent(page, 'meta[property="og:image"]');
    expect(ogImage).toBeTruthy();

    const response = await request.get(new URL(ogImage as string).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('a page without a social image omits the image tags', async ({ page }) => {
    await page.goto('/en-us/about/what-this-is/');
    await expect(page.locator('head meta[property="og:image"]')).toHaveCount(0);
    await expect(page.locator('head meta[name="twitter:image"]')).toHaveCount(0);
  });

  test('the sitemap index is linked and reachable', async ({ page, request }) => {
    await page.goto('/en-us/');
    const sitemapHref = await page.locator('head link[rel="sitemap"]').getAttribute('href');
    expect(sitemapHref).toBeTruthy();

    const response = await request.get(sitemapHref as string);
    expect(response.status()).toBe(200);
  });
});
