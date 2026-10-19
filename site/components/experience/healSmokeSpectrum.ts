const COLOR_LEVEL_MIN = 1;
const COLOR_LEVEL_MAX = 10;
const RISING_FRONT_MIN = -0.14;
const RISING_FRONT_MAX = 1.16;
const EARLY_RISE_EXPONENT = 2.15;

export function getRisingColorFront(colorLevel: number) {
  const normalized = Math.min(
    1,
    Math.max(0, (colorLevel - COLOR_LEVEL_MIN) / (COLOR_LEVEL_MAX - COLOR_LEVEL_MIN)),
  );
  const earlyRise = 1 - (1 - normalized) ** EARLY_RISE_EXPONENT;
  return RISING_FRONT_MIN + (RISING_FRONT_MAX - RISING_FRONT_MIN) * earlyRise;
}
