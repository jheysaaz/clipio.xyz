"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/clipio-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod";

type FormState = "idle" | "submitting" | "submitted";

export function UninstallFeedback() {
  const t = useTranslations("uninstall");
  const reasons = t.raw("reasons") as string[];

  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  function toggleReason(index: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");

    const selectedReasons = [...selected].map((i) => reasons[i]);
    const trimmedComment = comment.trim();
    const trimmedEmail = email.trim();

    const reasonsSummary = selectedReasons.length > 0
      ? selectedReasons.join("; ")
      : "No reason selected";
    const fullMessage = trimmedComment
      ? `[Uninstall] ${reasonsSummary} — "${trimmedComment}"`
      : `[Uninstall] ${reasonsSummary}`;

    try {
      Sentry.captureFeedback({
        message: fullMessage,
        name: "Uninstall Feedback",
        ...(trimmedEmail ? { email: trimmedEmail } : {}),
      });
    } catch {
      // Silently fail — don't surface Sentry errors to the user
    }

    setFormState("submitted");
  }

  function handleSkip() {
    setFormState("submitted");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content" className="grow">
        {/* Nav bar */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/clipio.png"
                alt="Clipio Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="font-bold">Clipio</span>
            </Link>
          </div>
        </div>

        {/* Main two-column content */}
        <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 max-w-5xl mx-auto">

            {/* Left column — empathy message + reinstall CTA */}
            <div className="lg:flex-1 lg:sticky lg:top-12 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                {t("headline")}{" "}
                <span className="text-muted-foreground">{t("headlineAccent")}</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {t("subtitle")}
              </p>

              {/* Reinstall CTA — shown in left col on desktop */}
              <div className="hidden lg:block">
                <ReinstallCTA t={t} />
              </div>
            </div>

            {/* Right column — form */}
            <div className="lg:w-[480px] shrink-0">
              <AnimatePresence mode="wait">
                {formState !== "submitted" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-xl">{t("feedbackHeading")}</CardTitle>
                        <CardDescription>{t("feedbackDescription")}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                          {/* Reason checkboxes */}
                          <fieldset>
                            <legend className="sr-only">{t("feedbackHeading")}</legend>
                            <div className="space-y-2">
                              {reasons.map((reason, index) => {
                                const isChecked = selected.has(index);
                                return (
                                  <label
                                    key={index}
                                    className={cn(
                                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                      "hover:bg-muted/50",
                                      isChecked
                                        ? "border-foreground/30 bg-muted"
                                        : "border-border bg-background",
                                    )}
                                  >
                                    <div className="relative mt-0.5 shrink-0">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleReason(index)}
                                        className="sr-only"
                                      />
                                      <div
                                        className={cn(
                                          "h-4 w-4 rounded border-2 flex items-center justify-center transition-colors",
                                          isChecked
                                            ? "bg-foreground border-foreground"
                                            : "border-muted-foreground",
                                        )}
                                      >
                                        {isChecked && (
                                          <svg
                                            className="h-2.5 w-2.5 text-background"
                                            fill="none"
                                            viewBox="0 0 10 8"
                                            aria-hidden="true"
                                          >
                                            <path
                                              d="M1 4l3 3 5-6"
                                              stroke="currentColor"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        )}
                                      </div>
                                    </div>
                                    <span className="text-sm leading-relaxed text-foreground">
                                      {reason}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </fieldset>

                          {/* Optional comment */}
                          <div className="space-y-1.5">
                            <label
                              htmlFor="uninstall-comment"
                              className="text-sm font-medium text-foreground"
                            >
                              {t("commentLabel")}
                            </label>
                            <textarea
                              id="uninstall-comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder={t("commentPlaceholder")}
                              maxLength={500}
                              rows={3}
                              className={cn(
                                "w-full rounded-lg border border-border bg-background px-3 py-2",
                                "text-sm text-foreground placeholder:text-muted-foreground",
                                "resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                                "transition-colors",
                              )}
                            />
                            {comment.length > 0 && (
                              <p className="text-xs text-muted-foreground text-right">
                                {comment.length}/500
                              </p>
                            )}
                          </div>

                          {/* Optional email */}
                          <div className="space-y-1.5">
                            <label
                              htmlFor="uninstall-email"
                              className="text-sm font-medium text-foreground"
                            >
                              {t("emailLabel")}
                            </label>
                            <input
                              id="uninstall-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={t("emailPlaceholder")}
                              className={cn(
                                "w-full rounded-lg border border-border bg-background px-3 py-2",
                                "text-sm text-foreground placeholder:text-muted-foreground",
                                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                                "transition-colors",
                              )}
                            />
                            <p className="text-xs text-muted-foreground">
                              {t("emailHint")}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3 pt-1">
                            <Button
                              type="submit"
                              disabled={formState === "submitting"}
                              className="flex-1"
                            >
                              {formState === "submitting"
                                ? t("submitting")
                                : t("submit")}
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={handleSkip}
                              className="text-muted-foreground"
                            >
                              {t("skip")}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thank-you"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Card className="shadow-sm">
                      <CardContent className="py-12 text-center">
                        <div className="flex justify-center mb-5">
                          <CheckCircle
                            className="h-14 w-14 text-foreground"
                            strokeWidth={1.5}
                          />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-foreground">
                          {t("thankYouHeading")}
                        </h2>
                        <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                          {t("thankYouBody")}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Reinstall CTA — shown below form on mobile */}
          <div className="lg:hidden mt-12 max-w-5xl mx-auto">
            <ReinstallCTA t={t} />
          </div>
        </section>
      </main>
    </div>
  );
}

function ReinstallCTA({ t }: { t: ReturnType<typeof useTranslations<"uninstall">> }) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 dark:bg-muted/20 p-6">
      <h2 className="text-base font-semibold mb-1.5 text-foreground">
        {t("reinstallHeading")}
      </h2>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {t("reinstallBody")}
      </p>
      <Button asChild variant="outline" size="sm">
        <a
          href="https://chromewebstore.google.com/detail/clipio-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          {t("reinstallButton")}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Button>
      <p className="text-xs text-muted-foreground mt-3">
        {t("reinstallTagline")}
      </p>
    </div>
  );
}
