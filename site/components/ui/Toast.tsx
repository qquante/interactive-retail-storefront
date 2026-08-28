'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Toast.module.css';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export type ToastProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> & {
  children: ReactNode;
  closeLabel?: string;
  onDismiss?: () => void;
  open: boolean;
  title: ReactNode;
  tone?: ToastTone;
};

export function Toast({
  children,
  className,
  closeLabel = 'Fechar notificação',
  onDismiss,
  open,
  title,
  tone = 'info',
  ...props
}: ToastProps) {
  if (!open) return null;
  const assertive = tone === 'error';

  return (
    <div
      {...props}
      aria-atomic="true"
      aria-live={assertive ? 'assertive' : 'polite'}
      className={`${styles.toast} ${className ?? ''}`}
      data-tone={tone}
      role={assertive ? 'alert' : 'status'}
    >
      <span aria-hidden="true" className={styles.mark}>
        {tone === 'success' ? '✓' : tone === 'info' ? 'i' : '!'}
      </span>
      <span className={styles.copy}>
        <strong>{title}</strong>
        <span>{children}</span>
      </span>
      {onDismiss ? (
        <button aria-label={closeLabel} className={styles.close} onClick={onDismiss} type="button">
          ×
        </button>
      ) : null}
    </div>
  );
}

export type ToastRegionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  label?: string;
};

export function ToastRegion({ children, className, label = 'Notificações', ...props }: ToastRegionProps) {
  return (
    <div {...props} aria-label={label} className={`${styles.region} ${className ?? ''}`}>
      {children}
    </div>
  );
}
