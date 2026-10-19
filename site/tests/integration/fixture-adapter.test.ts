import { describe, expect, it } from "vitest";
import {
  FixtureCommerceAdapter,
  type IdempotencyKey,
  type MutationContext,
  type VariantId,
} from "../../lib/commerce";

function context(key: string, expectedCartRevision?: string): MutationContext {
  return {
    requestId: `test:${key}`,
    idempotencyKey: `test:${key}` as IdempotencyKey,
    expectedCartRevision,
  };
}

describe("FixtureCommerceAdapter integration", () => {
  it("encontra Olíbano com ou sem acento e sem diferenciar maiúsculas", async () => {
    const adapter = new FixtureCommerceAdapter();
    for (const search of ["olibano", "Olíbano", "OLIBANO"]) {
      const result = await adapter.listProducts({ search }, { limit: 24 });
      expect(result.ok).toBe(true);
      if (result.ok)
        expect(result.data.items.map((item) => item.handle)).toEqual([
          "olibano",
        ]);
    }
  });
  it("pagina o catálogo por cursor sem perder nem repetir produtos", async () => {
    const adapter = new FixtureCommerceAdapter();
    const first = await adapter.listProducts({}, { limit: 2 });
    expect(first.ok).toBe(true);
    if (!first.ok) return;
    expect(first.data.items).toHaveLength(2);
    expect(first.data.nextCursor).toBe("2");
    const secondCursor = first.data.nextCursor;
    if (!secondCursor) return;

    const second = await adapter.listProducts(
      {},
      { limit: 2, cursor: secondCursor },
    );
    expect(second.ok).toBe(true);
    if (!second.ok) return;
    expect(second.data.items).toHaveLength(2);
    expect(second.data.nextCursor).toBe("4");
    expect(second.data.items.map((item) => item.id)).not.toEqual(
      first.data.items.map((item) => item.id),
    );
    const thirdCursor = second.data.nextCursor;
    if (!thirdCursor) return;

    const third = await adapter.listProducts(
      {},
      { limit: 2, cursor: thirdCursor },
    );
    expect(third.ok).toBe(true);
    if (!third.ok) return;
    expect(third.data.items).toHaveLength(1);
    expect(third.data.nextCursor).toBeNull();
  });

  it("executa create → add → shipping → checkout com revalidação de revisão", async () => {
    const adapter = new FixtureCommerceAdapter();
    const created = await adapter.create(context("create"));
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const added = await adapter.addLine(
      created.data.id,
      { variantId: "fixture:variant:canela" as VariantId, quantity: 2 },
      context("add", created.data.revision),
    );
    expect(added.ok).toBe(true);
    if (!added.ok) return;

    const shipped = await adapter.estimate(
      added.data.id,
      { countryCode: "BR", postalCode: "01001000" },
      context("ship", added.data.revision),
    );
    expect(shipped.ok).toBe(true);
    if (!shipped.ok) return;
    expect(shipped.data.cost.total.amount).toBe("90.00");

    const handoff = await adapter.prepare(
      shipped.data.id,
      context("checkout", shipped.data.revision),
    );
    expect(handoff.ok).toBe(true);
    if (!handoff.ok) return;
    expect(handoff.data.kind).toBe("fixture");
  });

  it("rejeita revisão stale e devolve o snapshot mais recente", async () => {
    const adapter = new FixtureCommerceAdapter();
    const created = await adapter.create(context("stale-create"));
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const added = await adapter.addLine(
      created.data.id,
      {
        variantId: "fixture:variant:lavanda-celestial" as VariantId,
        quantity: 1,
      },
      context("stale-add", created.data.revision),
    );
    expect(added.ok).toBe(true);
    if (!added.ok) return;

    const conflict = await adapter.updateLine(
      added.data.id,
      { lineId: added.data.lines[0]!.id, quantity: 2 },
      context("stale-update", created.data.revision),
    );
    expect(conflict.ok).toBe(false);
    if (conflict.ok) return;
    expect(conflict.error.code).toBe("CART_CONFLICT");
    expect(conflict.error.currentCart?.revision).toBe(added.data.revision);
  });
});
