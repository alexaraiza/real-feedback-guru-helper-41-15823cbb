import { ReviewCard } from "@/components/ReviewCard";
import { ExampleReviews } from "@/components/ExampleReviews";
import { Button } from "@/components/ui/button";
import { Phone, Bot, Utensils, Share2, Users, Building2, Gift, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { DesktopLayout } from "@/components/layout/DesktopLayout";
import { WidgetContainer } from "@/components/widget/WidgetContainer";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { toast } = useToast();
  const [showWidget, setShowWidget] = useState(false);
  const isMobile = useIsMobile();

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

  const customerFeatures = [
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Share Reviews",
      description: "Share your dining experiences through text or voice and help others discover great restaurants"
    },
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Earn Rewards",
      description: "Get exclusive rewards and discounts for your honest feedback"
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Quality Assurance",
      description: "AI-powered review refinement ensures your feedback is constructive and helpful"
    }
  ];

  const restaurantFeatures = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Customer Insights",
      description: "Get valuable feedback and insights from your customers"
    },
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: "Brand Building",
      description: "Build your restaurant's online presence and reputation"
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI-Powered Tools",
      description: "Leverage AI to better understand and respond to customer feedback"
    }
  ];

  const AppContent = () => (
    <div className="bg-gradient-to-b from-white via-[#D6BCFA]/5 to-[#E5DEFF]/20">
      {/* Hero Section */}
      <section className="relative py-12">
        <div className="px-6 text-center">
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="EatUP! Logo" 
            className="h-20 mx-auto mb-6 hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-3xl font-bold tracking-tight text-secondary mb-4">
            The Future of Restaurant Reviews
          </h1>
          <p className="text-base text-muted-foreground mb-6">
            Join the EatUP! community where authentic dining experiences create meaningful connections.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSurveyCallClick}
              className="w-full bg-[#D6BCFA] hover:bg-[#D6BCFA]/90 text-secondary shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Phone className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              Try Voice Review Demo
            </Button>
            <Link to="/restaurants/register-interest" className="w-full">
              <Button 
                variant="outline"
                className="w-full border-[#D6BCFA] text-secondary hover:bg-[#D6BCFA] hover:text-secondary"
              >
                <Utensils className="mr-2 h-4 w-4" />
                Register Restaurant Interest
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Sections */}
      <section className="py-12 px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">How It Works</h2>
          <p className="text-sm text-muted-foreground">
            Discover how EatUP! benefits both diners and restaurants
          </p>
        </div>

        {/* For Customers */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">For Customers</h3>
          <div className="space-y-4">
            {customerFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#FFDEE2]/20 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Restaurants */}
        <div>
          <h3 className="text-lg font-semibold mb-4">For Restaurants</h3>
          <div className="space-y-4">
            {restaurantFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#E5DEFF]/20 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">Try It Out</h2>
        <ReviewCard
          businessName="The Local Kitchen & Bar"
          businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
          onTakeAiSurvey={handleSurveyCallClick}
        />
      </section>

      {/* Recent Reviews */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Restaurant Success Stories</h2>
        <ExampleReviews />
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-gradient-to-t from-[#FFDEE2]/20 to-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
          <p className="text-base text-muted-foreground mb-6">
            Join EatUP! and start building stronger connections with your customers.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/restaurants/register-interest" className="w-full">
              <Button 
                className="w-full bg-[#D6BCFA] hover:bg-[#D6BCFA]/90 text-secondary"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Register Your Interest
              </Button>
            </Link>
            <Button 
              variant="outline"
              onClick={handleSurveyCallClick}
              className="w-full border-[#D6BCFA] text-secondary hover:bg-[#D6BCFA] hover:text-secondary"
            >
              <Bot className="mr-2 h-4 w-4" />
              Try Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F1F1] py-8">
      {isMobile ? (
        <PhoneFrame>
          <AppContent />
        </PhoneFrame>
      ) : (
        <DesktopLayout>
          <AppContent />
        </DesktopLayout>
      )}
      <WidgetContainer showWidget={showWidget} />
    </div>
  );
};

export default Index;
