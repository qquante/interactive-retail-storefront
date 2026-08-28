'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs/animation';
import { createScope, type Scope } from 'animejs/scope';

import styles from './motion.module.css';

export interface EmberCartFeedbackProps {
  /** Changes only after the commerce layer confirms an add-to-cart operation. */
  eventKey: string | number | null;
  /** Visible confirmation; it remains useful when motion or JavaScript is absent. */
  message: string;
  className?: string;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

/**
 * Brief visual acknowledgement for a confirmed add-to-cart operation.
 * The polite status message is independent from the decorative ember pulse.
 */
export function EmberCartFeedback({
  eventKey,
  message,
  className,
}: EmberCartFeedbackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const emberRef = useRef<HTMLSpanElement>(null);
  const scopeRef = useRef<Scope | null>(null);
  const previousEventKeyRef = useRef(eventKey);

  useEffect(() => {
    const scope = createScope({
      root: rootRef,
      mediaQueries: {
        reduce: '(prefers-reduced-motion: reduce)',
      },
    });

    scope.add('pulse', () => {
      if (scope.matches.reduce || !emberRef.current) return;

      animate(emberRef.current, {
        translateX: { from: '0px', to: '24px' },
        opacity: { from: 1, to: 0 },
        scale: { from: 0.75, to: 1 },
        duration: 180,
        ease: 'out(3)',
      });
    });

    scopeRef.current = scope;

    return () => {
      scopeRef.current = null;
      scope.revert();
    };
  }, []);

  useEffect(() => {
    if (Object.is(previousEventKeyRef.current, eventKey)) return;

    previousEventKeyRef.current = eventKey;
    if (eventKey === null) return;

    scopeRef.current?.methods.pulse();
  }, [eventKey]);

  return (
    <div
      ref={rootRef}
      className={joinClassNames(styles.cartFeedback, className)}
    >
      <span className={styles.emberTrack} aria-hidden="true">
        <span ref={emberRef} className={styles.cartEmber} />
      </span>
      <p
        className={styles.cartStatus}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </p>
    </div>
  );
}
