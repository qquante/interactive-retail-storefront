'use client';

import {
  useEffect,
  useId,
  useRef,
  type DialogHTMLAttributes,
  type ReactNode,
} from 'react';
import styles from './Overlay.module.css';

type OverlayLayout = 'dialog' | 'drawer';

type OverlayProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'children' | 'open' | 'title'> & {
  children: ReactNode;
  closeLabel?: string;
  description?: ReactNode;
  layout: OverlayLayout;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: ReactNode;
};

function Overlay({
  children,
  className,
  closeLabel = 'Fechar',
  description,
  layout,
  onOpenChange,
  open,
  title,
  ...props
}: OverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (!dialog.open) {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
      }

      const frame = requestAnimationFrame(() => {
        const firstFocusable = dialog.querySelector<HTMLElement>(
          '[autofocus], button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
    if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus();
  }, [open]);

  useEffect(
    () => () => {
      if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus();
    },
    [],
  );

  return (
    <dialog
      {...props}
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={`${styles.overlay} ${className ?? ''}`}
      data-layout={layout}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
      onClose={() => onOpenChange(false)}
      ref={dialogRef}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.title} id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className={styles.description} id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          <button className={styles.close} onClick={() => onOpenChange(false)} type="button">
            <span aria-hidden="true">×</span>
            <span className={styles.srOnly}>{closeLabel}</span>
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  );
}

export type DialogProps = Omit<OverlayProps, 'layout'>;

export function Dialog(props: DialogProps) {
  return <Overlay {...props} layout="dialog" />;
}

export type DrawerProps = Omit<OverlayProps, 'layout'>;

export function Drawer(props: DrawerProps) {
  return <Overlay {...props} layout="drawer" />;
}
