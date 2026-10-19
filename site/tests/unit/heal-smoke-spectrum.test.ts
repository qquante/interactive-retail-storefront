import { describe, expect, it } from 'vitest';
import { getRisingColorFront } from '../../components/experience/healSmokeSpectrum';

describe('progressão cromática da fumaça HEAL', () => {
  it('começa neutra, torna as primeiras cores visíveis e termina acima da pluma', () => {
    expect(getRisingColorFront(1)).toBeCloseTo(-0.14, 5);
    expect(getRisingColorFront(3)).toBeGreaterThan(0.35);
    expect(getRisingColorFront(10)).toBeCloseTo(1.16, 5);
  });

  it('mantém o front de cor sempre ascendente entre os dez níveis', () => {
    const fronts = Array.from({ length: 10 }, (_, index) => getRisingColorFront(index + 1));
    for (let index = 1; index < fronts.length; index += 1) {
      expect(fronts[index]).toBeGreaterThan(fronts[index - 1]);
    }
  });
});
