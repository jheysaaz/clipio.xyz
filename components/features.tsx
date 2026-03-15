import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Code2, Mail, Zap, Search, FolderOpen, Users } from "lucide-react";

const featureIcons = [Code2, Mail, Zap, Search, FolderOpen, Users];

export function FeaturesSection() {
  const t = useTranslations("features");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  // WIP flags correspond to the last two features (Stay Organized, Team Sharing)
  const wipIndexes = new Set([4, 5]);

  return (
    <section id="features" className="border-t border-border py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            {t("subheading")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <Card
                key={feature.title}
                className="group border-border bg-card p-8 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20">
                    <Icon
                      className="h-6 w-6 text-foreground transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  {wipIndexes.has(index) && (
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      {t("wip")}
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
