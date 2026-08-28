import { describe, expect, it } from 'vitest';
import {
  FixtureCommerceAdapter,
  type IdempotencyKey,
  type MutationContext,
  type VariantId,
} from '../../lib/commerce';

function context(key: string, expectedCartRevision?: string): MutationContext {
  return {
    requestId: `test:${key}`,
    idempotencyKey: `test:${key}` as IdempotencyKey,
    expectedCartRevision,
  };
}

describe('FixtureCommerceAdapter integration', () => {
  it('executa create → add → shipping → checkout com revalidação de revisão', async () => {
    const adapter = new FixtureCommerceAdapter();
    const created = await adapter.create(context('create'));
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const added = await adapter.addLine(
      created.data.id,
      { variantId: 'fixture:variant:intervalo-01' as VariantId, quantity: 2 },
      context('add', created.data.revision),
    );
    expect(added.ok).toBe(true);
    if (!added.ok) return;

    const shipped = await adapter.estimate(
      added.data.id,
      { countryCode: 'BR', postalCode: '01001000' },
      context('ship', added.data.revision),
    );
    expect(shipped.ok).toBe(true);
    if (!shipped.ok) return;
    expect(shipped.data.cost.total.amount).toBe('90.00');

    const handoff = await adapter.prepare(
      shipped.data.id,
      context('checkout', shipped.data.revision),
    );
    expect(handoff.ok).toBe(true);
    if (!handoff.ok) return;
    expect(handoff.data.kind).toBe('fixture');
  });

  it('rejeita revisão stale e devolve o snapshot mais recente', async () => {
    const adapter = new FixtureCommerceAdapter();
    const created = await adapter.create(context('stale-create'));
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const added = await adapter.addLine(
      created.data.id,
      { variantId: 'fixture:variant:intervalo-02' as VariantId, quantity: 1 },
      context('stale-add', created.data.revision),
    );
    expect(added.ok).toBe(true);
    if (!added.ok) return;

    const conflict = await adapter.updateLine(
      added.data.id,
      { lineId: added.data.lines[0]!.id, quantity: 2 },
      context('stale-update', created.data.revision),
    );
    expect(conflict.ok).toBe(false);
    if (conflict.ok) return;
    expect(conflict.error.code).toBe('CART_CONFLICT');
    expect(conflict.error.currentCart?.revision).toBe(added.data.revision);
  });
});

