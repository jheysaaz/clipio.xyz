import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const baseUrl = "https://clipio.xyz";
  const isEn = locale === "en";
  const canonicalUrl = isEn ? baseUrl : `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Clipio" }],
    creator: "Clipio",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: baseUrl,
        es: `${baseUrl}/es`,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Clipio",
      locale: isEn ? "en_US" : "es_ES",
      alternateLocale: isEn ? ["es_ES"] : ["en_US"],
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Clipio – Snippet Manager for Chrome",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://clipio.xyz/#website",
      url: "https://clipio.xyz",
      name: "Clipio",
      description: "Snippet Manager for Chrome",
      inLanguage: ["en", "es"],
    },
    {
      "@type": "Organization",
      "@id": "https://clipio.xyz/#organization",
      name: "Clipio",
      url: "https://clipio.xyz",
      logo: {
        "@type": "ImageObject",
        url: "https://clipio.xyz/clipio.png",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "privacy@clipio.xyz",
        contactType: "customer support",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://clipio.xyz/#app",
      name: "Clipio",
      operatingSystem: "Chrome",
      applicationCategory: "ProductivityApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url: "https://chromewebstore.google.com/detail/clipio-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod",
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Skip to main content for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
        >
          {locale === "es" ? "Saltar al contenido principal" : "Skip to main content"}
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
