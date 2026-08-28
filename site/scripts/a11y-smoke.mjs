import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const routes = ['/', '/colecoes/intervalos', '/produtos/intervalo-01'];
let failed = false;

for (const route of routes) {
  await page.goto(`http://localhost:3000${route}`);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const violations = result.violations.map(({ id, impact }) => `${id}:${impact}`);
  console.log(`${route} — ${violations.length ? violations.join(', ') : '0 violations'}`);
  if (violations.length) failed = true;
}

await browser.close();
if (failed) process.exitCode = 1;
