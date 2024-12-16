import { Button } from "@/components/ui/button";
import { MessageSquare, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface HeroSectionProps {
  onTryDemo: () => void;
  onShowAuth: () => void;
}

export const HeroSection = ({ onTryDemo, onShowAuth }: HeroSectionProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-white via-[#FFE5ED] to-[#FFD5E2]/20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/lovable-uploads/904ec366-7d38-41e6-b8ef-909e3fb33baf.png"
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 text-center relative">
        <div className="w-full flex justify-center mb-8">
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="EatUP! Logo" 
            className="h-20 md:h-28 w-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] text-transparent bg-clip-text">
          The Future of Restaurant Reviews
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join the EatUP! community where authentic dining experiences create meaningful connections between restaurants and their customers.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onTryDemo}
            className="bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
            size="lg"
          >
            <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Try Voice Review Demo
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={onShowAuth}
            className="border-[#D946EF] text-[#D946EF] hover:bg-[#D946EF] hover:text-white w-full sm:w-auto"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign In / Register
          </Button>
        </div>
      </div>
    </section>
  );
};