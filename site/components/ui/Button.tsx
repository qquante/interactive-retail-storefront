import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet';
export type ButtonTone = 'light' | 'dark';
export type ButtonState = 'idle' | 'loading' | 'error';

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  loadingLabel?: string;
  state?: ButtonState;
  tone?: ButtonTone;
  variant?: ButtonVariant;
};

function joinClassNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function ButtonContents({
  children,
  loadingLabel,
  state,
}: Pick<SharedButtonProps, 'children' | 'loadingLabel' | 'state'>) {
  return (
    <span className={styles.contentGrid}>
      <span className={state === 'loading' ? styles.hiddenLabel : styles.label}>
        {children}
      </span>
      {state === 'loading' ? (
        <span className={styles.loadingLabel}>
          <span className={styles.spinner} aria-hidden="true" />
          {loadingLabel}
        </span>
      ) : null}
      {state === 'error' ? (
        <span className={styles.stateMark} aria-hidden="true">
          !
        </span>
      ) : null}
    </span>
  );
}

export type ButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Button({
  children,
  className,
  disabled = false,
  fullWidth = false,
  loadingLabel = 'Carregando…',
  state = 'idle',
  tone = 'light',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const isLoading = state === 'loading';

  return (
    <button
      {...props}
      aria-busy={isLoading || undefined}
      className={joinClassNames(styles.button, fullWidth && styles.fullWidth, className)}
      data-state={state}
      data-tone={tone}
      data-variant={variant}
      disabled={disabled || isLoading}
      type={type}
    >
      <ButtonContents state={state} loadingLabel={loadingLabel}>
        {children}
      </ButtonContents>
    </button>
  );
}

export type LinkButtonProps = SharedButtonProps & {
  'aria-describedby'?: string;
  'aria-label'?: string;
  disabled?: boolean;
  href: string;
  id?: string;
  prefetch?: boolean;
  rel?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  title?: string;
};

export function LinkButton({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  children,
  className,
  disabled = false,
  fullWidth = false,
  href,
  id,
  loadingLabel = 'Carregando…',
  prefetch,
  rel,
  state = 'idle',
  target,
  title,
  tone = 'light',
  variant = 'primary',
}: LinkButtonProps) {
  const isBlocked = disabled || state === 'loading';
  const buttonClassName = joinClassNames(
    styles.button,
    fullWidth && styles.fullWidth,
    className,
  );
  const contents = (
    <ButtonContents state={state} loadingLabel={loadingLabel}>
      {children}
    </ButtonContents>
  );

  if (isBlocked) {
    return (
      <span
        aria-busy={state === 'loading' || undefined}
        aria-describedby={ariaDescribedBy}
        aria-disabled="true"
        aria-label={ariaLabel}
        className={buttonClassName}
        data-state={state}
        data-tone={tone}
        data-variant={variant}
        id={id}
        title={title}
      >
        {contents}
      </span>
    );
  }

  return (
    <Link
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      className={buttonClassName}
      data-state={state}
      data-tone={tone}
      data-variant={variant}
      href={href}
      id={id}
      prefetch={prefetch}
      rel={rel}
      target={target}
      title={title}
    >
      {contents}
    </Link>
  );
}
