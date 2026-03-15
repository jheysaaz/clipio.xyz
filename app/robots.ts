import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/onboarding", "/es/onboarding"],
      },
    ],
    sitemap: "https://clipio.xyz/sitemap.xml",
  };
}
