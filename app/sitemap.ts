import type { MetadataRoute } from "next";

const BASE_URL = "https://clipio.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  const locales = ["en", "es"] as const;

  return routes.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: locale === "en" ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${BASE_URL}${path}`,
          es: `${BASE_URL}/es${path}`,
        },
      },
    })),
  );
}
