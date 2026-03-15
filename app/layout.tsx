// Root layout — minimal shell. All locale-specific layout lives in app/[locale]/layout.tsx.
// This file is required by Next.js App Router as the topmost layout.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
