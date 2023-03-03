import { expect, test } from '@playwright/test';

test.setTimeout(35e3);

test('frontpage', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Add gpx file' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.getByRole('button', { name: 'Zoom in' }).click();
});

test('test 404', async ({ page }) => {
  const res = await page.goto('/not-found');
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

test('adding test route', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Test' }).click();
  expect(page.getByRole('slider', { name: 'Track startpoint' })).toHaveValue('0');
  await page.getByRole('slider', { name: 'Track startpoint' }).press('ArrowRight');
  await page.getByRole('slider', { name: 'Track startpoint' }).press('ArrowRight');
  expect(page.getByRole('slider', { name: 'Track startpoint' })).toHaveValue('2');
  expect(page.getByRole('slider', { name: 'Track endpoint' })).toHaveValue('13');
  await page.getByRole('slider', { name: 'Track endpoint' }).press('ArrowLeft');
  await page.getByRole('slider', { name: 'Track endpoint' }).press('ArrowLeft');
  expect(page.getByRole('slider', { name: 'Track endpoint' })).toHaveValue('11');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('1');
  await page.getByRole('spinbutton').press('Enter');
});
