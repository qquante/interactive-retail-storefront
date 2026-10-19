import { describe, expect, it } from 'vitest';
import { HEAL_VARIANTS } from '../../lib/brand/air-variants';

describe('HEAL brand variants', () => {
  it('mantém códigos, nomes e rastros únicos para expansão do catálogo', () => {
    expect(new Set(HEAL_VARIANTS.map((variant) => variant.id)).size).toBe(HEAL_VARIANTS.length);
    expect(new Set(HEAL_VARIANTS.map((variant) => variant.code)).size).toBe(HEAL_VARIANTS.length);
    expect(new Set(HEAL_VARIANTS.map((variant) => variant.path)).size).toBe(HEAL_VARIANTS.length);
  });

  it('não transforma hipótese cultural em promessa de produto', () => {
    const blockedClaims = /prosperidade|atrai dinheiro|protege|proteção|invoca|invocação|cura|trata|garante/i;
    for (const variant of HEAL_VARIANTS) {
      expect(`${variant.motionLabel} ${variant.reading} ${variant.designNote}`).not.toMatch(blockedClaims);
    }
  });
});
