import type { HTMLAttributes, ReactNode } from 'react';
import styles from './StatusMessage.module.css';

export type StatusTone = 'info' | 'success' | 'warning' | 'error';

const DEFAULT_LABELS: Record<StatusTone, string> = {
  error: 'Erro',
  info: 'Informação',
  success: 'Sucesso',
  warning: 'Atenção',
};

export type StatusMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  announce?: 'off' | 'polite' | 'assertive';
  children: ReactNode;
  label?: string;
  tone?: StatusTone;
};

export function StatusMessage({
  announce = 'polite',
  children,
  className,
  label,
  tone = 'info',
  ...props
}: StatusMessageProps) {
  const resolvedLabel = label ?? DEFAULT_LABELS[tone];
  const role = announce === 'off' ? undefined : announce === 'assertive' ? 'alert' : 'status';

  return (
    <div
      {...props}
      aria-atomic={role ? true : undefined}
      aria-live={announce === 'off' ? undefined : announce}
      className={`${styles.status} ${className ?? ''}`}
      data-tone={tone}
      role={role}
    >
      <span className={styles.mark} aria-hidden="true">
        {tone === 'success' ? '✓' : tone === 'info' ? 'i' : '!'}
      </span>
      <span>
        <strong className={styles.label}>{resolvedLabel}:</strong> {children}
      </span>
    </div>
  );
}
