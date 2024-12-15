import { useState, useRef, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { CreateReviewPageSection } from "@/components/sections/CreateReviewPageSection";
import { VdaSection } from "@/components/sections/VdaSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ExampleReviews } from "@/components/ExampleReviews";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const experienceSectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setShowAuthDialog(false);
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome!",
            description: "You've successfully signed in.",
          });
        }
      }
    });

    if (showWidget) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showWidget, toast]);

  const scrollToExperience = () => {
    experienceSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSurveyCallClick = () => {
    setShowWidget(!showWidget);
  };

  const handleAuthError = (error: any) => {
    if (error?.message?.includes("User already registered")) {
      toast({
        title: "Account already exists",
        description: "Please sign in with your existing account instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection onTryDemo={scrollToExperience} onShowAuth={() => setShowAuthDialog(true)} />
      <FeaturesSection />
      <div ref={experienceSectionRef}>
        <DemoSection onSurveyCall={handleSurveyCallClick} />
      </div>
      <CreateReviewPageSection onShowAuth={() => setShowAuthDialog(true)} />
      <VdaSection />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
            Restaurant Success Stories
          </h2>
          <ExampleReviews />
        </div>
      </section>
      <CtaSection onTryDemo={scrollToExperience} />

      {showWidget && (
        <div className="fixed bottom-0 right-0 z-[9999] min-w-[320px]">
          <div className="relative">
            <elevenlabs-convai agent-id="CI0HSZaVDE1uT881ruiq"></elevenlabs-convai>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-black rounded-full" />
          </div>
        </div>
      )}

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">Welcome to EatUP!</DialogTitle>
          </DialogHeader>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#E94E87',
                    brandAccent: '#D13D73',
                  },
                },
              },
            }}
            providers={[]}
            theme="light"
            onError={handleAuthError}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;