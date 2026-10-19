import {
  FIXTURE_CHECKED_AT,
  FIXTURE_COLLECTIONS,
  FIXTURE_PRODUCTS,
  FIXTURE_PROVENANCE,
  findFixtureProductByHandle,
  findFixtureVariant,
} from "./fixture-data";
import { BRL, addMoney, compareMoney, money, multiplyMoney } from "./money";
import type {
  CartId,
  CartLine,
  CartLineId,
  CartPort,
  CartSnapshot,
  CatalogPort,
  CatalogQuery,
  CheckoutAttemptId,
  CheckoutHandoff,
  CheckoutPort,
  Collection,
  CommerceError,
  CommerceErrorCode,
  IdempotencyKey,
  MutationContext,
  Page,
  PageInput,
  Product,
  Result,
  ShippingOption,
  ShippingOptionId,
  ShippingPort,
  VariantId,
} from "./types";

export interface FixtureCartLineInput {
  variantId: string;
  quantity: number;
}

export interface FixtureCartDraft {
  cartId: string;
  revision: string;
  lines: readonly FixtureCartLineInput[];
  shippingPostalCode?: string;
}

const FIXTURE_SHIPPING_OPTION: ShippingOption = {
  id: "fixture:shipping:simulacao" as ShippingOptionId,
  title: "Entrega demonstrativa",
  price: money("12.00", BRL),
  estimatedBusinessDays: { min: 3, max: 5 },
  providerLabel: "Simulação",
};

function requestId(prefix: string): string {
  return `${prefix}:${globalThis.crypto.randomUUID()}`;
}

function commerceError(
  code: CommerceErrorCode,
  message: string,
  request: string,
  retryable = false,
  currentCart?: CartSnapshot,
): Result<never> {
  const error: CommerceError = {
    code,
    message,
    retryable,
    requestId: request,
  };

  if (currentCart) {
    error.currentCart = currentCart;
  }

  return { ok: false, error };
}

function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity >= 1 && quantity <= 99;
}

function normalizePostalCode(postalCode: string): string | null {
  const digits = postalCode.replace(/\D/g, "");
  return /^\d{8}$/.test(digits) ? digits : null;
}

function maskPostalCode(postalCode: string): string {
  return `${postalCode.slice(0, 5)}-***`;
}

function buildShipping(postalCode?: string): CartSnapshot["shipping"] {
  if (!postalCode) {
    return { status: "not_requested" };
  }

  const normalized = normalizePostalCode(postalCode);
  if (!normalized) {
    return {
      status: "unavailable",
      postalCodeMasked: "CEP inválido",
      message: "Digite um CEP com 8 números. O valor informado foi preservado.",
      retryable: false,
    };
  }

  return {
    status: "available",
    postalCodeMasked: maskPostalCode(normalized),
    options: [FIXTURE_SHIPPING_OPTION],
    selectedOptionId: FIXTURE_SHIPPING_OPTION.id,
    checkedAt: FIXTURE_CHECKED_AT,
  };
}

export function buildFixtureCartSnapshot(
  draft: FixtureCartDraft,
  currentRequestId = requestId("fixture-cart"),
): Result<CartSnapshot> {
  if (!draft.cartId.startsWith("fixture:cart:") || !draft.revision) {
    return commerceError(
      "INVALID_INPUT",
      "A sacola demonstrativa não pôde ser validada.",
      currentRequestId,
    );
  }

  const lines: CartLine[] = [];
  let subtotal = money("0.00", BRL);
  let totalQuantity = 0;
  const seen = new Set<string>();

  for (const input of draft.lines) {
    if (!isValidQuantity(input.quantity) || seen.has(input.variantId)) {
      return commerceError(
        "INVALID_INPUT",
        "Uma linha da sacola demonstrativa contém dados inválidos.",
        currentRequestId,
      );
    }

    const match = findFixtureVariant(input.variantId);
    if (!match || !match.variant.active) {
      return commerceError(
        "VARIANT_UNAVAILABLE",
        "Uma opção demonstrativa não está mais disponível.",
        currentRequestId,
      );
    }

    seen.add(input.variantId);
    const lineTotal = multiplyMoney(
      match.variant.price.current,
      input.quantity,
    );
    subtotal = addMoney(subtotal, lineTotal);
    totalQuantity += input.quantity;
    lines.push({
      id: `fixture:line:${match.variant.id}` as CartLineId,
      variantId: match.variant.id,
      sku: match.variant.sku,
      productHandle: match.product.handle,
      productTitle: match.product.title,
      variantTitle: match.variant.title,
      image: match.variant.image ?? match.product.featuredImage,
      quantity: input.quantity,
      unitPrice: match.variant.price,
      lineSubtotal: lineTotal,
      discountAllocations: [],
      lineTotal,
      inventory: match.variant.inventory,
    });
  }

  const shipping = buildShipping(draft.shippingPostalCode);
  const shippingMoney =
    shipping.status === "available" && shipping.selectedOptionId
      ? (shipping.options.find(
          (option) => option.id === shipping.selectedOptionId,
        )?.price ?? null)
      : null;
  const total = shippingMoney ? addMoney(subtotal, shippingMoney) : subtotal;

  return {
    ok: true,
    data: {
      id: draft.cartId as CartId,
      revision: draft.revision,
      status: "active",
      currencyCode: BRL,
      lines,
      discounts: [],
      shipping,
      cost: {
        subtotal,
        discountTotal: money("0.00", BRL),
        shipping: shippingMoney,
        taxes: null,
        total,
        finality: "estimated",
        checkedAt: FIXTURE_CHECKED_AT,
      },
      totalQuantity,
      expiresAt: null,
      provenance: FIXTURE_PROVENANCE,
    },
  };
}

export function prepareFixtureHandoff(
  cart: CartSnapshot,
  currentRequestId = requestId("fixture-checkout"),
): Result<CheckoutHandoff> {
  if (cart.lines.length === 0) {
    return commerceError(
      "INVALID_INPUT",
      "A sacola demonstrativa está vazia.",
      currentRequestId,
    );
  }

  const unavailable = cart.lines.find(
    (line) =>
      line.inventory.status === "unknown" ||
      line.inventory.status === "out_of_stock" ||
      !findFixtureVariant(line.variantId),
  );

  if (unavailable) {
    return commerceError(
      unavailable.inventory.status === "unknown"
        ? "INVENTORY_UNKNOWN"
        : "VARIANT_UNAVAILABLE",
      "Não foi possível confirmar a disponibilidade de todos os itens.",
      currentRequestId,
      true,
      cart,
    );
  }

  return {
    ok: true,
    data: {
      kind: "fixture",
      attemptId:
        `fixture:checkout:${globalThis.crypto.randomUUID()}` as CheckoutAttemptId,
      cart,
      message: "Demonstração — nenhum pagamento será processado",
    },
  };
}

interface StoredFixtureCart {
  draft: FixtureCartDraft;
}

export class FixtureCommerceAdapter
  implements CatalogPort, CartPort, ShippingPort, CheckoutPort
{
  private readonly carts = new Map<CartId, StoredFixtureCart>();
  private readonly mutationResults = new Map<
    IdempotencyKey,
    { signature: string; result: Result<CartSnapshot> }
  >();

  async getProductByHandle(handle: string): Promise<Result<Product>> {
    const product = findFixtureProductByHandle(handle);
    return product
      ? { ok: true, data: product }
      : commerceError(
          "NOT_FOUND",
          "Produto demonstrativo não encontrado.",
          requestId("fixture-product"),
        );
  }

  async getCollectionByHandle(handle: string): Promise<Result<Collection>> {
    const collection =
      FIXTURE_COLLECTIONS.find((candidate) => candidate.handle === handle) ??
      null;
    return collection
      ? { ok: true, data: collection }
      : commerceError(
          "NOT_FOUND",
          "Coleção demonstrativa não encontrada.",
          requestId("fixture-collection"),
        );
  }

  async listProducts(
    query: CatalogQuery,
    page: PageInput,
  ): Promise<Result<Page<Product>>> {
    if (!Number.isInteger(page.limit) || page.limit < 1 || page.limit > 100) {
      return commerceError(
        "INVALID_INPUT",
        "A paginação solicitada é inválida.",
        requestId("fixture-products"),
      );
    }

    let products = [...FIXTURE_PRODUCTS];
    if (query.collectionHandle) {
      const collection = FIXTURE_COLLECTIONS.find(
        (candidate) => candidate.handle === query.collectionHandle,
      );
      products = collection
        ? products.filter((product) =>
            product.collectionIds.includes(collection.id),
          )
        : [];
    }

    const foldSearch = (value: string) =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR");
    const search = query.search ? foldSearch(query.search.trim()) : "";
    if (search) {
      products = products.filter((product) =>
        foldSearch(`${product.title} ${product.summary}`).includes(search),
      );
    }

    if (query.sort === "title_asc") {
      products.sort((left, right) =>
        left.title.localeCompare(right.title, "pt-BR"),
      );
    } else if (query.sort === "price_asc" || query.sort === "price_desc") {
      const direction = query.sort === "price_asc" ? 1 : -1;
      products.sort((left, right) => {
        const leftPrice = left.variants[0]?.price.current;
        const rightPrice = right.variants[0]?.price.current;
        if (!leftPrice || !rightPrice) return 0;
        return compareMoney(leftPrice, rightPrice) * direction;
      });
    }

    const cursor = page.cursor ? Number.parseInt(page.cursor, 10) : 0;
    if (!Number.isInteger(cursor) || cursor < 0 || cursor > products.length) {
      return commerceError(
        "INVALID_INPUT",
        "O cursor solicitado é inválido.",
        requestId("fixture-products"),
      );
    }

    const items = products.slice(cursor, cursor + page.limit);
    const nextOffset = cursor + items.length;
    return {
      ok: true,
      data: {
        items,
        nextCursor: nextOffset < products.length ? String(nextOffset) : null,
      },
    };
  }

  async listCollections(page: PageInput): Promise<Result<Page<Collection>>> {
    if (!Number.isInteger(page.limit) || page.limit < 1 || page.limit > 100) {
      return commerceError(
        "INVALID_INPUT",
        "A paginação solicitada é inválida.",
        requestId("fixture-collections"),
      );
    }

    return {
      ok: true,
      data: {
        items: FIXTURE_COLLECTIONS.slice(0, page.limit),
        nextCursor: null,
      },
    };
  }

  async create(context: MutationContext): Promise<Result<CartSnapshot>> {
    return this.idempotent(context, "create", () => {
      const cartId = `fixture:cart:${globalThis.crypto.randomUUID()}` as CartId;
      const draft: FixtureCartDraft = {
        cartId,
        revision: "1",
        lines: [],
      };
      this.carts.set(cartId, { draft });
      return buildFixtureCartSnapshot(draft, context.requestId);
    });
  }

  async get(cartId: CartId): Promise<Result<CartSnapshot>> {
    const stored = this.carts.get(cartId);
    return stored
      ? buildFixtureCartSnapshot(stored.draft)
      : commerceError(
          "CART_NOT_FOUND",
          "A sacola demonstrativa não foi encontrada.",
          requestId("fixture-cart"),
        );
  }

  async addLine(
    cartId: CartId,
    input: { variantId: VariantId; quantity: number },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>> {
    return this.idempotent(
      context,
      `add:${cartId}:${JSON.stringify(input)}`,
      () => {
        const state = this.mutableCart(cartId, context);
        if (!state.ok) return state;
        if (!isValidQuantity(input.quantity)) {
          return commerceError(
            "INVALID_INPUT",
            "Escolha uma quantidade entre 1 e 99.",
            context.requestId,
          );
        }

        const match = findFixtureVariant(input.variantId);
        if (!match || !match.variant.active) {
          return commerceError(
            "VARIANT_UNAVAILABLE",
            "A opção demonstrativa não está disponível.",
            context.requestId,
          );
        }
        if (match.variant.inventory.status === "unknown") {
          return commerceError(
            "INVENTORY_UNKNOWN",
            "Não foi possível confirmar a disponibilidade.",
            context.requestId,
            true,
          );
        }
        if (match.variant.inventory.status === "out_of_stock") {
          return commerceError(
            "VARIANT_UNAVAILABLE",
            "Indisponível nesta demonstração.",
            context.requestId,
          );
        }

        const existing = state.data.draft.lines.find(
          (line) => line.variantId === input.variantId,
        );
        const nextQuantity = (existing?.quantity ?? 0) + input.quantity;
        if (!isValidQuantity(nextQuantity)) {
          return commerceError(
            "INVALID_INPUT",
            "A quantidade total precisa ficar entre 1 e 99.",
            context.requestId,
          );
        }

        const nextLines = existing
          ? state.data.draft.lines.map((line) =>
              line.variantId === input.variantId
                ? { ...line, quantity: nextQuantity }
                : line,
            )
          : [...state.data.draft.lines, input];
        return this.saveCart(
          cartId,
          state.data.draft,
          nextLines,
          context.requestId,
        );
      },
    );
  }

  async updateLine(
    cartId: CartId,
    input: { lineId: CartLineId; quantity: number },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>> {
    return this.idempotent(
      context,
      `update:${cartId}:${JSON.stringify(input)}`,
      () => {
        const state = this.mutableCart(cartId, context);
        if (!state.ok) return state;
        if (!isValidQuantity(input.quantity)) {
          return commerceError(
            "INVALID_INPUT",
            "Escolha uma quantidade entre 1 e 99.",
            context.requestId,
          );
        }

        const variantId = input.lineId.replace("fixture:line:", "");
        if (
          !state.data.draft.lines.some((line) => line.variantId === variantId)
        ) {
          return commerceError(
            "NOT_FOUND",
            "O item demonstrativo não foi encontrado na sacola.",
            context.requestId,
          );
        }
        const match = findFixtureVariant(variantId);
        if (!match || match.variant.inventory.status === "unknown") {
          return commerceError(
            "INVENTORY_UNKNOWN",
            "Não foi possível confirmar a disponibilidade.",
            context.requestId,
            true,
          );
        }

        const lines = state.data.draft.lines.map((line) =>
          line.variantId === variantId
            ? { ...line, quantity: input.quantity }
            : line,
        );
        return this.saveCart(
          cartId,
          state.data.draft,
          lines,
          context.requestId,
        );
      },
    );
  }

  async removeLine(
    cartId: CartId,
    input: { lineId: CartLineId },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>> {
    return this.idempotent(context, `remove:${cartId}:${input.lineId}`, () => {
      const state = this.mutableCart(cartId, context);
      if (!state.ok) return state;
      const variantId = input.lineId.replace("fixture:line:", "");
      const lines = state.data.draft.lines.filter(
        (line) => line.variantId !== variantId,
      );
      if (lines.length === state.data.draft.lines.length) {
        return commerceError(
          "NOT_FOUND",
          "O item demonstrativo não foi encontrado na sacola.",
          context.requestId,
        );
      }
      return this.saveCart(cartId, state.data.draft, lines, context.requestId);
    });
  }

  async applyDiscountCode(
    _cartId: CartId,
    _input: { code: string },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>> {
    return commerceError(
      "DISCOUNT_UNSUPPORTED",
      "Cupons não fazem parte desta demonstração.",
      context.requestId,
    );
  }

  async estimate(
    cartId: CartId,
    address: { countryCode: "BR"; postalCode: string },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>> {
    return this.idempotent(
      context,
      `shipping:${cartId}:${address.countryCode}:${address.postalCode}`,
      () => {
        const state = this.mutableCart(cartId, context);
        if (!state.ok) return state;
        const normalized = normalizePostalCode(address.postalCode);
        if (!normalized) {
          return commerceError(
            "INVALID_INPUT",
            "Digite um CEP com 8 números. O valor informado foi preservado.",
            context.requestId,
          );
        }
        const draft = {
          ...state.data.draft,
          revision: String(Number(state.data.draft.revision) + 1),
          shippingPostalCode: normalized,
        };
        this.carts.set(cartId, { draft });
        return buildFixtureCartSnapshot(draft, context.requestId);
      },
    );
  }

  async select(
    cartId: CartId,
    optionId: ShippingOptionId,
    context: MutationContext,
  ): Promise<Result<CartSnapshot>> {
    const state = await this.get(cartId);
    if (!state.ok) return state;
    if (optionId !== FIXTURE_SHIPPING_OPTION.id) {
      return commerceError(
        "SHIPPING_UNAVAILABLE",
        "A opção de entrega demonstrativa não está disponível.",
        context.requestId,
      );
    }
    return state;
  }

  async prepare(
    cartId: CartId,
    context: MutationContext,
  ): Promise<Result<CheckoutHandoff>> {
    const state = this.mutableCart(cartId, context);
    if (!state.ok) return state;
    const cart = buildFixtureCartSnapshot(state.data.draft, context.requestId);
    return cart.ok ? prepareFixtureHandoff(cart.data, context.requestId) : cart;
  }

  private mutableCart(
    cartId: CartId,
    context: MutationContext,
  ): Result<StoredFixtureCart> {
    const stored = this.carts.get(cartId);
    if (!stored) {
      return commerceError(
        "CART_NOT_FOUND",
        "A sacola demonstrativa não foi encontrada.",
        context.requestId,
      );
    }
    if (
      context.expectedCartRevision &&
      context.expectedCartRevision !== stored.draft.revision
    ) {
      const current = buildFixtureCartSnapshot(stored.draft, context.requestId);
      return commerceError(
        "CART_CONFLICT",
        "A sacola mudou em outra ação. Revise a versão mais recente.",
        context.requestId,
        false,
        current.ok ? current.data : undefined,
      );
    }
    return { ok: true, data: stored };
  }

  private saveCart(
    cartId: CartId,
    previous: FixtureCartDraft,
    lines: readonly FixtureCartLineInput[],
    currentRequestId: string,
  ): Result<CartSnapshot> {
    const draft: FixtureCartDraft = {
      ...previous,
      revision: String(Number(previous.revision) + 1),
      lines,
    };
    this.carts.set(cartId, { draft });
    return buildFixtureCartSnapshot(draft, currentRequestId);
  }

  private idempotent(
    context: MutationContext,
    signature: string,
    operation: () => Result<CartSnapshot>,
  ): Result<CartSnapshot> {
    const previous = this.mutationResults.get(context.idempotencyKey);
    if (previous) {
      if (previous.signature === signature) return previous.result;
      return commerceError(
        "CART_CONFLICT",
        "A mesma chave de ação foi usada com dados diferentes.",
        context.requestId,
      );
    }
    const result = operation();
    this.mutationResults.set(context.idempotencyKey, { signature, result });
    return result;
  }
}

export const fixtureCommerce = new FixtureCommerceAdapter();
