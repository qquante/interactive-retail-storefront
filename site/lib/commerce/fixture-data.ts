import { BRL, money } from './money';
import type {
  Collection,
  CollectionId,
  DataProvenance,
  DateTimeIso,
  Inventory,
  Product,
  ProductId,
  Variant,
  VariantId,
} from './types';

export const FIXTURE_BANNER =
  'Demonstração — produtos, valores, estoque e frete fictícios; nenhum pagamento será processado.';

export const FIXTURE_SUMMARY =
  'Produto fictício criado para validar hierarquia, navegação e estados da loja. Aroma, composição, origem, formato, intensidade, fumaça, preço e disponibilidade não são informações reais.';

export const FIXTURE_CHECKED_AT =
  '2026-08-28T14:00:00.000Z' as DateTimeIso;

export const FIXTURE_PROVENANCE: DataProvenance = {
  mode: 'fixture',
  provider: 'fixture',
  fetchedAt: FIXTURE_CHECKED_AT,
  label: 'Demonstração — dados fictícios',
};

const INTERVALOS_ID = 'fixture:collection:intervalos' as CollectionId;

function fixtureInventory(status: Inventory['status']): Inventory {
  return {
    status,
    availableQuantity: null,
    purchasePolicy: 'deny',
    checkedAt: FIXTURE_CHECKED_AT,
  };
}

function fixtureVariant(
  sequence: string,
  amount: string,
  inventoryStatus: Inventory['status'],
): Variant {
  return {
    id: `fixture:variant:intervalo-${sequence}` as VariantId,
    sku: { value: `FIXTURE-HEAL-INT-${sequence}` },
    title: 'Opção demonstrativa única',
    options: [{ optionName: 'Formato', value: '[A VALIDAR]' }],
    price: {
      current: money(amount, BRL),
      compareAt: null,
      unitLabel: null,
      includesTax: null,
      checkedAt: FIXTURE_CHECKED_AT,
    },
    inventory: fixtureInventory(inventoryStatus),
    image: null,
    active: true,
  };
}

function fixtureProduct(
  sequence: '01' | '02' | '03',
  amount: string,
  inventoryStatus: Inventory['status'],
): Product {
  const title = `HEAL Intervalo ${sequence} — Incenso [FORMATO A VALIDAR] [DEMONSTRAÇÃO]`;

  return {
    id: `fixture:product:intervalo-${sequence}` as ProductId,
    handle: `intervalo-${sequence}`,
    title,
    summary: FIXTURE_SUMMARY,
    descriptionHtml: `<p>${FIXTURE_SUMMARY}</p>`,
    status: 'active',
    featuredImage: null,
    images: [],
    sensory: {
      aromaticFamily: null,
      descriptors: [],
      perceivedIntensity: null,
      smokeLevel: null,
      methodologyRef: null,
    },
    facts: {
      format: null,
      ingredients: null,
      origin: null,
      quantityLabel: null,
      burnTimeLabel: null,
      usage: null,
      safety: null,
    },
    variants: [fixtureVariant(sequence, amount, inventoryStatus)],
    collectionIds: [INTERVALOS_ID],
    provenance: FIXTURE_PROVENANCE,
  };
}

export const FIXTURE_PRODUCTS: readonly Product[] = [
  fixtureProduct('01', '39.00', 'in_stock'),
  fixtureProduct('02', '44.00', 'in_stock'),
  fixtureProduct('03', '49.00', 'unknown'),
];

export const FIXTURE_COLLECTIONS: readonly Collection[] = [
  {
    id: INTERVALOS_ID,
    handle: 'intervalos',
    title: 'Intervalos — [DEMONSTRAÇÃO]',
    description:
      'Uma coleção fictícia para validar comparação, navegação e caminho de compra. Nenhum nome, atributo ou condição representa produto real da HEAL.',
    image: null,
    productCount: FIXTURE_PRODUCTS.length,
    provenance: FIXTURE_PROVENANCE,
  },
];

export function findFixtureProductByHandle(handle: string): Product | null {
  return FIXTURE_PRODUCTS.find((product) => product.handle === handle) ?? null;
}

export function findFixtureVariant(
  variantId: string,
): { product: Product; variant: Variant } | null {
  for (const product of FIXTURE_PRODUCTS) {
    const variant = product.variants.find((candidate) => candidate.id === variantId);
    if (variant) {
      return { product, variant };
    }
  }

  return null;
}

