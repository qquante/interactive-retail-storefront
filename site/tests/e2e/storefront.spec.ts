import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { HEAL_CATALOGUE_MEDIA } from "../../lib/brand/catalogue-media";

const keyRoutes = [
  "/",
  "/colecoes/heals",
  "/produtos/canela",
  "/sobre",
  "/profissionais",
  "/carrinho",
  "/checkout",
];

test.describe("HEAL storefront", () => {
  test("mantém as rotas principais sem overflow horizontal", async ({
    page,
  }) => {
    for (const route of keyRoutes) {
      await page.goto(route);
      await expect(page.locator("body")).toBeVisible();
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow, `overflow em ${route}`).toBe(0);
    }
  });

  test("não expõe compra enquanto a operação comercial está fechada", async ({
    page,
  }) => {
    await page.goto("/produtos/canela");
    await expect(
      page
        .getByText(
          "Este incenso ainda não está disponível para compra online.",
          { exact: false },
        )
        .first(),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Adicionar/ })).toHaveCount(
      0,
    );
    await page.goto("/carrinho");
    await expect(
      page.getByRole("heading", { name: "A sacola abre com a loja." }),
    ).toBeVisible();
    await page.goto("/checkout");
    await expect(
      page.getByRole("heading", { name: "Nenhum pagamento começa aqui." }),
    ).toBeVisible();
  });

  test("usa a assinatura HEAL e a imagem atual do catálogo", async ({
    page,
  }) => {
    await page.goto("/produtos/canela");
    await expect(
      page.getByRole("link", { name: "HEAL — início" }).first().locator("svg"),
    ).toBeVisible();
    const media = HEAL_CATALOGUE_MEDIA.canela;
    const image = page.getByRole("img", { name: media.alt });
    await expect(image).toBeVisible();
    await expect(image).toHaveCSS("object-fit", "contain");
    const source = new URL((await image.getAttribute("src")) ?? "", page.url());
    expect(source.searchParams.get("url") ?? source.pathname).toBe(media.url);
  });

  test("a fumaça pode ser pausada sem interromper a navegação", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Pausar animação" }).click();
    await expect(page.locator("[data-motion-variant]")).toHaveAttribute(
      "data-paused",
      "true",
    );
    await expect(
      page.getByRole("button", { name: "Retomar animação" }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Retomar animação" }).click();
    await expect(page.locator("[data-motion-variant]")).not.toHaveAttribute(
      "data-paused",
    );
    await page.getByRole("link", { name: "Ver Olíbano", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Olíbano");
  });

  test("404 genérico preserva navegação de saída", async ({ page }) => {
    const response = await page.goto("/rota-que-nao-existe");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Este caminho não foi encontrado." }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Voltar ao início" }),
    ).toBeVisible();
  });

  test("pré-lançamento permanece crawlable para leitura do noindex", async ({
    page,
    request,
  }) => {
    const robotsResponse = await request.get("/robots.txt");
    expect(robotsResponse.ok()).toBe(true);
    const robotsBody = await robotsResponse.text();
    expect(robotsBody).toContain("Allow: /");
    expect(robotsBody).not.toContain("Disallow: /");

    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/i,
    );
  });

  test("teclado alcança skip link e abre menu móvel", async ({
    page,
    browserName,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: "Pular para o conteúdo" });
    if (browserName === "webkit") await skipLink.focus();
    else await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#conteudo$/);
    const menu = page.getByRole("button", { name: "Abrir menu" });
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("dialog", { name: "HEAL", exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
  });

  test("reduced motion mantém o incenso sem glyph e o conteúdo funcional", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("/");
    const scene = page.locator("[data-state]").first();
    await expect(scene).toHaveAttribute("data-state", "fallback");
    await expect(scene.locator("[data-incense-stick]")).toBeVisible();
    await expect(scene.locator("svg")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Explorar incensos", exact: true }),
    ).toBeVisible();
    await context.close();
  });

  test("mantém fumaça, combustão e vareta na mesma âncora responsiva", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop");
    test.setTimeout(60_000);

    for (const viewport of [
      { width: 320, height: 700 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/?variant=flow");
      const scene = page.locator("[data-motion-variant]");
      await expect(scene).toHaveAttribute("data-state", "ready", {
        timeout: 10_000,
      });
      await expect(scene).toHaveAttribute("data-source-x", /\d/);
      await expect(scene).toHaveAttribute("data-source-y", /\d/);
      await page.evaluate(() => {
        window.dispatchEvent(
          new CustomEvent("heal:motion-control", { detail: { paused: true } }),
        );
      });

      const alignment = await scene.evaluate((element) => {
        const anchor = element.querySelector<HTMLElement>(
          "[data-combustion-anchor]",
        );
        const stick = element.querySelector<HTMLElement>(
          "[data-incense-stick]",
        );
        const core = element.querySelector<HTMLElement>(
          '[data-combustion-layer="core"]',
        );
        const halo = element.querySelector<HTMLElement>(
          '[data-combustion-layer="halo"]',
        );
        const heat = element.querySelector<HTMLElement>(
          '[data-combustion-layer="heat"]',
        );
        const sparks = element.querySelector<HTMLElement>(
          '[data-combustion-layer="sparks"]',
        );
        if (!anchor || !stick || !core || !halo || !heat || !sparks)
          return null;

        const anchorBounds = anchor.getBoundingClientRect();
        const stickBounds = stick.getBoundingClientRect();
        const coreBounds = core.getBoundingClientRect();
        const haloBounds = halo.getBoundingClientRect();
        const heatBounds = heat.getBoundingClientRect();
        const sparksBounds = sparks.getBoundingClientRect();
        const rootBounds = element.getBoundingClientRect();
        const sourceX = Number(element.dataset.sourceX);
        const sourceY = Number(element.dataset.sourceY);
        const anchorPoint = { x: anchorBounds.x, y: anchorBounds.y };
        const sourcePoint = {
          x: rootBounds.x + sourceX * rootBounds.width,
          y: rootBounds.y + (1 - sourceY) * rootBounds.height,
        };
        const center = (bounds: DOMRect) => ({
          x: bounds.x + bounds.width / 2,
          y: bounds.y + bounds.height / 2,
        });

        return {
          anchorToStickCenterX:
            anchorPoint.x - (stickBounds.x + stickBounds.width / 2),
          anchorToStickTopY: anchorPoint.y - stickBounds.y,
          core: center(coreBounds),
          halo: center(haloBounds),
          heatBase: {
            x: heatBounds.x + heatBounds.width / 2,
            y: heatBounds.bottom,
          },
          sparks: { x: sparksBounds.x, y: sparksBounds.y },
          anchor: anchorPoint,
          source: sourcePoint,
        };
      });

      expect(alignment, `${viewport.width}×${viewport.height}`).not.toBeNull();
      if (!alignment) continue;
      const distance = (
        a: { x: number; y: number },
        b: { x: number; y: number },
      ) => Math.hypot(a.x - b.x, a.y - b.y);
      expect(Math.abs(alignment.anchorToStickCenterX)).toBeLessThanOrEqual(
        0.75,
      );
      expect(alignment.anchorToStickTopY).toBeGreaterThanOrEqual(0);
      expect(alignment.anchorToStickTopY).toBeLessThanOrEqual(8);
      expect(distance(alignment.source, alignment.anchor)).toBeLessThanOrEqual(
        1,
      );
      expect(distance(alignment.core, alignment.anchor)).toBeLessThanOrEqual(2);
      expect(distance(alignment.halo, alignment.anchor)).toBeLessThanOrEqual(2);
      expect(
        distance(alignment.heatBase, alignment.anchor),
      ).toBeLessThanOrEqual(2);
      expect(distance(alignment.sparks, alignment.anchor)).toBeLessThanOrEqual(
        0.75,
      );
    }
  });

  test("economia de dados impede o runtime Three sem bloquear a experiência", async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "connection", {
        configurable: true,
        value: {
          effectiveType: "4g",
          saveData: true,
          addEventListener() {},
          removeEventListener() {},
        },
      });
    });
    await page.goto("/");
    await expect(page.locator("[data-state]").first()).toHaveAttribute(
      "data-state",
      "fallback",
    );
    await page.waitForTimeout(500);
    const loadedThreeChunk = await page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .some((entry) => entry.name.includes("createEmberSmokeRuntime")),
    );
    expect(loadedThreeChunk).toBe(false);
    await page.getByRole("link", { name: "Ver Mirra", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mirra");
    await context.close();
  });

  test("sem WebGL2 conserva incenso, seleção e navegação", async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        type: string,
        ...args: unknown[]
      ) {
        if (type === "webgl2") return null;
        return original.call(
          this,
          type,
          ...(args as []),
        ) as RenderingContext | null;
      } as typeof HTMLCanvasElement.prototype.getContext;
    });
    await page.goto("/");
    await expect(page.locator("[data-state]").first()).toHaveAttribute(
      "data-state",
      "fallback",
    );
    await page.getByRole("link", { name: "Ver Alecrim", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Alecrim");
    await context.close();
  });

  test("perda repetida de contexto fixa fallback sem quebrar a seleção", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop");
    await page.goto("/");
    const scene = page.locator("[data-state]").first();
    const canvas = scene.locator("canvas");
    await expect(scene).toHaveAttribute("data-state", "ready", {
      timeout: 10_000,
    });

    await canvas.dispatchEvent("webglcontextlost");
    await expect(scene).toHaveAttribute("data-state", "fallback");
    await canvas.dispatchEvent("webglcontextrestored");
    await expect(scene).toHaveAttribute("data-state", "ready", {
      timeout: 10_000,
    });

    await canvas.dispatchEvent("webglcontextlost");
    await expect(scene).toHaveAttribute("data-state", "fallback");
    await canvas.dispatchEvent("webglcontextrestored");
    await page.waitForTimeout(300);
    await expect(scene).toHaveAttribute("data-state", "fallback");
    await expect(
      page.getByRole("link", { name: "Ver Lavanda Celestial", exact: true }),
    ).toBeVisible();
    await expect(scene).toHaveAttribute("data-state", "fallback");
  });

  test("busca e coleção preservam URLs e conteúdo atual", async ({ page }) => {
    await page.goto("/busca");
    await page.getByLabel("O que você procura?").fill("Canela");
    await page.getByRole("button", { name: "Buscar", exact: true }).click();
    await expect(page).toHaveURL(/q=Canela/);
    await expect(
      page.getByRole("heading", { name: /1 resultado/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Canela", exact: true }),
    ).toBeVisible();

    await page.goto("/colecoes/heals");
    await page.getByLabel("Organizar coleção").selectOption("title_asc");
    await page.getByRole("button", { name: "Organizar" }).click();
    await expect(page).toHaveURL(/ordem=title_asc/);
    await expect(page.getByText("5 incensos na coleção")).toBeVisible();
  });

  test("não mostra linguagem interna de demonstração nas rotas públicas", async ({
    page,
  }) => {
    for (const route of keyRoutes) {
      await page.goto(route);
      await expect(page.locator("body")).not.toContainText(/demonstração/i);
    }
  });

  for (const route of [
    "/",
    "/colecoes/heals",
    "/produtos/canela",
    "/profissionais",
  ]) {
    test(`não tem violações axe serious/critical em ${route}`, async ({
      page,
    }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      const blockers = results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(blockers).toEqual([]);
    });
  }
});
