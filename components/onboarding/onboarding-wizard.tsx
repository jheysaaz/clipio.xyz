"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Puzzle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CreateSnippetMockup } from "./create-snippet-mockup";
import { GmailMockup } from "./gmail-mockup";
import { PlaceholdersMockup } from "./placeholders-mockup";
import { ImagesMockup } from "./images-mockup";
import { SyncMockup } from "./sync-mockup";

const CHROME_EXTENSION_URL =
  "https://chromewebstore.google.com/detail/clipio-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
};

export function OnboardingWizard() {
  const t = useTranslations("onboarding");
  const searchParams = useSearchParams();
  const router = useRouter();
  const fromExtension = searchParams.get("ext") !== null;

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);

  // Build steps array (visuals are React components)
  const STEPS = [
    {
      id: "welcome",
      eyebrow: t("steps.0.eyebrow"),
      title: t("steps.0.title"),
      description: t("steps.0.description"),
      bullets: t.raw("steps.0.bullets") as string[],
      visual: null,
    },
    {
      id: "create-snippet",
      eyebrow: t("steps.1.eyebrow"),
      title: t("steps.1.title"),
      description: t("steps.1.description"),
      bullets: t.raw("steps.1.bullets") as string[],
      visual: <CreateSnippetMockup />,
    },
    {
      id: "expand",
      eyebrow: t("steps.2.eyebrow"),
      title: t("steps.2.title"),
      description: t("steps.2.description"),
      bullets: t.raw("steps.2.bullets") as string[],
      visual: <GmailMockup />,
    },
    {
      id: "placeholders",
      eyebrow: t("steps.3.eyebrow"),
      title: t("steps.3.title"),
      description: t("steps.3.description"),
      bullets: t.raw("steps.3.bullets") as string[],
      visual: <PlaceholdersMockup />,
    },
    {
      id: "images",
      eyebrow: t("steps.4.eyebrow"),
      title: t("steps.4.title"),
      description: t("steps.4.description"),
      bullets: t.raw("steps.4.bullets") as string[],
      visual: <ImagesMockup />,
    },
    {
      id: "sync",
      eyebrow: t("steps.5.eyebrow"),
      title: t("steps.5.title"),
      description: t("steps.5.description"),
      bullets: t.raw("steps.5.bullets") as string[],
      visual: <SyncMockup />,
    },
  ];

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  function go(next: number) {
    if (next < 0 || next >= STEPS.length) return;
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function finish() {
    setDone(true);
  }

  // Keyboard navigation — stable dependency array fixes the missing-deps bug
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return;
      if (e.key === "ArrowRight") isLast ? finish() : go(step + 1);
      if (e.key === "ArrowLeft") go(step - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, isLast, done]); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) {
    return (
      <div className="flex h-screen items-center justify-center overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Check className="h-8 w-8 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight">{t("doneTitle")}</h1>
          <p className="mb-8 text-pretty text-muted-foreground">
            {fromExtension ? t("doneBodyExtension") : t("doneBodyWeb")}
          </p>
          {fromExtension ? (
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                const extId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID;
                window.open(
                  extId ? `chrome-extension://${extId}/popup.html` : CHROME_EXTENSION_URL,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <Puzzle className="h-4 w-4" aria-hidden="true" /> {t("openExtension")}
            </Button>
          ) : (
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => router.push("/")}
            >
              {t("goToHomepage")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
          <p className="mt-4 text-sm text-muted-foreground">{t("revisitHint")}</p>
          <button
            className="mt-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            onClick={() => { setDone(false); setStep(0); }}
          >
            {t("startOver")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      {/* Dotted background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(240 5% 64.9%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Progress bar */}
      <div className="relative z-10 h-0.5 w-full shrink-0 bg-border" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image src="/clipio.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md" aria-hidden="true" />
          <span className="text-sm font-semibold">Clipio</span>
        </div>
        <nav className="flex items-center gap-2" aria-label="Onboarding steps">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === step ? "w-6 bg-primary" : i < step ? "w-2 bg-primary/40" : "w-2 bg-border",
              )}
              aria-label={t("goToStep", { step: i + 1 })}
              aria-current={i === step ? "step" : undefined}
            />
          ))}
        </nav>
        <div className="w-[88px]" aria-hidden="true" />
      </header>

      {/* Main content */}
      <main
        id="main-content"
        className="relative z-10 flex min-h-0 flex-1 items-center px-4 py-2 md:px-8 md:py-4"
      >
        <div className="mx-auto w-full max-w-6xl">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={cn(
                "w-full",
                current.visual
                  ? "grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-10"
                  : "mx-auto max-w-2xl text-center",
              )}
            >
              {/* Text */}
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">{current.eyebrow}</p>
                <h1 className="mb-3 text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                  {current.title}
                </h1>
                <p className="mb-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {current.description}
                </p>
                <ul className="space-y-2.5">
                  {current.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary" aria-hidden="true">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <span className="text-sm leading-relaxed text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              {current.visual && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.3 }}
                  className="min-h-0 w-full"
                  style={{ maxHeight: "calc(100vh - 190px)" }}
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-xl" style={{ maxHeight: "calc(100vh - 190px)" }}>
                    {current.visual}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer navigation */}
      <footer className="relative z-10 flex shrink-0 items-center justify-between border-t border-border bg-background/80 px-6 py-4 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("back")}
        </Button>
        <span className="text-sm text-muted-foreground">
          {t("stepCounter", { current: step + 1, total: STEPS.length })}
        </span>
        {isLast ? (
          <Button
            size="sm"
            onClick={finish}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t("getStarted")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => go(step + 1)}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t("next")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </footer>
    </div>
  );
}
