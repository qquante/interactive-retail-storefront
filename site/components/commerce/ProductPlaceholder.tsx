import styles from './commerce.module.css';

export function ProductPlaceholder({ sequence }: { sequence: string }) {
  return (
    <div
      className={styles.productPlaceholder}
      role="img"
      aria-label={`Imagem demonstrativa abstrata do produto Intervalo ${sequence}; não representa um incenso real.`}
    >
      <span className={styles.incenseStick} aria-hidden="true" />
      <span className={styles.ember} aria-hidden="true" />
      <span className={styles.placeholderLabel}>Imagem demonstrativa · FX-{sequence}</span>
    </div>
  );
}

