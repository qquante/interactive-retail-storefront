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
    const addButton = page.getByRole('button', { name: 'Adicionar à sacola demonstrativa' });
    await expect(addButton).toBeEnabled();
    await page.getByLabel('Quantidade').fill('2');
    await addButton.click();
    await expect(page.getByRole('status')).toContainText('foi adicionado');
    await page.getByRole('link', { name: 'Ver sacola' }).click();
    await expect(page.getByText('R$ 78,00').first()).toBeVisible();
    await page.reload();
    await expect(page.getByLabel(/Quantidade de Intervalo 01 — Incenso HEALS/).getByText('2')).toBeVisible();
    await page.getByRole('button', { name: /Remover Intervalo 01 — Incenso HEALS/ }).click();
    await expect(page.getByRole('heading', { name: 'Sua sacola demonstrativa está vazia.' })).toBeVisible();
    await page.getByRole('button', { name: 'Desfazer remoção' }).click();
    await expect(page.getByRole('heading', { name: /Intervalo 01 — Incenso HEALS/ })).toBeVisible();
    await page.getByLabel('CEP para simulação').fill('123');
    await page.getByRole('button', { name: 'Simular entrega' }).click();
    await expect(page.getByLabel('CEP para simulação')).toHaveAttribute('aria-invalid', 'true');
    await page.getByLabel('CEP para simulação').fill('01001000');
    await page.getByRole('button', { name: 'Simular entrega' }).click();
    await expect(page.getByText('01001-***')).toBeVisible();
    await page.getByRole('link', { name: 'Revisar handoff demonstrativo' }).click();
    await expect(page.getByText('Nenhum pagamento será processado.')).toBeVisible();
    await page.getByRole('button', { name: 'Encerrar demonstração' }).click();
    await expect(page.getByRole('heading', { name: 'Demonstração encerrada.' })).toBeVisible();
  });

  test('checkout vazio mantém erro e retry sem falso sucesso', async ({ page }) => {
    await page.goto('/checkout');
    await expect(page.getByRole('heading', { name: 'Não foi possível preparar a revisão.' })).toBeVisible();
    await expect(page.getByText('A sacola demonstrativa está vazia.')).toBeVisible();
    await page.getByRole('button', { name: 'Tentar novamente' }).click();
    await expect(page.getByText('A sacola demonstrativa está vazia.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Resumo demonstrativo' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Encerrar demonstração' })).toHaveCount(0);
  });

  test('404 genérico preserva navegação de saída', async ({ page }) => {
    const response = await page.goto('/rota-que-nao-existe');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Este caminho não foi encontrado.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Voltar ao início' })).toBeVisible();
  });

  test('mantém a fixture crawlable para leitura do noindex', async ({ page, request }) => {
    const robotsResponse = await request.get('/robots.txt');
    expect(robotsResponse.ok()).toBe(true);
    const robotsBody = await robotsResponse.text();
    expect(robotsBody).toContain('Allow: /');
    expect(robotsBody).not.toContain('Disallow: /');

    await page.goto('/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/i);
  });

  test('teclado alcança skip link e abre menu móvel', async ({ page, browserName }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: 'Pular para o conteúdo' });
    if (browserName === 'webkit') {
      // O WebKit headless não expõe a preferência macOS “Tab para destacar links”.
      // Ainda validamos a semântica focável e a ativação por teclado do link.
      await skipLink.focus();
    } else {
      await page.keyboard.press('Tab');
    }
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#conteudo$/);
    const menu = page.getByText('Menu', { exact: true });
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('details.mobile-menu')).toHaveAttribute('open', '');
  });

  test('reduced motion mantém fallback e conteúdo funcional', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto('/');
    const scene = page.locator('[data-state]').first();
    await expect(scene).toHaveAttribute('data-state', 'fallback');
    await expect(scene.locator('svg')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explorar incensos' })).toBeVisible();
    await context.close();
  });

  test('sacola e checkout preenchidos não têm violações axe', async ({ page }) => {
    await page.goto('/produtos/intervalo-01');
    await page.getByRole('button', { name: 'Adicionar à sacola demonstrativa' }).click();
    for (const route of ['/carrinho', '/checkout']) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(results.violations, `axe em ${route}`).toEqual([]);
    }
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
    await expect(page.getByRole('heading', { name: /Intervalo 02 — Incenso HEALS/ })).toBeVisible();

    await page.goto('/colecoes/intervalos');
    await page.getByLabel('Disponibilidade demonstrativa').selectOption('desconhecida');
    await page.getByRole('button', { name: 'Aplicar ordenação' }).click();
    await expect(page).toHaveURL(/disponibilidade=desconhecida/);
    await expect(page.getByText('1 produto exibido')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Intervalo 03 — Incenso HEALS/ })).toBeVisible();
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
