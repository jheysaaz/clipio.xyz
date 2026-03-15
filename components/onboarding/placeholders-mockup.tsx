"use client";

import { useState } from "react";
import { Bold, Italic, Underline, Link, ImageIcon, Film, Clipboard, Calendar, MousePointer2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PlaceholderChip } from "./placeholder-chip";

export function PlaceholdersMockup() {
  const t = useTranslations("onboarding.mockup");
  const [dateFormat, setDateFormat] = useState<"long" | "iso" | "us">("long");
  const formats = ["long", "iso", "us"] as const;
  const formatLabels = { long: "March 14, 2026", iso: "2026-03-14", us: "03/14/2026" };

  const chips = [
    { icon: Clipboard, label: "clipboard", desc: t("clipboardDesc") },
    { icon: Calendar, label: "today", desc: t("dateDesc") },
    { icon: MousePointer2, label: "cursor", desc: t("cursorDesc") },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-amber-400" />
        <div className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs font-medium text-muted-foreground">Clipio — Snippet editor</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 py-4">
        {/* Toolbar */}
        <div
          className="flex w-fit shrink-0 items-center gap-0.5 rounded-lg border border-border bg-popover px-2 py-1.5 shadow-sm"
          role="toolbar"
          aria-label="Text formatting"
        >
          {[Bold, Italic, Underline, Link, ImageIcon, Film].map((Icon, i) => (
            <button key={i} className="rounded-md p-1.5 hover:bg-accent" aria-label={Icon.displayName ?? "Format"}>
              <Icon size={13} className="text-muted-foreground" aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="shrink-0 rounded-md border border-ring bg-background px-4 py-3 text-sm leading-[2.4]">
          <span>Hi&nbsp;</span>
          <PlaceholderChip icon={Clipboard} label="clipboard" />
          <span>,</span>
          <br />
          <span>Thanks for reaching out on&nbsp;</span>
          <PlaceholderChip icon={Calendar} label="today" extra={dateFormat} />
          <span>.&nbsp;I&apos;ll follow up shortly.</span>
          <PlaceholderChip icon={MousePointer2} label="cursor" />
          <br />
          <span className="text-muted-foreground">Best,</span>
        </div>

        {/* Date format selector */}
        <div className="shrink-0">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {t("clickDateHint")}
          </p>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-1.5" role="radiogroup" aria-label="Date format">
            {formats.map((f) => (
              <button
                key={f}
                role="radio"
                aria-checked={f === dateFormat}
                onClick={() => setDateFormat(f)}
                className={cn(
                  "flex-1 rounded-md px-3 py-2 text-xs transition-all",
                  f === dateFormat ? "bg-background border border-border font-medium shadow-sm" : "text-muted-foreground hover:bg-background/60",
                )}
              >
                <div className="font-mono font-semibold">{f === "long" ? "long" : f.toUpperCase()}</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{formatLabels[f]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Chip reference */}
        <div className="grid shrink-0 grid-cols-3 gap-2">
          {chips.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-muted/30 p-2.5">
              <PlaceholderChip icon={item.icon} label={item.label} />
              <span className="text-center text-[10px] text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
