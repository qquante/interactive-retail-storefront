'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { formatMoney, type CheckoutHandoff as Handoff } from '@/lib/commerce';
import { clearFixtureCart, prepareStoredFixtureHandoff } from '@/lib/commerce/cart-store';
import styles from './commerce.module.css';

export function CheckoutHandoff() {
  const [handoff, setHandoff] = useState<Handoff | null>(null);
  const [error, setError] = useState('');
  const [ended, setEnded] = useState(false);

  const prepareHandoff = useCallback(() => {
    setError('');
    setHandoff(null);
    const result = prepareStoredFixtureHandoff();
    if (result.ok) setHandoff(result.data);
    else setError(result.error.message);
  }, []);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      prepareHandoff();
    });
    return () => {
      active = false;
    };
  }, [prepareHandoff]);

  if (ended) {
    return (
      <section className={styles.handoff}>
        <h2>Demonstração encerrada.</h2>
        <p>Nenhum pedido foi criado e nenhum pagamento foi iniciado. Seus itens de demonstração podem permanecer na sacola até você limpá-la.</p>
        <div className={styles.actionRow}>
          <Link className={styles.primaryButton} href="/">Voltar ao início</Link>
          <button className={styles.secondaryButton} type="button" onClick={() => { clearFixtureCart(); setHandoff(null); }}>Limpar sacola demonstrativa</button>
        </div>
      </section>
    );
  }

  if (!handoff) {
    if (!error) return <p role="status">Preparando o handoff demonstrativo…</p>;
    return (
      <section className={styles.handoff}>
        <h2>Não foi possível preparar a revisão.</h2>
        <p className={styles.error} role="alert">{error}</p>
        <div className={styles.actionRow}><button className={styles.primaryButton} type="button" onClick={prepareHandoff}>Tentar novamente</button><Link className={styles.secondaryButton} href="/carrinho">Voltar à sacola</Link></div>
      </section>
    );
  }

  if (handoff.kind !== 'fixture') return null;
  const { cart } = handoff;
  return (
    <section className={styles.handoff}>
      <div className={styles.handoffAlert} role="alert">
        <strong>Nenhum pagamento será processado.</strong>{' '}
        Este handoff usa produtos, valores, estoque e entrega fictícios. Não cria pedido, cobrança, Pix, boleto ou transação de cartão.
      </div>
      <h2>Resumo demonstrativo</h2>
      <ul className={styles.handoffList}>
        {cart.lines.map((line) => <li key={line.id}>{line.quantity} × {line.productTitle} — {formatMoney(line.lineTotal)}</li>)}
      </ul>
      <dl className={styles.totals}>
        <div><dt>Itens</dt><dd>{cart.totalQuantity}</dd></div>
        <div><dt>Subtotal demonstrativo</dt><dd>{formatMoney(cart.cost.subtotal)}</dd></div>
        <div><dt>Entrega simulada</dt><dd>{cart.cost.shipping ? formatMoney(cart.cost.shipping) : 'não simulada'}</dd></div>
        <div className={styles.totalRow}><dt>Total estimado demonstrativo</dt><dd>{formatMoney(cart.cost.total)}</dd></div>
      </dl>
      <p>Em uma integração real, preço, disponibilidade e total seriam revalidados no servidor antes do redirecionamento para o domínio aprovado do provedor. Essa integração ainda não existe.</p>
      <div className={styles.actionRow}>
        <button className={styles.primaryButton} type="button" onClick={() => setEnded(true)}>Encerrar demonstração</button>
        <Link className={styles.secondaryButton} href="/carrinho">Voltar à sacola</Link>
      </div>
    </section>
  );
}
