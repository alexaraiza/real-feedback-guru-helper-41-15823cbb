import { ReviewCard } from "@/components/ReviewCard";
import { ExampleReviews } from "@/components/ExampleReviews";
import { Button } from "@/components/ui/button";
import { Phone, Bot, ChevronDown, MapPin, Utensils, Share2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
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

  const features = [
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Share Reviews",
      description: "Share your dining experiences and help others discover great restaurants"
    },
    {
      icon: <Utensils className="h-8 w-8 text-primary" />,
      title: "Restaurant Rewards",
      description: "Get exclusive rewards and discounts for your honest feedback"
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI-Powered",
      description: "Use our AI assistant to easily share your experience through voice"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="EatUP! Logo" 
            className="h-28 mx-auto mb-8 hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-5xl font-bold tracking-tight text-secondary mb-6">
            Share Reviews, Earn Rewards!
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the EatUP! community where your dining experiences turn into rewards. 
            Share authentic reviews and unlock exclusive offers at your favorite restaurants.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleSurveyCallClick}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Try Voice Review Demo
            </Button>
            <Link to="/restaurants/onboard">
              <Button 
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Utensils className="mr-2 h-5 w-5" />
                Register Your Restaurant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 inline-block p-3 bg-primary/5 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Try Our Review System</h2>
          <ReviewCard
            businessName="The Local Kitchen & Bar"
            businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
            onTakeAiSurvey={handleSurveyCallClick}
          />
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Reviews</h2>
          <ExampleReviews />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join EatUP!?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start sharing your dining experiences and earning rewards today!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/restaurants">
              <Button 
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Browse Restaurants
              </Button>
            </Link>
            <Link to="/restaurants/onboard">
              <Button 
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Utensils className="mr-2 h-5 w-5" />
                Register Your Restaurant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;