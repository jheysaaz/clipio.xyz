"use client";

export function KbdBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
      style={{
        background: "var(--color-secondary)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 1px 0 0.5px var(--color-border), 0 2px 3px rgba(0,0,0,0.06)",
      }}
    >
      {children}
    </span>
  );
}
