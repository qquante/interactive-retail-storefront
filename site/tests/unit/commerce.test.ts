import { describe, expect, it } from 'vitest';
import {
  BRL,
  addMoney,
  buildFixtureCartSnapshot,
  money,
  multiplyMoney,
  prepareFixtureHandoff,
} from '../../lib/commerce';

describe('money', () => {
  it('soma e multiplica valores decimais sem ponto flutuante', () => {
    expect(addMoney(money('39.00', BRL), money('12.00', BRL)).amount).toBe('51.00');
    expect(multiplyMoney(money('39.00', BRL), 3).amount).toBe('117.00');
  });

  it('recusa quantidade não inteira', () => {
    expect(() => multiplyMoney(money('39.00', BRL), 1.5)).toThrow();
  });
});

describe('fixture commerce invariants', () => {
  it('reconstrói totais a partir de IDs e quantidades, sem confiar em preço armazenado', () => {
    const result = buildFixtureCartSnapshot({
      cartId: 'fixture:cart:test',
      revision: '1',
      lines: [{ variantId: 'fixture:variant:intervalo-01', quantity: 2 }],
      shippingPostalCode: '01001000',
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.cost.subtotal.amount).toBe('78.00');
    expect(result.data.cost.shipping?.amount).toBe('12.00');
    expect(result.data.cost.total.amount).toBe('90.00');
    expect(result.data.shipping.status).toBe('available');
  });

  it('bloqueia handoff quando o inventário é desconhecido', () => {
    const cart = buildFixtureCartSnapshot({
      cartId: 'fixture:cart:test-unknown',
      revision: '1',
      lines: [{ variantId: 'fixture:variant:intervalo-03', quantity: 1 }],
    });

    expect(cart.ok).toBe(true);
    if (!cart.ok) return;
    const handoff = prepareFixtureHandoff(cart.data, 'fixture:test');
    expect(handoff.ok).toBe(false);
    if (handoff.ok) return;
    expect(handoff.error.code).toBe('INVENTORY_UNKNOWN');
  });
});
