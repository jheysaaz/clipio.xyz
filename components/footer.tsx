import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/clipio-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src="/clipio.png"
                alt="Clipio Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="text-lg font-bold">Clipio</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("product")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#features" className="hover:text-foreground">
                  {t("features")}
                </Link>
              </li>
              <li>
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  {t("download")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("legal")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
