import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(path.resolve('package.json'));
const { chromium } = require('@playwright/test');
const output = path.resolve('../docs/evidence/qa/catalogue-v2');
const handles = ['canela', 'lavanda-celestial', 'mirra', 'olibano', 'alecrim'];
const routes = ['/colecoes/heals', ...handles.map((id) => `/produtos/${id}`), '/'];
const viewports = [
  { width: 320, height: 700 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
];
const results = [];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    const page = await context.newPage();
    for (const route of routes) {
      const pageErrors = [];
      const consoleErrors = [];
      const resourceErrors = [];
      const onPageError = (error) => pageErrors.push(error.message);
      const onConsole = (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); };
      const onResponse = (response) => {
        if (decodeURIComponent(response.url()).includes('/images/heals/catalogue-v2/') && response.status() >= 400) {
          resourceErrors.push({ url: response.url(), status: response.status() });
        }
      };
      page.on('pageerror', onPageError);
      page.on('console', onConsole);
      page.on('response', onResponse);

      const response = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
      const scope = route === '/' ? page.locator('.home-products') : page.locator('main');
      const images = scope.locator('img[src*="catalogue-v2"]');
      const count = await images.count();
      for (let index = 0; index < count; index++) {
        const image = images.nth(index);
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((element) => element.decode());
      }
      const imageMetrics = await images.evaluateAll((elements) => elements.map((element) => {
        const style = getComputedStyle(element);
        const frame = element.parentElement;
        const frameStyle = getComputedStyle(frame);
        const bounds = element.getBoundingClientRect();
        const frameBounds = frame.getBoundingClientRect();
        return {
          src: new URL(element.currentSrc).searchParams.get('url') ?? new URL(element.currentSrc).pathname,
          alt: element.alt,
          complete: element.complete,
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight,
          objectFit: style.objectFit,
          transform: style.transform,
          frameAspectRatio: frameStyle.aspectRatio,
          width: bounds.width,
          height: bounds.height,
          frameWidth: frameBounds.width,
          frameHeight: frameBounds.height,
          captionOutsideFrame: frame.nextElementSibling?.tagName === 'FIGCAPTION',
        };
      }));

      let hover = null;
      if (count) {
        const first = images.first();
        await first.hover();
        await page.waitForTimeout(800);
        hover = await first.evaluate((element) => ({
          transform: getComputedStyle(element).transform,
          objectFit: getComputedStyle(element).objectFit,
        }));
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const expectedCount = route.startsWith('/produtos/') ? 1 : 5;
      const failures = [];
      if (response.status() !== 200) failures.push(`HTTP ${response.status()}`);
      if (count !== expectedCount) failures.push(`imageCount ${count}/${expectedCount}`);
      if (overflow !== 0) failures.push(`overflow ${overflow}`);
      if (pageErrors.length) failures.push('pageerror');
      if (consoleErrors.some((error) => /hydration|hydrate|server rendered/i.test(error))) failures.push('hydration');
      if (resourceErrors.length) failures.push('imageResource');
      if (imageMetrics.some((image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0 || Math.abs(image.naturalWidth / image.naturalHeight - 1122 / 1402) > 0.002 || image.objectFit !== 'contain' || image.frameAspectRatio !== '4 / 5' || !image.captionOutsideFrame)) failures.push('imageMetrics');
      if (hover && (hover.transform !== 'none' || hover.objectFit !== 'contain')) failures.push('hoverCrop');

      const record = { viewport, route, status: response.status(), count, overflow, pageErrors, consoleErrors, resourceErrors, imageMetrics, hover, failures };
      results.push(record);
      console.log(JSON.stringify({ width: viewport.width, route, count, overflow, pageErrors, consoleErrors, failures }));

      if ([390, 1440].includes(viewport.width)) {
        const slug = route === '/' ? 'home-products' : route.replaceAll('/', '-').slice(1);
        if (route === '/') {
          await scope.screenshot({ path: path.join(output, `${slug}-${viewport.width}.png`) });
        } else {
          await page.screenshot({ path: path.join(output, `${slug}-${viewport.width}.png`), fullPage: true });
        }
      }

      page.off('pageerror', onPageError);
      page.off('console', onConsole);
      page.off('response', onResponse);
    }
    await context.close();
  }
} finally {
  await browser.close();
  const report = {
    checkedAt: new Date().toISOString(),
    scope: 'Custom Chromium probe of catalogue image integration only; not the full Playwright E2E suite; no shader validation.',
    total: results.length,
    failed: results.filter((result) => result.failures.length).length,
    results,
  };
  await writeFile(path.join(output, 'browser-probe.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ total: report.total, failed: report.failed, report: path.join(output, 'browser-probe.json') }));
}

if (results.length !== 28 || results.some((result) => result.failures.length)) process.exitCode = 1;
