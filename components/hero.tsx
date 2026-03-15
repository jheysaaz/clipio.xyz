"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Cursor {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  name: string;
  type: "pointer" | "text";
}

const cursorColors = [
  { color: "#3b82f6", type: "pointer" as const },
  { color: "#ef4444", type: "text" as const },
  { color: "#10b981", type: "pointer" as const },
  { color: "#f59e0b", type: "text" as const },
  { color: "#8b5cf6", type: "pointer" as const },
];

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/clipio-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod";

export function HeroSection() {
  const t = useTranslations("hero");
  const cursorNames = t.raw("cursorNames") as string[];

  const [isDispersing, setIsDispersing] = useState(false);
  const [cursors, setCursors] = useState<Cursor[]>(() => {
    // Avoid center area (30-70% width, 20-60% height) for initial positions
    const avoidCenter = (maxRetries = 20): { x: number; y: number } => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      if (maxRetries > 0 && x > 30 && x < 70 && y > 20 && y < 60) {
        return avoidCenter(maxRetries - 1);
      }
      return { x, y };
    };

    return Array.from({ length: 5 }, (_, i) => {
      const { x, y } = avoidCenter();
      const target = avoidCenter();
      return {
        id: i,
        x,
        y,
        targetX: target.x,
        targetY: target.y,
        color: cursorColors[i].color,
        name: cursorNames[i] ?? `User ${i + 1}`,
        type: cursorColors[i].type,
      };
    });
  });

  useEffect(() => {
    // Animate cursors toward their targets at 20fps
    const interval = setInterval(() => {
      setCursors((prev) =>
        prev.map((cursor) => {
          if (isDispersing) {
            // During dispersion: move cursors toward edge targets quickly
            const dx = cursor.targetX - cursor.x;
            const dy = cursor.targetY - cursor.y;
            return {
              ...cursor,
              x: cursor.x + dx * 0.1,
              y: cursor.y + dy * 0.1,
            };
          }

          const dx = cursor.targetX - cursor.x;
          const dy = cursor.targetY - cursor.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 2) {
            // Reached target — pick a new one avoiding center
            const avoidCenter = (maxRetries = 20): { x: number; y: number } => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              if (maxRetries > 0 && x > 30 && x < 70 && y > 20 && y < 60) {
                return avoidCenter(maxRetries - 1);
              }
              return { x, y };
            };
            const { x, y } = avoidCenter();
            return { ...cursor, targetX: x, targetY: y };
          }

          return {
            ...cursor,
            x: cursor.x + dx * 0.05,
            y: cursor.y + dy * 0.05,
          };
        }),
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isDispersing]);

  const handleDisperse = () => {
    // Set cursor targets to the edges for dispersion animation
    setCursors((prev) =>
      prev.map((cursor, i) => {
        const angle = (i / prev.length) * Math.PI * 2;
        const distance = 150; // Move beyond the viewport edge
        return {
          ...cursor,
          targetX: 50 + Math.cos(angle) * distance,
          targetY: 50 + Math.sin(angle) * distance,
        };
      }),
    );
    setIsDispersing(true);

    // Navigate to Chrome Web Store after dispersion animation completes
    setTimeout(() => {
      window.open(CHROME_STORE_URL, "_blank", "noopener,noreferrer");
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Dotted notebook background */}
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(240 5% 64.9%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Animated cursors — decorative, hidden from assistive tech */}
      <div aria-hidden="true">
        {cursors.map((cursor) => (
          <div
            key={cursor.id}
            className="pointer-events-none absolute transition-opacity duration-300"
            style={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              {cursor.type === "pointer" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="drop-shadow-xl"
                  style={{ transform: "scaleX(-1)", color: cursor.color }}
                >
                  <path
                    d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-xl"
                  style={{ color: cursor.color }}
                >
                  <path
                    d="M9 4L10 4C11.1046 4 12 4.89543 12 6L12 18C12 19.1046 11.1046 20 10 20L9 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 4L14 4C12.8954 4 12 4.89543 12 6L12 18C12 19.1046 12.8954 20 14 20L15 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12H14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div
                className="absolute left-6 top-1 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-white shadow-lg"
                style={{ backgroundColor: cursor.color }}
              >
                {cursor.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            {t("headline")}
            <br />
            {t("headlineAccent")}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={handleDisperse}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
      </div>
    </section>
  );
}
