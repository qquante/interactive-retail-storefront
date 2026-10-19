import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';

test('Pulsos é o padrão único, independente de URL, teclado e tamanho', async ({ page }) => {
  for (const [width, query] of [[320, ''], [390, '?variant=flow'], [768, '?variant=helix'], [1440, '?variant=pulse']] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/${query}`);
    await expect(page.locator('[data-motion-variant]')).toHaveAttribute('data-motion-variant', 'pulse');
    const framing = await page.locator('[data-motion-variant]').evaluate(element => {
      const root = element.getBoundingClientRect();
      const stick = element.querySelector('[data-incense-stick]')!.getBoundingClientRect();
      const anchor = element.querySelector('[data-combustion-anchor]')!.getBoundingClientRect();
      return {tipHeight: root.bottom - anchor.top, bodyBelowFrame: stick.bottom > root.bottom};
    });
    expect(framing.tipHeight).toBeGreaterThan(45);
    expect(framing.tipHeight).toBeLessThan(100);
    expect(framing.bodyBelowFrame).toBe(true);
    await expect(page.getByRole('group', {name:'Variações temporárias do movimento da fumaça'})).toHaveCount(0);
    await expect(page.getByRole('button', {name:/Ver variação anterior|Ver próxima variação/})).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[data-motion-variant]')).toHaveAttribute('data-motion-variant', 'pulse');
  }
});

test('mantém dez cores e movimento no canvas depois da introdução', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop');
  test.setTimeout(45000);
  await page.goto('/');
  const scene=page.locator('[data-motion-variant]');
  await expect(scene).toHaveAttribute('data-state','ready');
  await expect(scene).toHaveAttribute('data-color-count','10',{timeout:20000});
  const first=await scene.locator('canvas').screenshot();
  await page.waitForTimeout(1500);
  const second=await scene.locator('canvas').screenshot();
  expect(createHash('sha256').update(first).digest('hex')).not.toBe(createHash('sha256').update(second).digest('hex'));
  await expect(page.getByRole('button',{name:'Pausar animação'})).toBeVisible();
});
