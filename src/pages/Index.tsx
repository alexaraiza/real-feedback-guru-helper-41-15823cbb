import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { PhoneFrame } from "@/components/PhoneFrame";
import { DesktopLayout } from "@/components/DesktopLayout";
import { WidgetBar } from "@/components/WidgetBar";
import { ReviewCard } from "@/components/ReviewCard";
import { ExampleReviews } from "@/components/ExampleReviews";
import { Button } from "@/components/ui/button";
import { Phone, Bot, Building2, Gift, Star, Share2, Users, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  const [showWidget, setShowWidget] = useState(false);

  const handleSurveyCallClick = () => {
    if (showWidget) {
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        widget.remove();
      }
      const script = document.getElementById('convai-widget-script');
      if (script) {
        script.remove();
      }
      setShowWidget(false);
    } else {
      const existingScript = document.getElementById('convai-widget-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'convai-widget-script';
        script.src = "https://elevenlabs.io/convai-widget/index.js";
        script.async = true;
        script.onload = () => {
          const widgetHtml = document.createElement('div');
          widgetHtml.innerHTML = '<elevenlabs-convai agent-id="tESkAImW1ibEAaF64sKJ" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;"></elevenlabs-convai>';
          document.body.appendChild(widgetHtml.firstChild);
        };
        document.body.appendChild(script);
      } else {
        const widgetHtml = document.createElement('div');
        widgetHtml.innerHTML = '<elevenlabs-convai agent-id="tESkAImW1ibEAaF64sKJ" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;"></elevenlabs-convai>';
        document.body.appendChild(widgetHtml.firstChild);
      }
      setShowWidget(true);
    }
  };

  useEffect(() => {
    return () => {
      const script = document.getElementById('convai-widget-script');
      if (script) {
        script.remove();
      }
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  const MainContent = () => (
    <div className="space-y-16 p-4">
      <div className="text-center space-y-4">
        <img 
          src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
          alt="EatUP! Logo" 
          className="h-20 mx-auto hover:scale-105 transition-transform duration-300"
        />
        <h1 className="text-2xl font-bold text-secondary">
          Share Your Dining Experience
        </h1>
        <p className="text-sm text-muted-foreground">
          Use voice or text to share your feedback and earn rewards
        </p>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleSurveyCallClick}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          <Phone className="mr-2 h-4 w-4" />
          Try Voice Review
        </Button>
        <ReviewCard
          businessName="The Local Kitchen & Bar"
          businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
          onTakeAiSurvey={handleSurveyCallClick}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Recent Reviews</h2>
        <ExampleReviews />
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <PhoneFrame>
          <MainContent />
        </PhoneFrame>
      ) : (
        <DesktopLayout>
          <MainContent />
        </DesktopLayout>
      )}
      {showWidget && <WidgetBar />}
    </>
  );
};

export default Index;