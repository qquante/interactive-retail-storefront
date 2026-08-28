export type Opaque<Tag extends string> = string & { readonly __tag: Tag };

export type ProductId = Opaque<'ProductId'>;
export type VariantId = Opaque<'VariantId'>;
export type CollectionId = Opaque<'CollectionId'>;
export type CartId = Opaque<'CartId'>;
export type CartLineId = Opaque<'CartLineId'>;
export type DiscountId = Opaque<'DiscountId'>;
export type ShippingOptionId = Opaque<'ShippingOptionId'>;
export type CheckoutAttemptId = Opaque<'CheckoutAttemptId'>;
export type IdempotencyKey = Opaque<'IdempotencyKey'>;
export type CurrencyCode = Opaque<'ISO4217CurrencyCode'>;
export type DateTimeIso = Opaque<'DateTimeIso'>;
export type ImageId = Opaque<'ImageId'>;

export type CommerceMode = 'fixture' | 'sandbox' | 'production';
export type CommerceProvider = 'fixture' | 'shopify' | 'mercado_pago';

export interface DataProvenance {
  mode: CommerceMode;
  provider: CommerceProvider;
  fetchedAt: DateTimeIso;
  label: string;
}

export interface Money {
  amount: string;
  currencyCode: CurrencyCode;
}

export interface Price {
  current: Money;
  compareAt: Money | null;
  unitLabel: string | null;
  includesTax: boolean | null;
  checkedAt: DateTimeIso;
}

export interface CommerceImage {
  id: ImageId;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductOptionValue {
  optionName: string;
  value: string;
}

export interface Sku {
  value: string;
}

export type InventoryStatus =
  | 'in_stock'
  | 'low_stock'
  | 'out_of_stock'
  | 'backorder'
  | 'unknown';

export interface Inventory {
  status: InventoryStatus;
  availableQuantity: number | null;
  purchasePolicy: 'deny' | 'continue';
  checkedAt: DateTimeIso;
}

export interface Variant {
  id: VariantId;
  sku: Sku;
  title: string;
  options: readonly ProductOptionValue[];
  price: Price;
  inventory: Inventory;
  image: CommerceImage | null;
  active: boolean;
}

export interface SensoryProfile {
  aromaticFamily: string | null;
  descriptors: readonly string[];
  perceivedIntensity: 'soft' | 'medium' | 'marked' | null;
  smokeLevel: 'low' | 'medium' | 'high' | null;
  methodologyRef: string | null;
}

export interface ProductFacts {
  format: string | null;
  ingredients: readonly string[] | null;
  origin: string | null;
  quantityLabel: string | null;
  burnTimeLabel: string | null;
  usage: readonly string[] | null;
  safety: readonly string[] | null;
}

export interface Product {
  id: ProductId;
  handle: string;
  title: string;
  summary: string;
  descriptionHtml: string;
  status: 'active' | 'draft' | 'archived';
  featuredImage: CommerceImage | null;
  images: readonly CommerceImage[];
  sensory: SensoryProfile;
  facts: ProductFacts;
  variants: readonly Variant[];
  collectionIds: readonly CollectionId[];
  provenance: DataProvenance;
}

export interface Collection {
  id: CollectionId;
  handle: string;
  title: string;
  description: string;
  image: CommerceImage | null;
  productCount: number;
  provenance: DataProvenance;
}

export type DiscountApplication =
  | {
      id: DiscountId;
      kind: 'code';
      code: string;
      status: 'applied' | 'rejected' | 'pending';
      allocation: Money | null;
      message: string | null;
    }
  | {
      id: DiscountId;
      kind: 'automatic';
      title: string;
      status: 'applied';
      allocation: Money;
      message: string | null;
    };

export interface CartLine {
  id: CartLineId;
  variantId: VariantId;
  sku: Sku;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  image: CommerceImage | null;
  quantity: number;
  unitPrice: Price;
  lineSubtotal: Money;
  discountAllocations: readonly Money[];
  lineTotal: Money;
  inventory: Inventory;
}

export interface ShippingAddressDraft {
  countryCode: 'BR';
  postalCode: string;
  regionCode?: string;
  city?: string;
}

export interface ShippingOption {
  id: ShippingOptionId;
  title: string;
  price: Money;
  estimatedBusinessDays: { min: number; max: number } | null;
  providerLabel: string | null;
}

export type ShippingState =
  | { status: 'not_requested' }
  | { status: 'loading'; postalCode: string }
  | {
      status: 'available';
      postalCodeMasked: string;
      options: readonly ShippingOption[];
      selectedOptionId: ShippingOptionId | null;
      checkedAt: DateTimeIso;
    }
  | {
      status: 'unavailable' | 'temporary_error';
      postalCodeMasked: string;
      message: string;
      retryable: boolean;
    };

export interface CartCost {
  subtotal: Money;
  discountTotal: Money;
  shipping: Money | null;
  taxes: Money | null;
  total: Money;
  finality: 'estimated' | 'final';
  checkedAt: DateTimeIso;
}

export interface CartSnapshot {
  id: CartId;
  revision: string;
  status: 'active' | 'expired' | 'completed';
  currencyCode: CurrencyCode;
  lines: readonly CartLine[];
  discounts: readonly DiscountApplication[];
  shipping: ShippingState;
  cost: CartCost;
  totalQuantity: number;
  expiresAt: DateTimeIso | null;
  provenance: DataProvenance;
}

export type CheckoutHandoff =
  | {
      kind: 'fixture';
      attemptId: CheckoutAttemptId;
      cart: CartSnapshot;
      message: 'Demonstração — nenhum pagamento será processado';
    }
  | {
      kind: 'external';
      attemptId: CheckoutAttemptId;
      provider: 'shopify';
      checkoutUrl: string;
      destinationLabel: string;
      expiresAt: DateTimeIso | null;
      cartRevision: string;
    };

export interface PageInput {
  cursor?: string;
  limit: number;
}

export interface Page<T> {
  items: readonly T[];
  nextCursor: string | null;
}

export interface CatalogQuery {
  collectionHandle?: string;
  search?: string;
  filters?: Readonly<Record<string, readonly string[]>>;
  sort?: 'featured' | 'price_asc' | 'price_desc' | 'title_asc';
}

export interface MutationContext {
  requestId: string;
  idempotencyKey: IdempotencyKey;
  expectedCartRevision?: string;
}

export type CommerceErrorCode =
  | 'INVALID_INPUT'
  | 'NOT_FOUND'
  | 'CATALOG_UNAVAILABLE'
  | 'VARIANT_UNAVAILABLE'
  | 'INVENTORY_UNKNOWN'
  | 'INSUFFICIENT_STOCK'
  | 'PRICE_CHANGED'
  | 'CART_NOT_FOUND'
  | 'CART_EXPIRED'
  | 'CART_CONFLICT'
  | 'DISCOUNT_INVALID'
  | 'DISCOUNT_UNSUPPORTED'
  | 'SHIPPING_NOT_CONFIGURED'
  | 'SHIPPING_UNAVAILABLE'
  | 'PROVIDER_TIMEOUT'
  | 'PROVIDER_RATE_LIMITED'
  | 'CHECKOUT_NOT_CONFIGURED'
  | 'CHECKOUT_URL_INVALID'
  | 'UNAUTHORIZED'
  | 'INTERNAL_ERROR';

export interface CommerceError {
  code: CommerceErrorCode;
  message: string;
  field?: string;
  retryable: boolean;
  requestId: string;
  currentCart?: CartSnapshot;
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: CommerceError };

export interface CatalogPort {
  getProductByHandle(handle: string): Promise<Result<Product>>;
  getCollectionByHandle(handle: string): Promise<Result<Collection>>;
  listProducts(query: CatalogQuery, page: PageInput): Promise<Result<Page<Product>>>;
  listCollections(page: PageInput): Promise<Result<Page<Collection>>>;
}

export interface CartPort {
  create(context: MutationContext): Promise<Result<CartSnapshot>>;
  get(cartId: CartId): Promise<Result<CartSnapshot>>;
  addLine(
    cartId: CartId,
    input: { variantId: VariantId; quantity: number },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
  updateLine(
    cartId: CartId,
    input: { lineId: CartLineId; quantity: number },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
  removeLine(
    cartId: CartId,
    input: { lineId: CartLineId },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
  applyDiscountCode(
    cartId: CartId,
    input: { code: string },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
}

export interface ShippingPort {
  estimate(
    cartId: CartId,
    address: ShippingAddressDraft,
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
  select(
    cartId: CartId,
    optionId: ShippingOptionId,
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
}

export interface CheckoutPort {
  prepare(cartId: CartId, context: MutationContext): Promise<Result<CheckoutHandoff>>;
}

