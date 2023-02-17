import { expect, test } from '@playwright/test';

test.setTimeout(35e3);

test('frontpage', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Add gpx file' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.getByRole('button', { name: 'Zoom in' }).click();
});

test('test 404', async ({ page }) => {
  const res = await page.goto('/post/not-found');
  expect(res?.status()).toBe(404);
});

test('server-side rendering test', async ({ browser }) => {
  // load the page without js
  const ssrContext = await browser.newContext({
    javaScriptEnabled: false,
  });
  const ssrPage = await ssrContext.newPage();
  await ssrPage.goto('/');
  expect(await ssrPage.content()).toContain('Add gpx file');
});
