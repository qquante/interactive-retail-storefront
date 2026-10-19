import { test, expect } from "@playwright/test";
test("busca do cabeçalho funciona por teclado e aceita termos sem acento", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Buscar incensos" }).click();
  const dialog = page.getByRole("dialog", { name: "Encontre seu incenso" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Nome do aroma").fill("olibano");
  await dialog.getByRole("button", { name: "Buscar", exact: true }).click();
  await expect(page).toHaveURL(/q=olibano/);
  await expect(
    page.getByRole("heading", { name: "Olíbano", exact: true }),
  ).toBeVisible();
});
test("produtos são apresentados antes dos banners, sem preço fictício", async ({
  page,
}) => {
  await page.goto("/");
  const products = page.locator("#colecao");
  await expect(products.locator("article")).toHaveCount(5);
  const productTop = await products.evaluate(
    (e) => e.getBoundingClientRect().top,
  );
  const campaignTop = await page
    .locator(".retail-campaign")
    .evaluate((e) => e.getBoundingClientRect().top);
  expect(productTop).toBeLessThan(campaignTop);
  await expect(page.locator("main")).not.toContainText(
    /R\$|Publicação pendente|código visual|coreografia/i,
  );
  await page.goto("/produtos/lavanda-celestial");
  await page.getByText("Sobre este incenso", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText(
    "As imagens são ilustrativas",
  );
  await expect(page.locator("main")).not.toContainText(/R\$/);
});
