import { expect, test } from '@playwright/test';

const canonicalBase = '/en-us/shared/thinkfirst';

const handoutRoutes = [
  { path: '/thinkfirst', expectedPath: `${canonicalBase}/` },
  { path: '/shared/thinkfirst', expectedPath: `${canonicalBase}/` },
  { path: `${canonicalBase}/` },
  { path: `${canonicalBase}/repo-forensics-starter-prompt/` },
];

for (const route of handoutRoutes) {
  test(`handout route is reachable: ${route.path}`, async ({ page }) => {
    const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });

    expect(response?.status()).toBe(200);

    if (route.expectedPath) {
      await expect(page).toHaveURL(new RegExp(`${route.expectedPath.replace(/\//g, '\\/')}$`));
    }

    await expect(page.locator('body')).toContainText('ThinkFirst');
  });
}

test('repo-forensics handout exposes quick and full copy prompts', async ({ page }) => {
  await page.goto(`${canonicalBase}/repo-forensics-starter-prompt/`, {
    waitUntil: 'domcontentloaded',
  });

  await expect(page.getByRole('button', { name: 'Copy quick prompt' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy full prompt' })).toBeVisible();
  await expect(page.locator('body')).toContainText('Before changing anything, inspect first.');
});

test('shared handout pages are practitioner-only', async ({ page }) => {
  await page.goto(`${canonicalBase}/repo-forensics-starter-prompt/`, {
    waitUntil: 'domcontentloaded',
  });

  await expect(page.locator('input[name="poc-register"][value="practitioner"]')).toBeEnabled();
  await expect(page.locator('input[name="poc-register"][value="orientation"]')).toBeDisabled();
  await expect(page.locator('input[name="poc-register"][value="everyday"]')).toBeDisabled();
});
