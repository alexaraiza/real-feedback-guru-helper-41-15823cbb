import { ReviewCard } from "@/components/ReviewCard";
import { ExampleReviews } from "@/components/ExampleReviews";
import { Button } from "@/components/ui/button";
import { Building2, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

const Index = () => {
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
      const script = document.createElement('script');
      script.id = 'convai-widget-script';
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.onload = () => {
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'elevenlabs-widget-container';
        widgetContainer.innerHTML = `
          <div class="fixed bottom-0 right-0 z-50">
            <div class="relative">
              <elevenlabs-convai agent-id="tESkAImW1ibEAaF64sKJ"></elevenlabs-convai>
              <div class="absolute bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-sm"></div>
            </div>
          </div>
        `;
        document.body.appendChild(widgetContainer);
      };
      document.body.appendChild(script);
      setShowWidget(true);
    }
  };

  useEffect(() => {
    return () => {
      const script = document.getElementById('convai-widget-script');
      if (script) {
        script.remove();
      }
      const widgetContainer = document.getElementById('elevenlabs-widget-container');
      if (widgetContainer) {
        widgetContainer.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection onTryDemo={handleSurveyCallClick} />
      <FeaturesSection />

      {/* Demo Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FFE5ED]/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
            Experience EatUP!
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="relative">
                <img
                  src="/lovable-uploads/f790e463-d057-4fec-b168-02e376930c1c.png"
                  alt="Dining experience"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#E94E87]/20 to-transparent rounded-lg" />
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#E94E87] to-[#F17BA3] text-transparent bg-clip-text">
                Share Your Experience
              </h3>
              <p className="text-muted-foreground">
                Try our innovative review system that makes sharing your dining experience easy and rewarding. 
                Use text or voice to share your feedback and earn rewards from your favorite restaurants.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <ReviewCard
                businessName="The Local Kitchen & Bar"
                businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
                onTakeAiSurvey={handleSurveyCallClick}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
            Restaurant Success Stories
          </h2>
          <ExampleReviews />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-[#FFE5ED]/20 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="relative">
            <img
              src="/lovable-uploads/0f6756db-d948-479a-aef7-7576f1c15272.png"
              alt="Fine dining"
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
                Ready to Transform Your Restaurant?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join EatUP! and start building stronger connections with your customers through meaningful feedback and rewards.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/restaurants/register-interest">
                  <Button 
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-[#E94E87] to-[#F17BA3] hover:from-[#D13D73] hover:to-[#E94E87]"
                  >
                    <Building2 className="mr-2 h-5 w-5" />
                    Register Your Interest
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={handleSurveyCallClick}
                  className="border-[#E94E87] text-[#E94E87] hover:bg-[#E94E87] hover:text-white"
                >
                  <Bot className="mr-2 h-5 w-5" />
                  Try Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;