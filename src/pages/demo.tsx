import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RestaurantHeader } from "@/components/demo/RestaurantHeader";
import { ReviewSection } from "@/components/demo/ReviewSection";
import { Building2, ArrowRight, Star, Utensils, MessageSquare, Gift, Bot, Link2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiSurveyWidget } from "@/components/demo/AiSurveyWidget";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { generateSlug } from "@/utils/urlUtils";

const DemoPage = () => {
  const navigate = useNavigate();
  const [showWidget, setShowWidget] = useState(false);
  const { toast } = useToast();

  const handleRegistrationClick = () => {
    window.open("https://forms.gle/7Zfrin7spzLWixGj9", "_blank");
  };

  const handleSurveyDemoClick = () => {
    setShowWidget(!showWidget);
  };

  const handleCreateCustomDemo = async () => {
    try {
      // Get saved preferences from localStorage
      const savedName = localStorage.getItem('demoRestaurantName');
      const savedUrl = localStorage.getItem('demoGoogleMapsUrl');

      if (!savedName || !savedUrl) {
        toast({
          title: "Missing preferences",
          description: "Please set your restaurant preferences first.",
          variant: "destructive",
        });
        return;
      }

      const slug = generateSlug(savedName);

      // Create demo page in database
      const { data, error } = await supabase
        .from('demo_pages')
        .insert([
          {
            restaurant_name: savedName,
            google_maps_url: savedUrl,
            slug: slug
          }
        ])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Demo already exists",
            description: "A demo page already exists for this restaurant.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      // Copy the URL to clipboard
      const demoUrl = `${window.location.origin}/demo/${slug}`;
      await navigator.clipboard.writeText(demoUrl);

      toast({
        title: "Demo page created!",
        description: "The URL has been copied to your clipboard.",
      });

    } catch (error) {
      console.error('Error creating demo:', error);
      toast({
        title: "Error",
        description: "Failed to create demo page. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <section className="relative py-12 md:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/lovable-uploads/022207d7-8d69-4714-9c28-702011f6f8f3.png"
              alt="Restaurant atmosphere"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#FFE5ED]/80 to-[#FFD5E2]/70" />
          </div>

          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center mb-6 md:mb-8"
            >
              <img 
                src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
                alt="EatUP! Logo" 
                className="h-16 md:h-28 w-auto hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] text-transparent bg-clip-text"
            >
              Transform Your Restaurant's Review Strategy
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-2"
            >
              Boost positive reviews, increase customer retention, and gather actionable feedback with our innovative AI-powered platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12 px-2"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
                <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-3 md:mb-4">
                  <Star className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Positive Review Acceleration</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Turn happy customers into brand advocates with AI-enhanced review generation and instant reward incentives
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
                <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-3 md:mb-4">
                  <Gift className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Revisit Rewards</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Drive customer loyalty with our 4-visit reward program, turning first-time diners into regular patrons
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
                <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-3 md:mb-4">
                  <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">AI Customer Survey</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Free up staff time with our AI-powered voice feedback system that captures detailed customer insights
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto mb-8 md:mb-12"
            >
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Bot className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
                <h2 className="text-xl md:text-2xl font-bold">EatUP! AI Customer Survey</h2>
              </div>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                Experience our conversational AI that engages customers in natural dialogue, gathering comprehensive feedback about their dining experience while your staff focuses on service.
              </p>
              <Button
                onClick={handleSurveyDemoClick}
                className="bg-[#E94E87] hover:bg-[#E94E87]/90 text-white font-semibold w-full md:w-auto"
              >
                Try AI Survey Demo
                <Bot className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <RestaurantHeader 
            logoUrl="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
            name="Demo Restaurant"
            description="Share your positive dining experience!"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ReviewSection />

            <div className="relative">
              <div className="md:sticky md:top-24 space-y-4 md:space-y-6 bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-pink-100">
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                    <Building2 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Ready to Transform Your Restaurant Reviews?
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Join restaurants that are revolutionizing their customer feedback experience.
                  </p>
                  <div className="space-y-4 text-left border-t border-gray-100 pt-4 mt-4">
                    <h3 className="font-semibold text-gray-800">How It Works:</h3>
                    <ol className="space-y-3 text-sm text-gray-600">
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">1.</span>
                        Submit your registration and our team will review your application
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">2.</span>
                        We'll contact you to schedule a personalized onboarding session
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">3.</span>
                        Receive complimentary staff training on implementing EatUP! effectively
                      </li>
                    </ol>
                    <div className="bg-primary/5 p-4 rounded-lg mt-4">
                      <h4 className="font-semibold text-primary mb-2">Staff Training Includes:</h4>
                      <p className="text-sm text-gray-600">
                        Learn how to naturally introduce EatUP! during service, encouraging customers who enjoy their experience to share feedback in exchange for special treats. We'll show you proven techniques that increase positive reviews while maintaining authentic customer interactions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 py-4 md:py-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Star className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">Boost Positive Reviews</h3>
                      <p className="text-xs md:text-sm text-gray-600">Encourage happy customers to share their experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Utensils className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">Custom Review Pages</h3>
                      <p className="text-xs md:text-sm text-gray-600">Personalized review collection pages for your restaurant</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleRegistrationClick}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 md:py-6"
                >
                  Register Your Restaurant
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button
            onClick={handleCreateCustomDemo}
            className="bg-primary hover:bg-primary/90 text-white font-semibold"
          >
            Create Custom Demo Page
            <Link2 className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Create a unique demo page with your restaurant's details
          </p>
        </div>
      </div>
      <AiSurveyWidget show={showWidget} />
      <Footer />
    </div>
  );
};

export default DemoPage;
