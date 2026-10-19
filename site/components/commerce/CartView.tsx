'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { formatMoney, type CartSnapshot, type Result } from '@/lib/commerce';
import {
  clearFixtureCart,
  estimateFixtureShipping,
  addFixtureLine,
  readFixtureCart,
  removeFixtureLine,
  updateFixtureLine,
} from '@/lib/commerce/cart-store';
import styles from './commerce.module.css';

export function CartView() {
  const [cart, setCart] = useState<CartSnapshot | null>(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [lastRemoved, setLastRemoved] = useState<{ variantId: string; quantity: number; title: string } | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const postalCodeInvalid = isError && message.startsWith('Digite um CEP');

  useEffect(() => {
    applyResult(readFixtureCart(), '');
  }, []);

  function applyResult(result: Result<CartSnapshot>, successMessage: string) {
    if (result.ok) {
      setCart(result.data);
      setMessage(successMessage);
      setIsError(false);
    } else {
      if (result.error.currentCart) setCart(result.error.currentCart);
      setMessage(result.error.message);
      setIsError(true);
    }
  }

  if (!cart) {
    return <p role="status">Lendo a sacola demonstrativa…</p>;
  }

  if (cart.lines.length === 0) {
    return (
      <section className={styles.emptyState}>
        <h2>Sua sacola demonstrativa está vazia.</h2>
        <p>Explore os produtos fictícios ou veja como a HEAL pretende orientar uma escolha.</p>
        <p ref={statusRef} tabIndex={message ? -1 : undefined} className={`${styles.status} ${isError ? styles.error : ''}`} role="status" aria-live="polite">{message}</p>
        {lastRemoved ? (
          <button
            className={styles.textButton}
            type="button"
            onClick={() => {
              const result = addFixtureLine(lastRemoved.variantId, lastRemoved.quantity);
              applyResult(result, result.ok ? `${lastRemoved.title} voltou para a sacola demonstrativa.` : 'Não foi possível desfazer a remoção.');
              if (result.ok) setLastRemoved(null);
            }}
          >Desfazer remoção</button>
        ) : null}
        <div className={styles.actionRow}>
          <Link className={styles.primaryButton} href="/colecoes/heals">Explorar incensos</Link>
          <Link className={styles.secondaryButton} href="/#como-escolher">Como escolher</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className={styles.cartLayout}>
        <section className={styles.cartLines} aria-label="Itens da sacola">
          {cart.lines.map((line) => (
            <article className={styles.cartLine} key={line.id}>
              <div>
                <p className={styles.eyebrow}>PRODUTO DEMONSTRATIVO</p>
                <h2><Link href={`/produtos/${line.productHandle}`}>{line.productTitle}</Link></h2>
                <p>Opção: {line.variantTitle}</p>
                <p>Valor unitário demonstrativo: {formatMoney(line.unitPrice.current)}</p>
                <div className={styles.quantity} aria-label={`Quantidade de ${line.productTitle}`}>
                  <button
                    type="button"
                    aria-label={`Diminuir quantidade de ${line.productTitle}`}
                    disabled={line.quantity <= 1}
                    onClick={() => applyResult(updateFixtureLine(line.variantId, line.quantity - 1), 'Quantidade atualizada. Total demonstrativo recalculado.')}
                  >−</button>
                  <span aria-live="polite">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Aumentar quantidade de ${line.productTitle}`}
                    disabled={line.quantity >= 99}
                    onClick={() => applyResult(updateFixtureLine(line.variantId, line.quantity + 1), 'Quantidade atualizada. Total demonstrativo recalculado.')}
                  >+</button>
                </div>
                <button
                  className={styles.textButton}
                  type="button"
                  onClick={() => {
                    const result = removeFixtureLine(line.variantId);
                    if (result.ok) setLastRemoved({ variantId: line.variantId, quantity: line.quantity, title: line.productTitle });
                    applyResult(result, `${line.productTitle} foi removido da sacola.`);
                    queueMicrotask(() => statusRef.current?.focus());
                  }}
                >Remover {line.productTitle}</button>
              </div>
              <strong>{formatMoney(line.lineTotal)}</strong>
            </article>
          ))}
        </section>

        <aside className={styles.summary} aria-labelledby="summary-title">
          <h2 id="summary-title">Resumo demonstrativo</h2>
          <form
            className={styles.shippingForm}
            onSubmit={(event) => {
              event.preventDefault();
              applyResult(estimateFixtureShipping(postalCode), 'Simulação disponível. Valor e prazo fictícios.');
            }}
          >
            <label className={styles.field} htmlFor="postal-code">
              CEP para simulação
              <input
                id="postal-code"
                name="postalCode"
                inputMode="numeric"
                autoComplete="postal-code"
                value={postalCode}
                onChange={(event) => setPostalCode(event.currentTarget.value)}
                aria-describedby="shipping-help shipping-status"
                aria-invalid={postalCodeInvalid ? true : undefined}
              />
            </label>
            <p id="shipping-help">Resultado fictício para testar a interface; não representa cobertura, prazo ou preço real.</p>
            <button className={styles.secondaryButton} type="submit">Simular entrega</button>
          </form>
          {cart.shipping.status === 'available' ? (
            <p>Simulação: {cart.shipping.options[0]?.title}, {cart.shipping.postalCodeMasked}, 3–5 dias úteis fictícios.</p>
          ) : null}
          <p ref={statusRef} tabIndex={message ? -1 : undefined} id="shipping-status" className={`${styles.status} ${isError ? styles.error : ''}`} role="status" aria-live="polite">{message}</p>
          {lastRemoved ? (
            <button
              className={styles.textButton}
              type="button"
              onClick={() => {
                const result = addFixtureLine(lastRemoved.variantId, lastRemoved.quantity);
                applyResult(result, result.ok ? `${lastRemoved.title} voltou para a sacola demonstrativa.` : 'Não foi possível desfazer a remoção.');
                if (result.ok) setLastRemoved(null);
              }}
            >Desfazer remoção</button>
          ) : null}
          <dl className={styles.totals}>
            <div><dt>Subtotal demonstrativo</dt><dd>{formatMoney(cart.cost.subtotal)}</dd></div>
            <div><dt>Entrega</dt><dd>{cart.cost.shipping ? formatMoney(cart.cost.shipping) : 'a simular'}</dd></div>
            <div className={styles.totalRow}><dt>Total estimado demonstrativo</dt><dd>{formatMoney(cart.cost.total)}</dd></div>
          </dl>
          <p>Este total não é uma cobrança nem uma oferta comercial.</p>
          <Link className={styles.primaryButton} href="/checkout">Revisar handoff demonstrativo</Link>
          <Link className={styles.secondaryButton} href="/colecoes/heals">Continuar explorando</Link>
          <button className={styles.textButton} type="button" onClick={() => applyResult(clearFixtureCart(), 'Sacola demonstrativa limpa.')}>Limpar sacola demonstrativa</button>
        </aside>
      </div>
    </>
  );
}
