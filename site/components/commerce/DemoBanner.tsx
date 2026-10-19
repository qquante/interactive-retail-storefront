import { FIXTURE_BANNER } from '@/lib/commerce';
import styles from './commerce.module.css';

export function DemoBanner() {
  return (
    <div className={styles.demoBanner} role="region" aria-label="Status de lançamento">
      <strong>EM PREPARAÇÃO</strong>
      <span>{FIXTURE_BANNER}</span>
    </div>
  );
}
