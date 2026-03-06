import { expect, test } from '@playwright/test';

test.describe('installability', () => {
  test('manifest is linked in head', async ({ page }) => {
    await page.goto('/');
    const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(manifestHref).toBeTruthy();
  });

  test('manifest is fetchable and valid JSON', async ({ request }) => {
    const response = await request.get('/site.webmanifest');
    expect(response.status()).toBe(200);

    const manifest = await response.json();
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
  });

  test('manifest declares standalone display', async ({ request }) => {
    const manifest = await (await request.get('/site.webmanifest')).json();
    expect(manifest.display).toBe('standalone');
  });

  test('manifest has at least 4 icons (192+512 any, 192+512 maskable)', async ({ request }) => {
    const manifest = await (await request.get('/site.webmanifest')).json();
    const icons = manifest.icons as Array<{ src: string; sizes: string; purpose?: string }>;

    expect(icons.length).toBeGreaterThanOrEqual(4);

    const has192any = icons.some((i) => i.sizes === '192x192' && i.purpose?.includes('any'));
    const has512any = icons.some((i) => i.sizes === '512x512' && i.purpose?.includes('any'));
    const has192maskable = icons.some(
      (i) => i.sizes === '192x192' && i.purpose?.includes('maskable'),
    );
    const has512maskable = icons.some(
      (i) => i.sizes === '512x512' && i.purpose?.includes('maskable'),
    );

    expect(has192any, '192x192 any icon').toBe(true);
    expect(has512any, '512x512 any icon').toBe(true);
    expect(has192maskable, '192x192 maskable icon').toBe(true);
    expect(has512maskable, '512x512 maskable icon').toBe(true);
  });

  test('at least one icon has sizes 512x512', async ({ request }) => {
    const manifest = await (await request.get('/site.webmanifest')).json();
    const icons = manifest.icons as Array<{ sizes: string }>;
    const has512 = icons.some((i) => i.sizes === '512x512');
    expect(has512, '512x512 icon required for high-res install surfaces').toBe(true);
  });

  test('all manifest icons are reachable', async ({ request }) => {
    const manifest = await (await request.get('/site.webmanifest')).json();
    const icons = manifest.icons as Array<{ src: string }>;

    for (const icon of icons) {
      const response = await request.get(icon.src);
      expect(response.status(), `${icon.src} should return 200`).toBe(200);
      expect(response.headers()['content-type'], `${icon.src} should be image/png`).toContain(
        'image/png',
      );
      const body = await response.body();
      expect(body.length, `${icon.src} should not be empty`).toBeGreaterThan(0);
    }
  });

  test('at least one maskable icon exists', async ({ request }) => {
    const manifest = await (await request.get('/site.webmanifest')).json();
    const icons = manifest.icons as Array<{ purpose?: string }>;
    const hasMaskable = icons.some((i) => i.purpose?.includes('maskable'));
    expect(hasMaskable, 'at least one maskable icon').toBe(true);
  });

  test('apple-touch-icon is reachable', async ({ request }) => {
    const response = await request.get('/apple-touch-icon.png');
    expect(response.status()).toBe(200);
  });

  test('theme_color is consistent between manifest and meta tag', async ({ page, request }) => {
    await page.goto('/');
    const metaColor = await page.locator('meta[name="theme-color"]').getAttribute('content');

    const manifest = await (await request.get('/site.webmanifest')).json();

    expect(metaColor).toBeTruthy();
    expect(manifest.theme_color).toBeTruthy();
    expect(metaColor).toBe(manifest.theme_color);
  });
});
