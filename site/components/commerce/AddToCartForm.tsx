'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EmberCartFeedback } from '@/components/motion';
import type { InventoryStatus } from '@/lib/commerce';
import { addFixtureLine } from '@/lib/commerce/cart-store';
import styles from './commerce.module.css';

export function AddToCartForm({
  variantId,
  productTitle,
  inventoryStatus,
}: {
  variantId: string;
  productTitle: string;
  inventoryStatus: InventoryStatus;
}) {
  const [quantity, setQuantity] = useState('1');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const quantityInvalid = isError && message.startsWith('Escolha uma quantidade');
  const quantityErrorId = `quantity-error-${variantId.replaceAll(':', '-')}`;

  useEffect(() => {
    const timer = window.setTimeout(() => setHydrated(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const blocked = inventoryStatus === 'unknown' || inventoryStatus === 'out_of_stock';

  return (
    <form
      className={styles.purchaseForm}
      onSubmit={(event) => {
        event.preventDefault();
        const parsedQuantity = Number(quantity);
        if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 99) {
          setIsError(true);
          setMessage('Escolha uma quantidade inteira entre 1 e 99. O valor informado foi preservado.');
          return;
        }
        const result = addFixtureLine(variantId, parsedQuantity);
        setIsError(!result.ok);
        if (result.ok) setFeedbackKey((current) => current + 1);
        setMessage(
          result.ok
            ? `${productTitle} foi adicionado à sacola demonstrativa.`
            : result.error.message,
        );
      }}
    >
      <label className={styles.field} htmlFor={`quantity-${variantId}`}>
        Quantidade
        <input
          id={`quantity-${variantId}`}
          type="number"
          inputMode="numeric"
          min="1"
          max="99"
          value={quantity}
          onChange={(event) => setQuantity(event.currentTarget.value)}
          aria-invalid={quantityInvalid ? true : undefined}
          aria-describedby={quantityInvalid ? quantityErrorId : undefined}
        />
      </label>
      <button className={styles.primaryButton} type="submit" disabled={blocked || !hydrated}>
        Adicionar à sacola demonstrativa
      </button>
      {inventoryStatus === 'unknown' ? (
        <p className={styles.error}>Não foi possível confirmar a disponibilidade. Tente novamente antes de adicionar.</p>
      ) : null}
      {inventoryStatus === 'out_of_stock' ? (
        <p className={styles.error}>Indisponível nesta demonstração.</p>
      ) : null}
      {isError ? (
        <p id={quantityInvalid ? quantityErrorId : undefined} className={`${styles.status} ${styles.error}`} role="status" aria-live="polite">
          {message}
        </p>
      ) : (
        <EmberCartFeedback eventKey={feedbackKey} message={message} />
      )}
      {message && !isError ? (
        <div className={styles.statusActions}>
          <Link href="/carrinho">Ver sacola</Link>
          <Link href="/colecoes/heals">Continuar explorando</Link>
        </div>
      ) : null}
    </form>
  );
}
