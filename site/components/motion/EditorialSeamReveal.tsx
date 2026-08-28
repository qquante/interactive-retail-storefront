'use client';

import { useEffect, useRef } from 'react';
import { createScope } from 'animejs/scope';
import { createTimeline } from 'animejs/timeline';

import styles from './motion.module.css';

export interface EditorialSeamRevealProps {
  className?: string;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

/**
 * Progressive enhancement for the dark-to-light boundary below the Home hero.
 * The base seam is complete in static HTML/CSS; Anime.js only draws a short
 * highlight over it, so content and calls to action never wait for motion.
 */
export function EditorialSeamReveal({ className }: EditorialSeamRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = createScope({
      root: rootRef,
      mediaQueries: {
        reduce: '(prefers-reduced-motion: reduce)',
      },
    });

    scope.add((self) => {
      if (self?.matches.reduce) return;

      createTimeline({ defaults: { ease: 'out(3)' } })
        .add(
          '[data-heal-seam-trace]',
          {
            clipPath: {
              from: 'inset(0 100% 0 0)',
              to: 'inset(0 0% 0 0)',
            },
            opacity: { from: 0.45, to: 1 },
            duration: 720,
          },
          0,
        )
        .add(
          '[data-heal-seam-ember]',
          {
            opacity: { from: 0, to: 0.72 },
            scale: { from: 0.65, to: 1 },
            duration: 180,
          },
          420,
        );
    });

    return () => scope.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className={joinClassNames(styles.seam, className)}
      aria-hidden="true"
    >
      <span className={styles.seamTrace} data-heal-seam-trace />
      <span className={styles.seamEmber} data-heal-seam-ember />
    </div>
  );
}
