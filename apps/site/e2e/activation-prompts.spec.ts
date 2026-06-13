import { expect, test } from '@playwright/test';
import { MINIMAL_ACTIVATION_PROMPT, SEEDER_URL } from '../src/lib/activation-prompts';

const activationPages = [
  '/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load/',
] as const;

const architectureVariants = [
  '/en-us/about/architecture/?register=practitioner',
  '/en-us/about/architecture/?register=orientation',
] as const;

const pageVariants = activationPages.flatMap((url) => [
  { label: 'practitioner', url: `${url}?register=practitioner` },
  { label: 'orientation', url: `${url}?register=orientation` },
]);

test.describe('activation prompts', () => {
  for (const variant of pageVariants) {
    test(`${variant.label} activation surfaces render on ${variant.url}`, async ({ page }) => {
      await page.goto(variant.url);

      await expect(
        page.getByRole('button', { name: 'Copy minimal activation prompt' }),
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Copy guided activation prompt' }),
      ).toBeVisible();
      await expect(page.getByRole('button', { name: 'Copy seeder URL' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Open the public seeder URL' })).toBeVisible();
      await expect(page.locator('[data-copy-source="seeder-url"]:visible')).toContainText(
        SEEDER_URL,
      );
    });
  }

  test('copy minimal prompt writes the canonical prompt text', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load/');

    const copyButton = page.getByRole('button', { name: 'Copy minimal activation prompt' });
    await copyButton.click();

    await expect(copyButton).toContainText('Minimal prompt copied');

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(MINIMAL_ACTIVATION_PROMPT);
  });

  for (const url of architectureVariants) {
    test(`architecture routes to sensible defaults activation on ${url}`, async ({ page }) => {
      await page.goto(url);

      await expect(
        page.getByRole('main').getByRole('link', { name: 'Sensible Defaults', exact: true }),
      ).toHaveAttribute(
        'href',
        '/en-us/core-system/mandate-lenses/sensible-defaults-a-lens-you-can-load/',
      );
    });
  }
});
