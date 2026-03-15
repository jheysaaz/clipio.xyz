import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { UninstallFeedback } from "@/components/uninstall-feedback";
import { Footer } from "@/components/footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("uninstallTitle"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function UninstallPage() {
  return (
    <>
      <UninstallFeedback />
      <Footer />
    </>
  );
}
