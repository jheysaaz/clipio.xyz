import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/clipio-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="border-t border-border py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            {t("subheading")}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("button")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("tagline")}
          </p>
        </div>
      </div>
    </section>
  );
}
