"use client";

import { Search, Plus, Settings, Bold, Italic, Underline, Link, ImageIcon, Film, MousePointer2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { KbdBadge } from "./kbd-badge";
import { PlaceholderChip } from "./placeholder-chip";

export function CreateSnippetMockup() {
  const t = useTranslations("onboarding.mockup");

  const sidebarSnippets = t.raw("sidebarSnippets") as Array<{
    label: string;
    shortcut: string;
    preview: string;
  }>;

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      {/* Window chrome */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-amber-400" />
        <div className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs font-medium text-muted-foreground">Clipio</span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <div className="flex w-44 shrink-0 flex-col border-r border-border lg:w-52">
          <div className="shrink-0 border-b border-border px-2.5 py-2">
            <div className="flex h-8 items-center gap-2 rounded-md border border-border bg-background px-2.5">
              <Search size={11} className="shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">{t("search")}</span>
              <span className="ml-auto text-[10px] text-muted-foreground/50">⌘K</span>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto py-1.5">
            {sidebarSnippets.map((s, i) => (
              <div
                key={s.shortcut}
                className={cn(
                  "mx-1.5 flex cursor-pointer flex-col gap-1 rounded-lg px-2.5 py-2",
                  i === 0 ? "border-l-2 border-primary bg-accent/70" : "hover:bg-accent/40",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="flex-1 truncate text-xs font-medium">{s.label}</span>
                  <KbdBadge>{s.shortcut}</KbdBadge>
                </div>
                <span className="truncate text-[10px] text-muted-foreground">{s.preview}</span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1.5 border-t border-border px-2.5 py-2">
            <button
              className="flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md bg-primary text-xs font-medium text-primary-foreground"
              aria-label={t("newSnippet")}
            >
              <Plus size={11} aria-hidden="true" /> {t("newSnippet")}
            </button>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-accent"
              aria-label="Settings"
            >
              <Settings size={11} className="text-muted-foreground" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right – edit form */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-end gap-2 border-b border-border px-4 py-2.5">
            <button className="h-7 rounded-md border border-border bg-background px-3 text-xs text-muted-foreground">
              {t("cancel")}
            </button>
            <button className="h-7 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground">
              {t("saveSnippet")}
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {t("labelField")}
              </label>
              <div className="flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs">
                {t("supportClosingLabel")}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {t("shortcutField")}
              </label>
              <div className="flex h-8 items-center rounded-md border border-ring bg-background px-3 font-mono text-xs">
                {t("supportClosingShortcut")}
                <span className="ml-auto h-4 w-px animate-pulse bg-foreground" aria-hidden="true" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {t("contentField")}
              </label>
              <div
                className="mb-2 flex w-fit items-center gap-0.5 rounded-lg border border-border bg-popover px-1.5 py-1.5 shadow-sm"
                role="toolbar"
                aria-label="Text formatting"
              >
                {[Bold, Italic, Underline, Link, ImageIcon, Film].map((Icon, i) => (
                  <button key={i} className="rounded-md p-1.5 hover:bg-accent" aria-label={Icon.displayName ?? "Format"}>
                    <Icon size={12} className="text-muted-foreground" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className="min-h-[72px] rounded-md border border-border bg-background px-3 py-2.5 text-xs leading-relaxed">
                {t("editorSupportClosingContent")}&nbsp;
                <PlaceholderChip icon={MousePointer2} label="cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
