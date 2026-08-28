'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CART_CHANGED_EVENT, readFixtureCart } from '@/lib/commerce/cart-store';

export function CartLink() {
  const [quantity, setQuantity] = useState(0);
  const itemLabel = quantity === 1 ? 'item' : 'itens';

  useEffect(() => {
    const update = () => {
      const cart = readFixtureCart();
      setQuantity(cart.ok ? cart.data.totalQuantity : 0);
    };
    update();
    window.addEventListener(CART_CHANGED_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(CART_CHANGED_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return (
    <Link href="/carrinho" prefetch={false} aria-label={`Abrir sacola demonstrativa — ${quantity} ${itemLabel}`}>
      Sacola <span aria-hidden="true">({quantity})</span>
    </Link>
  );
}
