import { FIXTURE_BANNER } from '@/lib/commerce';
import styles from './commerce.module.css';

export function DemoBanner() {
  return (
    <div className={styles.demoBanner} role="region" aria-label="Aviso de demonstração">
      <strong>DEMONSTRAÇÃO</strong>
      <span>{FIXTURE_BANNER.replace(/^Demonstração — /, '')}</span>
    </div>
  );
}
