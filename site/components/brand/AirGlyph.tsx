import { getHealVariant, type HealVariantId } from '@/lib/brand/air-variants';

type AirGlyphProps = {
  variantId: HealVariantId;
  className?: string;
  animated?: boolean;
  decorative?: boolean;
};

export function AirGlyph({
  variantId,
  className,
  animated = false,
  decorative = false,
}: AirGlyphProps) {
  const variant = getHealVariant(variantId);
  if (!variant) return null;

  return (
    <svg
      className={className}
      viewBox="0 0 240 400"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : `Rastro visual ${variant.code} de ${variant.name}`}
      focusable="false"
      style={{ color: variant.color }}
      data-air-glyph={variant.id}
    >
      <path
        d={variant.counterPath}
        fill="none"
        opacity=".28"
        pathLength="1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        data-air-counter={animated ? '' : undefined}
      />
      <path
        d={variant.path}
        fill="none"
        pathLength="1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        vectorEffect="non-scaling-stroke"
        data-air-path={animated ? '' : undefined}
      />
      <path d="M120 352 L120 318" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="120" cy="360" r="7" fill="currentColor" data-air-source={animated ? '' : undefined} />
    </svg>
  );
}

