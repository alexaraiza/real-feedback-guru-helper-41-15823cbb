import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RestaurantHeader } from "@/components/demo/RestaurantHeader";
import { ReviewSection } from "@/components/demo/ReviewSection";
import { Building2, ArrowRight, Star, Utensils, MessageSquare, Gift, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiSurveyWidget } from "@/components/demo/AiSurveyWidget";

const DemoPage = () => {
  const navigate = useNavigate();
  const [showWidget, setShowWidget] = useState(false);

  const handleRegistrationClick = () => {
    window.open("https://forms.gle/7Zfrin7spzLWixGj9", "_blank");
  };

  const handleSurveyDemoClick = () => {
    setShowWidget(!showWidget);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-[#FFE5ED] to-[#FFD5E2]/20 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center mb-8"
          >
            <img 
              src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
              alt="EatUP! Logo" 
              className="h-20 md:h-28 w-auto hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-secondary mb-6"
          >
            Transform Your Restaurant's Review Strategy
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Boost positive reviews, increase customer retention, and gather actionable feedback with our innovative AI-powered platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-4">
                <Star className="h-8 w-8 text-[#E94E87]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Positive Review Acceleration</h3>
              <p className="text-muted-foreground">
                Turn happy customers into brand advocates with AI-enhanced review generation and instant reward incentives
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-4">
                <Gift className="h-8 w-8 text-[#E94E87]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Revisit Rewards</h3>
              <p className="text-muted-foreground">
                Drive customer loyalty with our 4-visit reward program, turning first-time diners into regular patrons
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-[#E94E87]" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Customer Survey</h3>
              <p className="text-muted-foreground">
                Free up staff time with our AI-powered voice feedback system that captures detailed customer insights
              </p>
            </div>
          </motion.div>

          {/* AI Survey Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Bot className="h-8 w-8 text-[#E94E87]" />
              <h2 className="text-2xl font-bold">EatUP! AI Customer Survey</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Experience our conversational AI that engages customers in natural dialogue, gathering comprehensive feedback about their dining experience while your staff focuses on service.
            </p>
            <Button
              onClick={handleSurveyDemoClick}
              className="bg-[#E94E87] hover:bg-[#E94E87]/90 text-white font-semibold"
            >
              Try AI Survey Demo
              <Bot className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <RestaurantHeader 
          logoUrl="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
          name="Demo Restaurant"
          description="Share your positive dining experience!"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <ReviewSection />

          <div className="relative">
            <div className="sticky top-24 space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-pink-100">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Ready to Transform Your Restaurant Reviews?
                </h2>
                <p className="text-gray-600">
                  Join restaurants that are revolutionizing their customer feedback experience.
                </p>
              </div>

              <div className="space-y-4 py-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Boost Positive Reviews</h3>
                    <p className="text-sm text-gray-600">Encourage happy customers to share their experiences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Utensils className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Custom Review Pages</h3>
                    <p className="text-sm text-gray-600">Personalized review collection pages for your restaurant</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleRegistrationClick}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
              >
                Register Your Restaurant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AiSurveyWidget show={showWidget} />
    </div>
  );
};

export default DemoPage;