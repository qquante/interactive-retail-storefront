import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Price.module.css';

export type PriceProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  amount: number | string | null;
  currencyCode?: string;
  fallback?: ReactNode;
  locale?: string;
  qualifier?: ReactNode;
  size?: 'small' | 'medium' | 'large';
};

function formatPrice(amount: number | string, currencyCode: string, locale: string) {
  const numericAmount = typeof amount === 'string' ? Number(amount) : amount;

  if (!Number.isFinite(numericAmount)) {
    return null;
  }

  try {
    return new Intl.NumberFormat(locale, {
      currency: currencyCode,
      style: 'currency',
    }).format(numericAmount);
  } catch {
    return `${currencyCode} ${numericAmount.toFixed(2)}`;
  }
}

export function Price({
  amount,
  className,
  currencyCode = 'BRL',
  fallback = 'Preço indisponível',
  locale = 'pt-BR',
  qualifier,
  size = 'medium',
  ...props
}: PriceProps) {
  const formatted = amount === null ? null : formatPrice(amount, currencyCode, locale);

  if (!formatted) {
    return (
      <span
        {...props}
        className={`${styles.price} ${styles.unavailable} ${className ?? ''}`}
        data-size={size}
      >
        {fallback}
      </span>
    );
  }

  return (
    <span {...props} className={`${styles.price} ${className ?? ''}`} data-size={size}>
      {qualifier ? <span className={styles.qualifier}>{qualifier}</span> : null}
      <data className={styles.amount} value={String(amount)}>
        {formatted}
      </data>
    </span>
  );
}
