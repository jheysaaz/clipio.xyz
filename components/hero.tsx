"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  { color: "#3b82f6", name: "Alex", type: "pointer" as const },
  { color: "#ef4444", name: "Sarah", type: "text" as const },
  { color: "#10b981", name: "Mike", type: "pointer" as const },
  { color: "#f59e0b", name: "Emma", type: "text" as const },
  { color: "#8b5cf6", name: "Chris", type: "pointer" as const },
];

export function HeroSection() {
  const router = useRouter();
  const [isDispersing, setIsDispersing] = useState(false);
  const [cursors, setCursors] = useState<Cursor[]>(() =>
    Array.from({ length: 5 }, (_, i) => {
      // Avoid center area (30-70% width, 20-60% height) for initial positions
      const avoidCenter = () => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        if (x > 30 && x < 70 && y > 20 && y < 60) {
          return avoidCenter();
        }
        return { x, y };
      };
      const { x, y } = avoidCenter();
      const target = avoidCenter();

      return {
        id: i,
        x,
        y,
        targetX: target.x,
        targetY: target.y,
        color: cursorColors[i].color,
        name: cursorColors[i].name,
        type: cursorColors[i].type,
      };
    }),
  );

  useEffect(() => {
    // Animate cursors faster
    const interval = setInterval(() => {
      setCursors((prev) =>
        prev.map((cursor) => {
          if (isDispersing) {
            // Durante dispersión, mover hacia los bordes rápidamente
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
            // Reached target, set new target avoiding center
            const avoidCenter = () => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              if (x > 30 && x < 70 && y > 20 && y < 60) {
                return avoidCenter();
              }
              return { x, y };
            };
            const { x, y } = avoidCenter();
            return {
              ...cursor,
              targetX: x,
              targetY: y,
            };
          }

          // Move towards target faster (0.05 instead of 0.02)
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
    // Establecer targets a los bordes
    setCursors((prev) =>
      prev.map((cursor, i) => {
        const angle = (i / prev.length) * Math.PI * 2;
        const distance = 150; // Ir más allá del borde
        return {
          ...cursor,
          targetX: 50 + Math.cos(angle) * distance,
          targetY: 50 + Math.sin(angle) * distance,
        };
      }),
    );
    setIsDispersing(true);

    // Navegar después de 1000ms
    setTimeout(() => {
      router.push(
        "https://chromewebstore.google.com/detail/clipio-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod",
      );
    }, 1000);
  };
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Dotted notebook background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(240 5% 64.9%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Animated cursors */}
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
            {/* Cursor icon */}
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
            {/* Name badge */}
            <div
              className="absolute left-6 top-1 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-white shadow-lg"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.name}
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Clip anything.
            <br />
            Find it instantly.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Save code snippets, email templates, meeting notes, and work docs
            all in one place. Quick to save, instant to find.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={handleDisperse}
              className="gap-2 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/75"
            >
              Try Clipio for free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">Free forever</p>
        </div>
      </div>
    </section>
  );
}
