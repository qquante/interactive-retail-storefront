import {
  HEAL_CATALOGUE_MEDIA,
  type HealCatalogueId,
} from "../brand/catalogue-media";
import { BRL, money } from "./money";
import type {
  Collection,
  CollectionId,
  DataProvenance,
  DateTimeIso,
  ImageId,
  Inventory,
  Product,
  ProductId,
  Variant,
  VariantId,
} from "./types";

export const FIXTURE_BANNER =
  "Coleção em preparação — a venda online ainda não está aberta.";

export const FIXTURE_SUMMARY =
  "Incenso em bastão da coleção HEALS. Lançamento em preparação.";

export const FIXTURE_CHECKED_AT = "2026-08-28T14:00:00.000Z" as DateTimeIso;

export const FIXTURE_PROVENANCE: DataProvenance = {
  mode: "fixture",
  provider: "fixture",
  fetchedAt: FIXTURE_CHECKED_AT,
  label: "Pré-lançamento — dados comerciais não publicados",
};

const HEALS_ID = "fixture:collection:heals" as CollectionId;

function fixtureInventory(status: Inventory["status"]): Inventory {
  return {
    status,
    availableQuantity: null,
    purchasePolicy: "deny",
    checkedAt: FIXTURE_CHECKED_AT,
  };
}

function fixtureVariant(
  handle: string,
  code: string,
  amount: string,
  inventoryStatus: Inventory["status"],
): Variant {
  return {
    id: `fixture:variant:${handle}` as VariantId,
    sku: { value: `PRE-HEAL-${code}` },
    title: "Caixa de incensos em bastão",
    options: [{ optionName: "Formato", value: "Incenso em bastão" }],
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
  handle: HealCatalogueId,
  name: string,
  code: "CNL" | "LVC" | "MRR" | "OLB" | "ALC",
  amount: string,
  inventoryStatus: Inventory["status"],
): Product {
  const title = `${name} — incenso HEALS em bastão`;
  const image = {
    id: `concept:image:${handle}` as ImageId,
    ...HEAL_CATALOGUE_MEDIA[handle],
  };

  return {
    id: `fixture:product:${handle}` as ProductId,
    handle,
    title,
    summary: FIXTURE_SUMMARY,
    descriptionHtml: `<p>${FIXTURE_SUMMARY}</p>`,
    status: "active",
    featuredImage: image,
    images: [image],
    sensory: {
      aromaticFamily: null,
      descriptors: [],
      perceivedIntensity: null,
      smokeLevel: null,
      methodologyRef: null,
    },
    facts: {
      format: "Incenso em bastão",
      ingredients: null,
      origin: null,
      quantityLabel: null,
      burnTimeLabel: null,
      usage: null,
      safety: null,
    },
    variants: [fixtureVariant(handle, code, amount, inventoryStatus)],
    collectionIds: [HEALS_ID],
    provenance: FIXTURE_PROVENANCE,
  };
}

export const FIXTURE_PRODUCTS: readonly Product[] = [
  fixtureProduct("canela", "Canela", "CNL", "39.00", "in_stock"),
  fixtureProduct(
    "lavanda-celestial",
    "Lavanda Celestial",
    "LVC",
    "42.00",
    "in_stock",
  ),
  fixtureProduct("mirra", "Mirra", "MRR", "45.00", "unknown"),
  fixtureProduct("olibano", "Olíbano", "OLB", "48.00", "unknown"),
  fixtureProduct("alecrim", "Alecrim", "ALC", "51.00", "unknown"),
];

export const FIXTURE_COLLECTIONS: readonly Collection[] = [
  {
    id: HEALS_ID,
    handle: "heals",
    title: "Coreografia do ar — coleção de estreia HEALS",
    description:
      "Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim inauguram um sistema visual preparado para um repertório maior de incensos.",
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
    const variant = product.variants.find(
      (candidate) => candidate.id === variantId,
    );
    if (variant) {
      return { product, variant };
    }
  }

  return null;
}
