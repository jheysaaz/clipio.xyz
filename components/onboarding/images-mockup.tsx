"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImageIcon, Film, MousePointer2, Calendar, Clipboard,
  Search, Upload, Check, LayoutGrid, LayoutList, Trash2, Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const FAKE_IMAGES = [
  { id: 1, bg: "bg-blue-100 dark:bg-blue-900/30" },
  { id: 2, bg: "bg-violet-100 dark:bg-violet-900/30" },
  { id: 3, bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  { id: 4, bg: "bg-amber-100 dark:bg-amber-900/30" },
  { id: 5, bg: "bg-rose-100 dark:bg-rose-900/30" },
  { id: 6, bg: "bg-cyan-100 dark:bg-cyan-900/30" },
  { id: 7, bg: "bg-indigo-100 dark:bg-indigo-900/30" },
  { id: 8, bg: "bg-orange-100 dark:bg-orange-900/30" },
  { id: 9, bg: "bg-teal-100 dark:bg-teal-900/30" },
];

export function ImagesMockup() {
  const t = useTranslations("onboarding.mockup");
  const [panel, setPanel] = useState<"commands" | "picker" | "options">("commands");
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const [optView, setOptView] = useState<"grid" | "list">("grid");

  const slashCommands = t.raw("slashCommands") as Array<{ cmd: string; desc: string }>;
  const commandIcons = [ImageIcon, Film, MousePointer2, Calendar, Clipboard];
  const settingsMenuItems = t.raw("settingsMenuItems") as string[];

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      {/* Chrome + tab switcher */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/50 px-3 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-amber-400" />
        <div className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-2 text-xs font-medium text-muted-foreground">Clipio</span>
        <div className="ml-auto flex items-center gap-0.5 rounded-lg border border-border bg-muted/60 p-0.5" role="tablist">
          {(["commands", "picker", "options"] as const).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={panel === tab}
              onClick={() => setPanel(tab)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[10px] font-medium transition-all",
                panel === tab ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab === "commands" ? t("slashCmdsTab") : tab === "picker" ? t("imagePickerTab") : t("settingsTab")}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">

          {/* ── Slash command palette ── */}
          {panel === "commands" && (
            <motion.div key="commands" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="flex h-full flex-col gap-4 p-4" role="tabpanel">
              <div className="relative shrink-0 rounded-md border border-ring bg-background">
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  {t("editorPlaceholderText")}&nbsp;
                  <span className="font-mono text-foreground">/</span>
                  <span className="inline-block h-4 w-px animate-pulse bg-foreground align-middle" aria-hidden="true" />
                </div>
                <div className="absolute left-3 top-full z-10 mt-1 w-64 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
                  <div className="border-b border-border px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("commandsHeader")}</p>
                  </div>
                  {slashCommands.map((item, i) => {
                    const Icon = commandIcons[i] ?? ImageIcon;
                    return (
                      <div key={item.cmd} className={cn("flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition-colors", i === 0 ? "bg-accent" : "hover:bg-accent/50")}>
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-border bg-background">
                          <Icon size={12} className="text-muted-foreground" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-xs font-medium">{item.cmd}</span>
                        <span className="truncate text-xs text-muted-foreground">{item.desc}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-border px-3 py-2 text-center">
                    <span className="text-[10px] text-muted-foreground">
                      <Sparkles size={9} className="mr-1 inline" aria-hidden="true" />
                      {t("moreCommands")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-48 shrink-0" />
              <div className="shrink-0 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                <strong className="text-foreground">{t("tipPrefix")}</strong>{" "}
                {t("tipBody", { imageCmd: "/image", gifCmd: "/gif" })}
              </div>
            </motion.div>
          )}

          {/* ── Image picker ── */}
          {panel === "picker" && (
            <motion.div key="picker" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="flex h-full flex-col gap-3 p-4" role="tabpanel">
              <div className="shrink-0 rounded-md border border-border bg-background px-4 py-2.5 text-sm leading-relaxed">
                {t("editorImageText")}&nbsp;
                {selectedImg !== null ? (
                  <span
                    className="mx-0.5 inline-flex cursor-pointer select-none items-center gap-1 rounded align-baseline font-mono text-[11px] leading-none text-muted-foreground"
                    style={{ padding: "3px 7px", background: "var(--color-muted)", border: "1px solid var(--color-border)", boxShadow: "0 1px 0 1px var(--color-secondary)" }}
                  >
                    <ImageIcon size={10} aria-hidden="true" /> image
                  </span>
                ) : (
                  <span className="font-mono text-foreground">/image</span>
                )}
                <span className="inline-block h-4 w-px animate-pulse bg-foreground align-middle" aria-hidden="true" />
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
                  <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5">
                    <Search size={11} className="shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">{t("searchImages")}</span>
                  </div>
                  <button className="flex h-7 items-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground">
                    <Upload size={10} aria-hidden="true" /> {t("upload")}
                  </button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {FAKE_IMAGES.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImg(img.id)}
                        aria-pressed={selectedImg === img.id}
                        aria-label={`Select image ${img.id}`}
                        className={cn(
                          "group relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                          selectedImg === img.id ? "border-primary ring-2 ring-primary ring-offset-1" : "border-transparent hover:border-border",
                        )}
                      >
                        <div className={cn("flex h-full w-full items-center justify-center", img.bg)}>
                          <ImageIcon size={16} className="text-muted-foreground/40" aria-hidden="true" />
                        </div>
                        {selectedImg === img.id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                              <Check size={11} className="text-primary-foreground" aria-hidden="true" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 border-t border-border px-3 py-2 text-center text-[10px] text-muted-foreground">
                  {selectedImg !== null ? t("imageSelected") : t("clickToInsert")}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Settings > Images ── */}
          {panel === "options" && (
            <motion.div key="options" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="flex h-full min-h-0" role="tabpanel">
              <div className="flex w-32 shrink-0 flex-col gap-0.5 border-r border-border bg-muted/20 p-2 pt-3">
                {settingsMenuItems.map((item) => (
                  <button key={item} className={cn("rounded-md px-2.5 py-2 text-left text-[11px]", item === settingsMenuItems[3] ? "bg-accent font-medium" : "text-muted-foreground hover:bg-accent/50")}>
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">{t("images")}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      {t("imagesStored", { count: 9 })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="hidden items-center gap-1.5 sm:flex">
                      <span className="text-[10px] text-muted-foreground">1.4 MB</span>
                      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-1/4 rounded-full bg-indigo-500" />
                      </div>
                    </div>
                    <div className="flex overflow-hidden rounded-md border border-border">
                      <button
                        onClick={() => setOptView("list")}
                        className={cn("p-1.5", optView === "list" ? "bg-accent" : "hover:bg-muted/50")}
                        aria-pressed={optView === "list"}
                        aria-label="List view"
                      >
                        <LayoutList size={11} className="text-muted-foreground" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => setOptView("grid")}
                        className={cn("p-1.5", optView === "grid" ? "bg-accent" : "hover:bg-muted/50")}
                        aria-pressed={optView === "grid"}
                        aria-label="Grid view"
                      >
                        <LayoutGrid size={11} className="text-muted-foreground" aria-hidden="true" />
                      </button>
                    </div>
                    <button className="flex h-6 items-center gap-1 rounded-md bg-primary px-2 text-[10px] font-medium text-primary-foreground">
                      <Upload size={9} aria-hidden="true" /> {t("upload")}
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
                  {optView === "grid" ? (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                      {FAKE_IMAGES.map((img) => (
                        <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                          <div className={cn("flex h-full w-full items-center justify-center", img.bg)}>
                            <ImageIcon size={14} className="text-muted-foreground/40" aria-hidden="true" />
                          </div>
                          <div className="absolute inset-0 flex items-end justify-end bg-black/0 p-1 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                            <button aria-label="Delete image" className="rounded-md bg-destructive/80 p-1">
                              <Trash2 size={9} className="text-white" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {FAKE_IMAGES.map((img) => (
                        <div key={img.id} className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2">
                          <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-md", img.bg)}>
                            <ImageIcon size={12} className="text-muted-foreground/40" aria-hidden="true" />
                          </div>
                          <div className="flex h-6 min-w-0 flex-1 items-center rounded border border-border bg-muted/30 px-2">
                            <span className="text-[10px] text-muted-foreground">{t("altTextPlaceholder")}</span>
                          </div>
                          <span className="shrink-0 text-[10px] text-muted-foreground">38 KB</span>
                          <button className="shrink-0 rounded p-1 hover:bg-destructive/10" aria-label="Delete image">
                            <Trash2 size={10} className="text-muted-foreground" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
