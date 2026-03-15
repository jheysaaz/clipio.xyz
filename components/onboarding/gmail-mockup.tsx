"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Minus, Maximize2, X, Bold, Italic, Underline, Link, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const TRIGGER_LABELS = ["Space", "Tab", "pause"] as const;

export function GmailMockup() {
  const t = useTranslations("onboarding.mockup");
  const [phase, setPhase] = useState<"typing" | "trigger" | "expanded">("typing");
  const [typed, setTyped] = useState("");
  const [triggerIdx, setTriggerIdx] = useState(0);
  const shortcut = "/closing";
  const expanded = t("gmailExpandedBody");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === "typing") {
      if (typed.length < shortcut.length) {
        timer = setTimeout(() => setTyped(shortcut.slice(0, typed.length + 1)), 115);
      } else {
        timer = setTimeout(() => setPhase("trigger"), 500);
      }
    }
    if (phase === "trigger") timer = setTimeout(() => setPhase("expanded"), 450);
    if (phase === "expanded") {
      timer = setTimeout(() => {
        setTriggerIdx((i) => (i + 1) % TRIGGER_LABELS.length);
        setPhase("typing");
        setTyped("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [phase, typed]);

  return (
    <div
      className="w-full overflow-hidden rounded-xl shadow-xl"
      role="img"
      aria-label="Gmail compose window demo showing snippet expansion"
    >
      <div className="bg-[#f6f8fc] px-3 pb-3 pt-2.5">
        {/* Gmail top bar */}
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a73e8]">
            <span className="text-[10px] font-bold text-white">G</span>
          </div>
          <span className="text-sm font-medium text-[#202124]">Gmail</span>
          <div className="ml-1 flex h-7 flex-1 items-center rounded-full border border-[#dfe1e5] bg-[#eaf1fb] px-3">
            <Search size={11} className="mr-2 text-[#5f6368]" aria-hidden="true" />
            <span className="text-xs text-[#5f6368]">{t("gmailSearchPlaceholder")}</span>
          </div>
        </div>

        {/* Compose window */}
        <div className="overflow-hidden rounded-2xl border border-[#dadce0] bg-white shadow-lg">
          <div className="flex items-center justify-between bg-[#404040] px-4 py-2.5">
            <span className="text-sm font-medium text-white">{t("newMessage")}</span>
            <div className="flex items-center gap-4">
              <Minus size={13} className="cursor-pointer text-white/80" aria-hidden="true" />
              <Maximize2 size={12} className="cursor-pointer text-white/80" aria-hidden="true" />
              <X size={13} className="cursor-pointer text-white/80" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-center border-b border-[#e0e0e0] px-4 py-2">
            <span className="mr-4 text-xs text-[#444746]">{t("gmailTo")}</span>
            <span className="text-sm text-[#1f1f1f]">{t("gmailRecipient")}</span>
          </div>
          <div className="flex items-center border-b border-[#e0e0e0] px-4 py-2">
            <span className="text-sm font-medium text-[#1f1f1f]">{t("gmailSubject")}</span>
          </div>

          {/* Body */}
          <div className="min-h-[90px] px-4 py-3 text-sm leading-relaxed text-[#1f1f1f]">
            <AnimatePresence mode="wait">
              {phase === "typing" && (
                <motion.span key="typing" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono">
                  {typed}
                  <span className="inline-block h-4 w-px animate-pulse bg-[#1f1f1f] align-middle" aria-hidden="true" />
                </motion.span>
              )}
              {phase === "trigger" && (
                <motion.span key="trigger" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono">
                  {typed}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#1a73e8]/10 px-2.5 py-0.5 font-sans text-xs text-[#1a73e8]"
                  >
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#1a73e8]" aria-hidden="true" />
                    {TRIGGER_LABELS[triggerIdx] === "pause"
                      ? t("triggerAutoExpanding")
                      : t("triggerExpanding", { label: TRIGGER_LABELS[triggerIdx] })}
                  </motion.span>
                </motion.span>
              )}
              {phase === "expanded" && (
                <motion.span key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  {expanded}
                  <span className="inline-block h-4 w-px animate-pulse bg-[#1f1f1f] align-middle" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Gmail toolbar */}
          <div className="flex items-center gap-1.5 border-t border-[#e0e0e0] bg-white px-4 py-2.5">
            <button className="rounded-full bg-[#1a73e8] px-5 py-2 text-sm font-medium text-white">Send</button>
            <div className="mx-2 h-5 w-px bg-[#e0e0e0]" aria-hidden="true" />
            {[Bold, Italic, Underline, Link].map((Icon, i) => (
              <button key={i} className="rounded p-1.5 text-[#444746] hover:bg-[#f1f3f4]" aria-label={Icon.displayName ?? "Format"}>
                <Icon size={14} aria-hidden="true" />
              </button>
            ))}
            <div className="ml-auto">
              <button className="rounded p-1.5 text-[#444746] hover:bg-[#f1f3f4]" aria-label="Delete">
                <Trash2 size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Trigger badges */}
        <div className="mt-2.5 flex items-center justify-center gap-2" aria-hidden="true">
          {TRIGGER_LABELS.map((label, i) => (
            <span
              key={label}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-all duration-300",
                i === triggerIdx && phase !== "typing"
                  ? "border-[#1a73e8] bg-[#1a73e8]/10 font-medium text-[#1a73e8]"
                  : "border-[#dadce0] bg-white text-[#5f6368]",
              )}
            >
              {label === "pause" ? t("triggerAutoTimeout") : label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
