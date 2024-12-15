import { useState, useRef, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { CreateReviewPageSection } from "@/components/sections/CreateReviewPageSection";
import { VdaSection } from "@/components/sections/VdaSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ExampleReviews } from "@/components/ExampleReviews";

const Index = () => {
  const [showWidget, setShowWidget] = useState(false);
  const experienceSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showWidget) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showWidget]);

  const scrollToExperience = () => {
    experienceSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSurveyCallClick = () => {
    setShowWidget(!showWidget);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onTryDemo={scrollToExperience} />
      <FeaturesSection />
      <div ref={experienceSectionRef}>
        <DemoSection onSurveyCall={handleSurveyCallClick} />
      </div>
      <CreateReviewPageSection />
      <VdaSection />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
            Restaurant Success Stories
          </h2>
          <ExampleReviews />
        </div>
      </section>
      <CtaSection onTryDemo={scrollToExperience} />

      {showWidget && (
        <div className="fixed bottom-0 right-0 z-[9999] min-w-[320px]">
          <div className="relative">
            <elevenlabs-convai agent-id="CI0HSZaVDE1uT881ruiq"></elevenlabs-convai>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-black rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;