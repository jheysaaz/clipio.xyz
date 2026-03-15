"use client";

import { Cloud, HardDrive, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function SyncMockup() {
  const t = useTranslations("onboarding.mockup");
  const settingsMenuItems = t.raw("settingsMenuItems") as string[];

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-amber-400" />
        <div className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs font-medium text-muted-foreground">Clipio — Settings · General</span>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="flex w-36 shrink-0 flex-col gap-0.5 border-r border-border bg-muted/20 p-2 pt-3">
          {settingsMenuItems.map((item, i) => (
            <button key={item} className={cn("rounded-md px-2.5 py-2 text-left text-[11px]", i === 0 ? "bg-accent font-medium" : "text-muted-foreground hover:bg-accent/50")}>
              {item}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-background p-3.5">
                <div className="mb-2 flex items-center gap-2">
                  <Cloud size={13} className="text-indigo-500" aria-hidden="true" />
                  <span className="text-xs font-semibold">{t("syncStorage")}</span>
                </div>
                <div className="mb-1.5 flex justify-between text-[10px] text-muted-foreground">
                  <span>18 KB used</span><span>100 KB max</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={18} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full w-[18%] rounded-full bg-indigo-500" />
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background p-3.5">
                <div className="mb-2 flex items-center gap-2">
                  <HardDrive size={13} className="text-muted-foreground" aria-hidden="true" />
                  <span className="text-xs font-semibold">{t("localStorage")}</span>
                </div>
                <div className="mb-1.5 flex justify-between text-[10px] text-muted-foreground">
                  <span>96 KB used</span><span>~5 MB max</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={2} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full w-[2%] rounded-full bg-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="text-xs font-semibold">{t("syncActive")}</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                {t("allDevicesSynced")}
              </span>
            </div>

            <div className="rounded-xl border border-border bg-background p-3.5">
              <div className="mb-2 flex items-center gap-2">
                <Tag size={12} className="text-muted-foreground" aria-hidden="true" />
                <span className="text-xs font-semibold">{t("tags")}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["support", "sales", "dev", "email", "legal", "hr"].map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
