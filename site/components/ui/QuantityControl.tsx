'use client';

import { useEffect, useId, useRef } from 'react';
import styles from './QuantityControl.module.css';

export type QuantityControlProps = {
  className?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  isLoading?: boolean;
  label?: string;
  max?: number;
  min?: number;
  name?: string;
  onChange: (value: number) => void;
  step?: number;
  value: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function QuantityControl({
  className,
  disabled = false,
  error,
  id: providedId,
  isLoading = false,
  label = 'Quantidade',
  max = 99,
  min = 1,
  name = 'quantity',
  onChange,
  step = 1,
  value,
}: QuantityControlProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const loadingId = `${id}-loading`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== String(value)) {
      inputRef.current.value = String(value);
    }
  }, [value]);

  const blocked = disabled || isLoading;
  const decrementDisabled = blocked || value <= min;
  const incrementDisabled = blocked || value >= max;

  const update = (next: number) => {
    const normalized = clamp(next, min, max);
    if (inputRef.current) inputRef.current.value = String(normalized);
    onChange(normalized);
  };

  return (
    <div className={`${styles.field} ${className ?? ''}`} data-invalid={Boolean(error)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.control} role="group" aria-label={label} aria-busy={isLoading || undefined}>
        <button
          aria-label={`Diminuir ${label.toLocaleLowerCase('pt-BR')}`}
          className={styles.stepButton}
          disabled={decrementDisabled}
          onClick={() => update(value - step)}
          type="button"
        >
          <span aria-hidden="true">−</span>
        </button>
        <input
          aria-describedby={
            [isLoading ? loadingId : undefined, error ? errorId : undefined]
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-invalid={error ? true : undefined}
          className={styles.input}
          disabled={disabled}
          id={id}
          inputMode="numeric"
          max={max}
          min={min}
          name={name}
          onBlur={() => {
            if (inputRef.current) inputRef.current.value = String(value);
          }}
          onChange={(event) => {
            const nextDraft = event.currentTarget.value;

            if (!/^\d+$/.test(nextDraft)) return;
            const parsed = Number(nextDraft);
            if (Number.isInteger(parsed) && parsed >= min && parsed <= max) {
              onChange(parsed);
            }
          }}
          readOnly={isLoading}
          ref={inputRef}
          step={step}
          type="number"
          defaultValue={value}
        />
        <button
          aria-label={`Aumentar ${label.toLocaleLowerCase('pt-BR')}`}
          className={styles.stepButton}
          disabled={incrementDisabled}
          onClick={() => update(value + step)}
          type="button"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
      {isLoading ? (
        <span className={styles.loading} id={loadingId} role="status">
          Atualizando quantidade…
        </span>
      ) : null}
      {error ? (
        <span className={styles.error} id={errorId} role="alert">
          <span aria-hidden="true">!</span>
          {error}
        </span>
      ) : null}
    </div>
  );
}
