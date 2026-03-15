import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("privacyTitle"),
  };
}

export default async function PrivacyPolicy({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content" className="grow container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {t("lastUpdated")}
          </p>

          <p className="text-lg leading-relaxed mb-6 text-foreground">
            {t("intro1")}
          </p>

          <p className="mb-8 text-foreground">{t("intro2")}</p>

          <hr className="my-10 border-border" />

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("section1Title")}
            </h2>

            <h3 className="text-xl font-medium mb-3 text-foreground">
              {t("section1aTitle")}
            </h3>
            <p className="mb-4 text-foreground">
              {t("section1aBodyBefore")}
              <code className="bg-muted px-1 rounded text-pink-600 dark:text-pink-400">
                {t("section1aStorageSyncCode")}
              </code>
              {t("section1aBodyMiddle")}
              <code className="bg-muted px-1 rounded text-pink-600 dark:text-pink-400">
                {t("section1aStorageLocalCode")}
              </code>
              {t("section1aBodyAfter")}
            </p>
            <p className="font-semibold text-foreground mb-6">
              {t("section1aEmphasis")}
            </p>

            <h3 className="text-xl font-medium mb-3 text-foreground">
              {t("section1bTitle")}
            </h3>
            <p className="mb-4 text-foreground">{t("section1bBody")}</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              {(t.raw("section1bItems") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="bg-muted border-l-4 border-muted-foreground/40 p-4 mb-6">
              <p className="font-bold mb-2 text-foreground">
                {t("section1bNeverTitle")}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground">
                {(t.raw("section1bNeverItems") as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <h3 className="text-xl font-medium mb-3 text-foreground">
              {t("section1cTitle")}
            </h3>
            <p className="mb-4 text-foreground">{t("section1cBody")}</p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("section2Title")}
            </h2>
            <p className="mb-4 text-foreground">{t("section2Intro")}</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              {(t.raw("section2Items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 italic text-foreground">{t("section2Note")}</p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("section3Title")}
            </h2>
            <p className="text-foreground">{t("section3Body")}</p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("section4Title")}
            </h2>
            <p className="mb-6 text-foreground">
              {t("section4Body")}
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-2 text-left text-foreground">{t("tableService")}</th>
                    <th className="border border-border px-4 py-2 text-left text-foreground">{t("tablePurpose")}</th>
                    <th className="border border-border px-4 py-2 text-left text-foreground">{t("tablePrivacy")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-foreground">Sentry</td>
                    <td className="border border-border px-4 py-2 text-foreground">{t("sentryPurpose")}</td>
                    <td className="border border-border px-4 py-2">
                      <a
                        href="https://sentry.io/privacy"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        sentry.io/privacy
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-foreground">Giphy</td>
                    <td className="border border-border px-4 py-2 text-foreground">{t("giphyPurpose")}</td>
                    <td className="border border-border px-4 py-2">
                      <a
                        href="https://support.giphy.com/hc/en-us/articles/360032872931"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        giphy.com/privacy
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-foreground">Vercel Analytics</td>
                    <td className="border border-border px-4 py-2 text-foreground">{t("vercelPurpose")}</td>
                    <td className="border border-border px-4 py-2">
                      <a
                        href="https://vercel.com/docs/analytics/privacy-policy"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        vercel.com/analytics/privacy
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {t("section4Note")}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong className="text-foreground">Giphy:</strong>{" "}
              {t("giphyNote")}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Vercel Analytics:</strong>{" "}
              {t("vercelNote")}
            </p>
          </section>

          {/* Sections 5 & 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("section5Title")}
            </h2>
            <p className="mb-8 text-foreground">{t("section5Body")}</p>

            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("section6Title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-2 text-foreground">{t("euTitle")}</h4>
                <p className="text-sm text-muted-foreground">{t("euBody")}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-foreground">{t("usTitle")}</h4>
                <p className="text-sm text-muted-foreground">{t("usBody")}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-foreground">{t("coTitle")}</h4>
                <p className="text-sm text-muted-foreground">{t("coBody")}</p>
              </div>
            </div>
            <p className="mt-6 text-center text-foreground">
              {t("contactPrompt")}{" "}
              <a
                href="mailto:privacy@clipio.xyz"
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                privacy@clipio.xyz
              </a>
            </p>
          </section>

          {/* Final Sections */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("section7Title")}
              </h2>
              <p className="text-foreground">{t("section7Body")}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("section8Title")}
              </h2>
              <p className="text-foreground">{t("section8Body")}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t("section9Title")}
              </h2>
              <p className="text-foreground">{t("section9Body")}</p>
            </div>

            <div className="bg-muted p-8 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-2 text-foreground">
                {t("section10Title")}
              </h2>
              <p className="text-foreground">{t("section10Body")}</p>
              <a
                href="mailto:privacy@clipio.xyz"
                className="text-xl text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                privacy@clipio.xyz
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
