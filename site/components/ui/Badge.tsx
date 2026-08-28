import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeTone = 'neutral' | 'fixture' | 'success' | 'error';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  children: ReactNode;
  tone?: BadgeTone;
};

export function Badge({ children, className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={`${styles.badge} ${className ?? ''}`}
      data-tone={tone}
    >
      {children}
    </span>
  );
}
