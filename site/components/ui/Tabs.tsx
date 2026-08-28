'use client';

import { useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import styles from './Tabs.module.css';

export type TabItem = {
  disabled?: boolean;
  id: string;
  label: ReactNode;
  panel: ReactNode;
};

export type TabsProps = {
  'aria-label': string;
  className?: string;
  defaultValue?: string;
  items: TabItem[];
  onValueChange?: (value: string) => void;
  value?: string;
};

export function Tabs({
  'aria-label': ariaLabel,
  className,
  defaultValue,
  items,
  onValueChange,
  value,
}: TabsProps) {
  const enabledItems = useMemo(() => items.filter((item) => !item.disabled), [items]);
  const firstId = enabledItems[0]?.id ?? '';
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstId);
  const activeValue = enabledItems.some((item) => item.id === (value ?? internalValue))
    ? (value ?? internalValue)
    : firstId;
  const instanceId = useId();
  const refs = useRef(new Map<string, HTMLButtonElement>());

  function activate(id: string) {
    if (value === undefined) setInternalValue(id);
    onValueChange?.(id);
  }

  function moveFocus(currentId: string, direction: -1 | 1) {
    if (enabledItems.length === 0) return;
    const currentIndex = enabledItems.findIndex((item) => item.id === currentId);
    const nextIndex = (currentIndex + direction + enabledItems.length) % enabledItems.length;
    const next = enabledItems[nextIndex];
    activate(next.id);
    refs.current.get(next.id)?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, id: string) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      moveFocus(id, 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(id, -1);
    } else if (event.key === 'Home' && enabledItems[0]) {
      event.preventDefault();
      activate(enabledItems[0].id);
      refs.current.get(enabledItems[0].id)?.focus();
    } else if (event.key === 'End' && enabledItems.at(-1)) {
      event.preventDefault();
      const last = enabledItems.at(-1)!;
      activate(last.id);
      refs.current.get(last.id)?.focus();
    }
  }

  return (
    <div className={`${styles.tabs} ${className ?? ''}`}>
      <div aria-label={ariaLabel} className={styles.list} role="tablist">
        {items.map((item) => {
          const selected = item.id === activeValue;
          const tabId = `${instanceId}-${item.id}-tab`;
          const panelId = `${instanceId}-${item.id}-panel`;
          return (
            <button
              aria-controls={panelId}
              aria-selected={selected}
              className={styles.tab}
              disabled={item.disabled}
              id={tabId}
              key={item.id}
              onClick={() => activate(item.id)}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
              ref={(node) => {
                if (node) refs.current.set(item.id, node);
                else refs.current.delete(item.id);
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          aria-labelledby={`${instanceId}-${item.id}-tab`}
          className={styles.panel}
          hidden={item.id !== activeValue}
          id={`${instanceId}-${item.id}-panel`}
          key={item.id}
          role="tabpanel"
          tabIndex={0}
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
