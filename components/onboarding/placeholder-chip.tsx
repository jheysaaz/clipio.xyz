"use client";

export function PlaceholderChip({
  icon: Icon,
  label,
  extra,
}: {
  icon: React.ElementType;
  label: string;
  extra?: string;
}) {
  return (
    <span
      className="mx-0.5 inline-flex cursor-pointer select-none items-center gap-1 rounded align-baseline font-mono text-[11px] leading-none text-muted-foreground transition-colors hover:bg-accent"
      style={{
        padding: "3px 7px",
        background: "var(--color-muted)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 1px 0 1px var(--color-secondary), 0 2px 3px rgba(0,0,0,0.05)",
      }}
    >
      <Icon size={10} strokeWidth={2.2} />
      {label}
      {extra && <span className="opacity-50">&thinsp;·&thinsp;{extra}</span>}
    </span>
  );
}
