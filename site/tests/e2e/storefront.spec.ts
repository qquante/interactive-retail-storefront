import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const keyRoutes = ['/', '/colecoes/intervalos', '/produtos/intervalo-01', '/carrinho', '/checkout'];

test.describe('HEAL storefront', () => {
  test('mantém as rotas principais sem overflow horizontal', async ({ page }) => {
    for (const route of keyRoutes) {
      await page.goto(route);
      await expect(page.locator('body')).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow em ${route}`).toBe(0);
    }
  });

  test('completa o handoff demonstrativo sem pedido ou pagamento', async ({ page }) => {
    await page.goto('/produtos/intervalo-01');
    await page.getByRole('button', { name: 'Adicionar à sacola demonstrativa' }).click();
    await expect(page.getByRole('status')).toContainText('foi adicionado');
    await page.getByRole('link', { name: 'Ver sacola' }).click();
    await page.getByLabel('CEP para simulação').fill('01001000');
    await page.getByRole('button', { name: 'Simular entrega' }).click();
    await expect(page.getByText('01001-***')).toBeVisible();
    await page.getByRole('link', { name: 'Revisar handoff demonstrativo' }).click();
    await expect(page.getByText('Nenhum pagamento será processado.')).toBeVisible();
    await page.getByRole('button', { name: 'Encerrar demonstração' }).click();
    await expect(page.getByRole('heading', { name: 'Demonstração encerrada.' })).toBeVisible();
  });

  test('bloqueia compra quando a disponibilidade não é autoritativa', async ({ page }) => {
    await page.goto('/produtos/intervalo-03');
    await expect(page.getByRole('button', { name: 'Adicionar à sacola demonstrativa' })).toBeDisabled();
    await expect(page.getByText('Não foi possível confirmar a disponibilidade.')).toBeVisible();
  });

  test('busca e filtro preservam URLs e mostram somente dados da fixture', async ({ page }) => {
    await page.goto('/busca');
    await page.getByLabel('O que você procura?').fill('Intervalo 02');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page).toHaveURL(/q=Intervalo(?:\+|%20)02/);
    await expect(page.getByRole('heading', { name: /1 resultado/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /HEAL Intervalo 02/ })).toBeVisible();

    await page.goto('/colecoes/intervalos');
    await page.getByLabel('Disponibilidade demonstrativa').selectOption('desconhecida');
    await page.getByRole('button', { name: 'Aplicar ordenação' }).click();
    await expect(page).toHaveURL(/disponibilidade=desconhecida/);
    await expect(page.getByText('1 produto exibido')).toBeVisible();
    await expect(page.getByRole('heading', { name: /HEAL Intervalo 03/ })).toBeVisible();
  });

  for (const route of ['/', '/colecoes/intervalos', '/produtos/intervalo-01']) {
    test(`não tem violações axe serious/critical em ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const blockers = results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');
      expect(blockers).toEqual([]);
    });
  }
});
