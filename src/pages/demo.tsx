import { useState } from "react";
import { RestaurantHeader } from "@/components/demo/RestaurantHeader";
import { ReviewSection } from "@/components/demo/ReviewSection";
import { AiSurveyWidget } from "@/components/demo/AiSurveyWidget";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/demo/sections/HeroSection";
import { FeatureCards } from "@/components/demo/sections/FeatureCards";
import { AiSurveySection } from "@/components/demo/sections/AiSurveySection";
import { RegistrationSection } from "@/components/demo/sections/RegistrationSection";

const DemoPage = () => {
  const [showWidget, setShowWidget] = useState(false);

  const handleSurveyDemoClick = () => {
    setShowWidget(!showWidget);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <HeroSection onSurveyDemoClick={handleSurveyDemoClick} />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <FeatureCards />
          <AiSurveySection onSurveyDemoClick={handleSurveyDemoClick} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <RestaurantHeader 
            logoUrl="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
            name="Demo Restaurant"
            description="Share your positive dining experience!"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ReviewSection />
            <RegistrationSection />
          </div>
        </div>
      </div>
      <AiSurveyWidget show={showWidget} />
      <Footer />
    </div>
  );
};

export default DemoPage;