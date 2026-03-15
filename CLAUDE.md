# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Architecture

This is a Next.js 16 marketing/landing page for the Clipio Chrome extension (a code snippet manager). It uses the **App Router** with React 19.

**Key environment variables** (see `.env.example`):
- `NEXT_PUBLIC_API_URL` — backend API endpoint
- `NEXT_PUBLIC_CHROME_EXTENSION_ID` — Chrome extension integration

### Stack

- **Framework**: Next.js 16 App Router (`app/` directory)
- **Styling**: Tailwind CSS 4 — theme is defined via `@theme` in `app/globals.css` (no `tailwind.config.js`)
- **UI components**: shadcn/ui-style components in `components/ui/` using Radix UI primitives and `class-variance-authority` for variants
- **Theme**: `next-themes` for dark/light mode; CSS custom properties defined in `globals.css`
- **Analytics**: Vercel Analytics (`@vercel/analytics`)
- **Path alias**: `@/` maps to the project root

### Component conventions

- UI primitives live in `components/ui/` (button, card, input, label, dropdown-menu)
- Page sections live in `components/` (hero, features, cta, footer, stats, use-cases)
- `"use client"` is only added where needed (e.g., components using hooks or browser APIs)
- Class merging uses the `cn()` utility from `lib/utils.ts` (`clsx` + `tailwind-merge`)
- shadcn CLI config is in `components.json` (style: "new-york", base color: zinc)
