type HealMarkProps = {
  className?: string;
  title?: string;
};

export function HealMark({ className, title }: HealMarkProps) {
  const labelled = Boolean(title);
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path d="M5.5 27V12.5C5.5 7.1 9.8 3 15.7 3c6 0 10.8 4.2 10.8 9.5V27" />
      <path d="M7 20.5c4.6 0 4.1-6.6 9-6.6s4.4 6.6 9 6.6" />
      <path d="M16 26.5c3.8-3.7-3-6.2.5-10.2 2.8-3.2.5-5.8 1.7-8" />
      <circle cx="16" cy="27" r="1.7" />
    </svg>
  );
}

export function HealBrand({ className }: { className?: string }) {
  return (
    <span className={className}>
      <HealMark />
      <span>HEAL</span>
    </span>
  );
}

