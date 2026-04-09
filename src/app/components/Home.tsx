import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { AdditionalFeatures } from "./AdditionalFeatures";
import { TestimonialsSection } from "./TestimonialsSection";
import { CTASection } from "./CTASection";
import { FAQSection } from "./FAQSection";

export function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AdditionalFeatures />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
