import { HeroSection } from "@/components/hero";
import { FeaturesSection } from "@/components/features";
import { CTASection } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
