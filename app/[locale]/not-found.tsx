import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <Image
        src="/clipio.png"
        alt="Clipio Logo"
        width={48}
        height={48}
        className="mb-6 h-12 w-12 rounded-xl"
      />
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
        404
      </h1>
      <p className="mb-2 text-xl font-semibold text-foreground">{t("title")}</p>
      <p className="mb-8 max-w-sm text-pretty text-muted-foreground">
        {t("description")}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
