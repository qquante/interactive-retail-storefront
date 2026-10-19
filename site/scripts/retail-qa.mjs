import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const base = process.argv[2] || 'http://localhost:3002';
const output = process.argv[3];
if (!output) throw new Error('Informe um diretório de evidências.');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const routes = ['/', '/colecoes', '/colecoes/heals', '/produtos/canela', '/produtos/lavanda-celestial', '/produtos/mirra', '/produtos/olibano', '/produtos/alecrim', '/busca', '/busca?q=olibano', '/sobre', '/materia', '/como-escolher', '/profissionais', '/contato', '/guia', '/journal', '/seguranca', '/entrega-trocas', '/privacidade', '/termos', '/carrinho', '/checkout'];
const report = { base, capturedAt: new Date().toISOString(), routes: [], accessibility: [], motion: [], errors: [] };
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 } });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push({ width, message: error.message }));
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, h1: document.querySelectorAll('h1').length, main: document.querySelectorAll('main').length }));
      const item = { width, route, status: response.status(), ...dimensions };
      report.routes.push(item);
      if (item.status !== 200 || item.overflow > 0 || item.h1 !== 1 || item.main !== 1) report.errors.push(item);
      if (['/', '/colecoes/heals', '/produtos/canela', '/sobre', '/profissionais'].includes(route)) {
        const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
        const violations = axe.violations.map(({id,impact,nodes})=>({id,impact,count:nodes.length}));
        report.accessibility.push({width,route,violations});
        report.errors.push(...violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>({width,route,...v})));
      }
      if (['/', '/colecoes/heals', '/produtos/canela'].includes(route)) {
        if (route === '/') await page.waitForTimeout(14000);
        for (let y = 0; y < await page.locator('body').evaluate(e=>e.scrollHeight); y += 650) {
          await page.evaluate(y=>window.scrollTo(0,y), y);
          await page.waitForTimeout(80);
        }
        await page.evaluate(async()=>{ await Promise.all([...document.images].map(img=>img.decode().catch(()=>{}))); window.scrollTo(0,0); });
        await page.screenshot({path:path.join(output, `${route==='/'?'home':route.slice(1).replaceAll('/','-')}-${width}.png`), fullPage:true});
      }
    }
    await context.close();
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const variant of ['flow','helix','pulse']) {
    await page.goto(`${base}/?variant=${variant}`, {waitUntil:'networkidle'});
    const scene = page.locator('[data-motion-variant]');
    await page.waitForTimeout(15000);
    const state = await scene.evaluate(e=>({...e.dataset}));
    const first = await scene.locator('canvas').screenshot();
    await page.waitForTimeout(1500);
    const second = await scene.locator('canvas').screenshot();
    const changed = createHash('sha256').update(first).digest('hex') !== createHash('sha256').update(second).digest('hex');
    const item = {variant,state,changed};
    report.motion.push(item);
    if (state.state !== 'ready' || state.motionVariant !== 'pulse' || !changed || Number(state.colorCount)<9.9) report.errors.push(item);
  }
} finally {
  await browser.close();
  await writeFile(path.join(output,'browser-report.json'), JSON.stringify(report,null,2));
}
console.log(JSON.stringify({routes:report.routes.length,accessibility:report.accessibility.length,motion:report.motion,errors:report.errors},null,2));
if(report.errors.length) process.exitCode=1;
