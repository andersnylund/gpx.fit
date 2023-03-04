import { expect, test } from '@playwright/test';
import fs from 'fs/promises';
import { _experimentalParseGpx } from 'gpx-builder';

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

test('adds test route, smoothens, and exports', async ({ page }) => {
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
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export' }).click();
  const download = await downloadPromise;
  await download.saveAs(`./playwright/test-files/${download.suggestedFilename()}`);
  expect(download.suggestedFilename()).toBe('smoothened.gpx');
  const data = await fs.readFile(`./playwright/test-files/${download.suggestedFilename()}`, { encoding: 'utf8' });
  const builder = _experimentalParseGpx(data);
  expect(builder.toObject().trk?.at(0)?.trkseg?.at(0)?.trkpt.at(0)).toEqual({
    attributes: {
      lat: '60.2146386',
      lon: '24.9142349',
    },
    ele: 29.6,
    time: new Date('2023-03-03T08:45:20.000Z'),
  });
});
