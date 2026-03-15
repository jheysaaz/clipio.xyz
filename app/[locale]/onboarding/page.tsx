import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("onboardingTitle"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingWizard />
    </Suspense>
  );
}
