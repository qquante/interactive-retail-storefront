import { useId, type DetailsHTMLAttributes, type ReactNode } from 'react';
import styles from './Accordion.module.css';

export type AccordionProps = Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'children' | 'title'> & {
  children: ReactNode;
  title: ReactNode;
};

export function Accordion({ children, className, title, ...props }: AccordionProps) {
  const panelId = useId();

  return (
    <details {...props} className={`${styles.accordion} ${className ?? ''}`}>
      <summary aria-controls={panelId} className={styles.summary}>
        <span>{title}</span>
        <span aria-hidden="true" className={styles.mark}>
          +
        </span>
      </summary>
      <div className={styles.panel} id={panelId}>
        {children}
      </div>
    </details>
  );
}
