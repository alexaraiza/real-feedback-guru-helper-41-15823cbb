import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFE5ED] to-[#FFD5E2]/20">
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50" />
          <img
            src="/lovable-uploads/904ec366-7d38-41e6-b8ef-909e3fb33baf.png"
            alt="Restaurant atmosphere"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
                alt="EatUP! Logo" 
                className="h-20 md:h-28 w-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-secondary">
              The Future of Restaurant Reviews
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your dining feedback experience with AI-powered voice reviews. 
              Boost positive reviews and reward happy customers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/demo")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg group"
                size="lg"
              >
                <Bot className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Try Voice Review Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="pt-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-pink-100">
                  <div className="font-semibold text-xl mb-2">Voice Reviews</div>
                  <p className="text-muted-foreground">Collect detailed feedback effortlessly through natural conversation</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-pink-100">
                  <div className="font-semibold text-xl mb-2">Smart Rewards</div>
                  <p className="text-muted-foreground">Automatically generate personalized offers for positive experiences</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-pink-100">
                  <div className="font-semibold text-xl mb-2">Custom Pages</div>
                  <p className="text-muted-foreground">Branded review pages that match your restaurant's identity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;