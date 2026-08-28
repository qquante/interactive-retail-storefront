'use client';

import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react';
import styles from './Field.module.css';

type SharedFieldProps = {
  className?: string;
  error?: ReactNode;
  hint?: ReactNode;
  isLoading?: boolean;
  label: ReactNode;
  loadingLabel?: string;
};

function joinIds(...values: Array<string | undefined>) {
  const ids = values.filter(Boolean).join(' ');
  return ids || undefined;
}

function FieldMessages({
  error,
  errorId,
  hint,
  hintId,
  isLoading,
  loadingId,
  loadingLabel,
}: {
  error?: ReactNode;
  errorId: string;
  hint?: ReactNode;
  hintId: string;
  isLoading: boolean;
  loadingId: string;
  loadingLabel: string;
}) {
  return (
    <>
      {hint ? (
        <span className={styles.hint} id={hintId}>
          {hint}
        </span>
      ) : null}
      {isLoading ? (
        <span className={styles.loadingMessage} id={loadingId} role="status">
          <span className={styles.spinner} aria-hidden="true" />
          {loadingLabel}
        </span>
      ) : null}
      {error ? (
        <span className={styles.error} id={errorId} role="alert">
          <span className={styles.errorMark} aria-hidden="true">
            !
          </span>
          {error}
        </span>
      ) : null}
    </>
  );
}

export type InputFieldProps = SharedFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'size'>;

export function InputField({
  'aria-describedby': ariaDescribedBy,
  className,
  error,
  hint,
  id: providedId,
  isLoading = false,
  label,
  loadingLabel = 'Validando…',
  readOnly,
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const loadingId = `${id}-loading`;

  return (
    <label className={`${styles.field} ${className ?? ''}`} data-invalid={Boolean(error)}>
      <span className={styles.label}>{label}</span>
      <span className={styles.controlWrap} data-loading={isLoading}>
        <input
          {...props}
          aria-busy={isLoading || undefined}
          aria-describedby={joinIds(
            ariaDescribedBy,
            hint ? hintId : undefined,
            isLoading ? loadingId : undefined,
            error ? errorId : undefined,
          )}
          aria-invalid={error ? true : undefined}
          className={styles.control}
          id={id}
          readOnly={readOnly || isLoading}
        />
      </span>
      <FieldMessages
        error={error}
        errorId={errorId}
        hint={hint}
        hintId={hintId}
        isLoading={isLoading}
        loadingId={loadingId}
        loadingLabel={loadingLabel}
      />
    </label>
  );
}

export type SelectFieldProps = SharedFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'size'> & {
    children: ReactNode;
  };

export function SelectField({
  'aria-describedby': ariaDescribedBy,
  children,
  className,
  disabled,
  error,
  hint,
  id: providedId,
  isLoading = false,
  label,
  loadingLabel = 'Carregando opções…',
  ...props
}: SelectFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const loadingId = `${id}-loading`;

  return (
    <label className={`${styles.field} ${className ?? ''}`} data-invalid={Boolean(error)}>
      <span className={styles.label}>{label}</span>
      <span className={styles.controlWrap} data-loading={isLoading}>
        <select
          {...props}
          aria-busy={isLoading || undefined}
          aria-describedby={joinIds(
            ariaDescribedBy,
            hint ? hintId : undefined,
            isLoading ? loadingId : undefined,
            error ? errorId : undefined,
          )}
          aria-invalid={error ? true : undefined}
          className={`${styles.control} ${styles.select}`}
          disabled={disabled || isLoading}
          id={id}
        >
          {children}
        </select>
      </span>
      <FieldMessages
        error={error}
        errorId={errorId}
        hint={hint}
        hintId={hintId}
        isLoading={isLoading}
        loadingId={loadingId}
        loadingLabel={loadingLabel}
      />
    </label>
  );
}
