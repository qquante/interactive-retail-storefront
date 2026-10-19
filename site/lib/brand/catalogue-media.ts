/**
 * Imagens ilustrativas do catálogo. Mantém a mesma fotografia editorial nos
 * pontos de descoberta e de produto, sem substituir os dados comerciais.
 */
export const HEAL_CATALOGUE_MEDIA = {
  canela: {
    url: '/images/heals/catalogue-v2/canela.webp',
    alt: 'Imagem ilustrativa do incenso HEAL Canela: embalagem fechada e vareta de superfície rugosa.',
    width: 1122,
    height: 1402,
  },
  'lavanda-celestial': {
    url: '/images/heals/catalogue-v2/lavanda-celestial.webp',
    alt: 'Imagem ilustrativa do incenso HEAL Lavanda Celestial: embalagem fechada e vareta de superfície rugosa.',
    width: 1122,
    height: 1402,
  },
  mirra: {
    url: '/images/heals/catalogue-v2/mirra.webp',
    alt: 'Imagem ilustrativa do incenso HEAL Mirra: embalagem fechada e vareta de superfície rugosa.',
    width: 1122,
    height: 1402,
  },
  olibano: {
    url: '/images/heals/catalogue-v2/olibano.webp',
    alt: 'Imagem ilustrativa do incenso HEAL Olíbano: embalagem fechada e vareta de superfície rugosa.',
    width: 1122,
    height: 1402,
  },
  alecrim: {
    url: '/images/heals/catalogue-v2/alecrim.webp',
    alt: 'Imagem ilustrativa do incenso HEAL Alecrim: embalagem fechada e vareta de superfície rugosa.',
    width: 1122,
    height: 1402,
  },
} as const;

export type HealCatalogueId = keyof typeof HEAL_CATALOGUE_MEDIA;
