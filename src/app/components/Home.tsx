import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { InteractivePreviewSection } from "./InteractivePreviewSection";
import { AdditionalFeatures } from "./AdditionalFeatures";
import { TestimonialsSection } from "./TestimonialsSection";
import { CTASection } from "./CTASection";
import { FAQSection } from "./FAQSection";

export function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <InteractivePreviewSection />
      <AdditionalFeatures />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
