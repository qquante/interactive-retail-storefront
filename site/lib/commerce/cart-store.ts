import {
  buildFixtureCartSnapshot,
  prepareFixtureHandoff,
  type CartSnapshot,
  type CheckoutHandoff,
  type FixtureCartDraft,
  type Result,
} from './index';
import { findFixtureVariant } from './fixture-data';

const STORAGE_KEY = 'heal:fixture-cart:v2';
export const CART_CHANGED_EVENT = 'heal:fixture-cart-changed';

interface StoredCart {
  version: 1;
  cartId: string;
  revision: number;
  lines: Array<{ variantId: string; quantity: number }>;
  shippingPostalCode?: string;
}

function emptyStoredCart(): StoredCart {
  return {
    version: 1,
    cartId: `fixture:cart:${globalThis.crypto.randomUUID()}`,
    revision: 1,
    lines: [],
  };
}

function isStoredCart(value: unknown): value is StoredCart {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<StoredCart>;
  return (
    candidate.version === 1 &&
    typeof candidate.cartId === 'string' &&
    candidate.cartId.startsWith('fixture:cart:') &&
    Number.isInteger(candidate.revision) &&
    Array.isArray(candidate.lines) &&
    candidate.lines.length <= 100 &&
    candidate.lines.every(
      (line) =>
        line &&
        typeof line.variantId === 'string' &&
        Number.isInteger(line.quantity) &&
        line.quantity >= 1 &&
        line.quantity <= 99,
    ) &&
    (candidate.shippingPostalCode === undefined ||
      typeof candidate.shippingPostalCode === 'string')
  );
}

function readStoredCart(): StoredCart {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStoredCart();
    const parsed: unknown = JSON.parse(raw);
    return isStoredCart(parsed) ? parsed : emptyStoredCart();
  } catch {
    return emptyStoredCart();
  }
}

function saveStoredCart(cart: StoredCart): void {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent(CART_CHANGED_EVENT));
}

function toDraft(cart: StoredCart): FixtureCartDraft {
  return {
    cartId: cart.cartId,
    revision: String(cart.revision),
    lines: cart.lines,
    shippingPostalCode: cart.shippingPostalCode,
  };
}

export function readFixtureCart(): Result<CartSnapshot> {
  return buildFixtureCartSnapshot(toDraft(readStoredCart()));
}

export function addFixtureLine(
  variantId: string,
  quantity: number,
): Result<CartSnapshot> {
  const match = findFixtureVariant(variantId);
  if (!match || !match.variant.active || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return buildFixtureCartSnapshot({
      cartId: 'invalid',
      revision: '0',
      lines: [],
    });
  }
  if (
    match.variant.inventory.status === 'unknown' ||
    match.variant.inventory.status === 'out_of_stock'
  ) {
    const current = readFixtureCart();
    return {
      ok: false,
      error: {
        code:
          match.variant.inventory.status === 'unknown'
            ? 'INVENTORY_UNKNOWN'
            : 'VARIANT_UNAVAILABLE',
        message:
          match.variant.inventory.status === 'unknown'
            ? 'Não foi possível confirmar a disponibilidade. Tente novamente antes de adicionar.'
            : 'Indisponível nesta demonstração.',
        retryable: match.variant.inventory.status === 'unknown',
        requestId: `fixture-client:${globalThis.crypto.randomUUID()}`,
        currentCart: current.ok ? current.data : undefined,
      },
    };
  }

  const cart = readStoredCart();
  const existing = cart.lines.find((line) => line.variantId === variantId);
  const nextQuantity = (existing?.quantity ?? 0) + quantity;
  if (nextQuantity > 99) {
    const current = buildFixtureCartSnapshot(toDraft(cart));
    return {
      ok: false,
      error: {
        code: 'INVALID_INPUT',
        message: 'A quantidade total precisa ficar entre 1 e 99.',
        retryable: false,
        requestId: `fixture-client:${globalThis.crypto.randomUUID()}`,
        currentCart: current.ok ? current.data : undefined,
      },
    };
  }

  const next: StoredCart = {
    ...cart,
    revision: cart.revision + 1,
    lines: existing
      ? cart.lines.map((line) =>
          line.variantId === variantId ? { ...line, quantity: nextQuantity } : line,
        )
      : [...cart.lines, { variantId, quantity }],
  };
  saveStoredCart(next);
  return buildFixtureCartSnapshot(toDraft(next));
}

export function updateFixtureLine(
  variantId: string,
  quantity: number,
): Result<CartSnapshot> {
  const cart = readStoredCart();
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return {
      ok: false,
      error: {
        code: 'INVALID_INPUT',
        message: 'Escolha uma quantidade entre 1 e 99.',
        retryable: false,
        requestId: `fixture-client:${globalThis.crypto.randomUUID()}`,
      },
    };
  }
  const match = findFixtureVariant(variantId);
  if (!match || match.variant.inventory.status === 'unknown') {
    return {
      ok: false,
      error: {
        code: 'INVENTORY_UNKNOWN',
        message: 'Não foi possível confirmar a disponibilidade.',
        retryable: true,
        requestId: `fixture-client:${globalThis.crypto.randomUUID()}`,
      },
    };
  }
  const next: StoredCart = {
    ...cart,
    revision: cart.revision + 1,
    lines: cart.lines.map((line) =>
      line.variantId === variantId ? { ...line, quantity } : line,
    ),
  };
  saveStoredCart(next);
  return buildFixtureCartSnapshot(toDraft(next));
}

export function removeFixtureLine(variantId: string): Result<CartSnapshot> {
  const cart = readStoredCart();
  const next: StoredCart = {
    ...cart,
    revision: cart.revision + 1,
    lines: cart.lines.filter((line) => line.variantId !== variantId),
  };
  saveStoredCart(next);
  return buildFixtureCartSnapshot(toDraft(next));
}

export function estimateFixtureShipping(postalCode: string): Result<CartSnapshot> {
  const normalized = postalCode.replace(/\D/g, '');
  if (!/^\d{8}$/.test(normalized)) {
    return {
      ok: false,
      error: {
        code: 'INVALID_INPUT',
        message: 'Digite um CEP com 8 números. O valor informado foi preservado.',
        field: 'postalCode',
        retryable: false,
        requestId: `fixture-client:${globalThis.crypto.randomUUID()}`,
      },
    };
  }
  const cart = readStoredCart();
  const next: StoredCart = {
    ...cart,
    revision: cart.revision + 1,
    shippingPostalCode: normalized,
  };
  saveStoredCart(next);
  return buildFixtureCartSnapshot(toDraft(next));
}

export function clearFixtureCart(): Result<CartSnapshot> {
  const next = emptyStoredCart();
  saveStoredCart(next);
  return buildFixtureCartSnapshot(toDraft(next));
}

export function prepareStoredFixtureHandoff(): Result<CheckoutHandoff> {
  const cart = readFixtureCart();
  return cart.ok ? prepareFixtureHandoff(cart.data) : cart;
}
