import { ReviewCard } from "@/components/ReviewCard";
import { ExampleReviews } from "@/components/ExampleReviews";
import { Button } from "@/components/ui/button";
import { Phone, Bot, ChevronDown, MapPin, Utensils, Share2, Info, Users, Building2, Gift, Star } from "lucide-react";
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
            The Future of Restaurant Reviews
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the EatUP! community where authentic dining experiences create meaningful connections between restaurants and their customers.
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
            <Link to="/restaurants/register-interest">
              <Button 
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Utensils className="mr-2 h-5 w-5" />
                Register Restaurant Interest
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - For Customers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works For Customers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your dining experiences and earn rewards while helping others discover great restaurants
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {customerFeatures.map((feature, index) => (
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

      {/* How It Works - For Restaurants */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works For Restaurants</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform customer feedback into growth opportunities for your restaurant
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {restaurantFeatures.map((feature, index) => (
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
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Experience EatUP!</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Share Your Experience</h3>
              <p className="text-muted-foreground">
                Try our innovative review system that makes sharing your dining experience easy and rewarding. 
                Use text or voice to share your feedback and earn rewards from your favorite restaurants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleSurveyCallClick}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Try Voice Review
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Written Review
                </Button>
              </div>
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
          <h2 className="text-3xl font-bold text-center mb-12">Restaurant Success Stories</h2>
          <ExampleReviews />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join EatUP! and start building stronger connections with your customers through meaningful feedback and rewards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/restaurants/register-interest">
              <Button 
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Register Your Interest
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg"
              onClick={handleSurveyCallClick}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Bot className="mr-2 h-5 w-5" />
              Try Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;