import { ReviewCard } from "@/components/ReviewCard";
import { ExampleReviews } from "@/components/ExampleReviews";
import { Button } from "@/components/ui/button";
import { Phone, Bot, ChevronDown, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const [showWidget, setShowWidget] = useState(false);

  const handleSurveyCallClick = () => {
    if (showWidget) {
      // If widget is showing, remove it and the script
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
      // If widget is not showing, add it and the script
      const existingScript = document.getElementById('convai-widget-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'convai-widget-script';
        script.src = "https://elevenlabs.io/convai-widget/index.js";
        script.async = true;
        script.onload = () => {
          // Create and append widget after script is loaded
          const widgetHtml = document.createElement('div');
          widgetHtml.innerHTML = '<elevenlabs-convai agent-id="tESkAImW1ibEAaF64sKJ" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;"></elevenlabs-convai>';
          document.body.appendChild(widgetHtml.firstChild);
        };
        document.body.appendChild(script);
      } else {
        // If script exists but widget was removed, just add widget
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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-6 fade-in">
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="EatUP! Logo" 
            className="h-28 mx-auto hover:scale-105 transition-transform duration-300"
          />
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight text-secondary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Share & Save!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Share your dining experience and unlock exclusive rewards! Get instant savings 
              on your next visit when you submit a review. It's that simple!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={handleSurveyCallClick}
              className="bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {showWidget ? 'Close AI Survey Call' : 'Take AI Survey Call'}
              <Bot className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>

            <Link to="/restaurants" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                size="lg"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white group"
              >
                <MapPin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Browse Restaurants
              </Button>
            </Link>
          </div>
          
          <div className="text-sm font-medium text-primary animate-bounce">
            Complete the AI survey call to enter our monthly prize pool! 🎉
          </div>
        </div>

        <ReviewCard
          businessName="The Local Kitchen & Bar"
          businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
          onTakeAiSurvey={handleSurveyCallClick}
        />

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
          <div className="text-center space-y-6 relative z-10 py-12">
            <h2 className="text-2xl font-semibold text-secondary">How it works:</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-2xl space-y-3">
                <div className="text-3xl font-bold text-primary">1</div>
                <p className="text-secondary/80">
                  Share your experience (written or AI call)
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl space-y-3">
                <div className="text-3xl font-bold text-primary">2</div>
                <p className="text-secondary/80">
                  Get your unique reward code
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl space-y-3">
                <div className="text-3xl font-bold text-primary">3</div>
                <p className="text-secondary/80">
                  Show your code on your next visit to claim rewards!
                </p>
              </div>
            </div>
            <p className="text-primary font-medium text-lg mt-8 animate-pulse">
              ✨ AI Survey Call participants are automatically entered into our monthly prize pool! ✨
            </p>
          </div>
        </div>

        <div className="relative pt-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <ChevronDown className="h-8 w-8 text-primary/50 animate-bounce" />
          </div>
          <ExampleReviews />
        </div>
      </div>
    </div>
  );
};

export default Index;