import { Button } from "@/components/ui/button";
import { MessageSquare, LogIn, Star, Gift, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface HeroSectionProps {
  onTryDemo: () => void;
  onShowAuth: () => void;
}

export const HeroSection = ({ onTryDemo, onShowAuth }: HeroSectionProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-white via-[#FFE5ED] to-[#FFD5E2]/20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/lovable-uploads/022207d7-8d69-4714-9c28-702011f6f8f3.png"
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center mb-4"
        >
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="EatUP! Logo" 
            className="h-16 md:h-24 w-auto hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#1a1060] text-xl md:text-2xl font-bold mb-2"
        >
          EAT. EARN. SAVE.
        </motion.h2>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-transparent bg-clip-text"
        >
          Transform Your Restaurant's Review Strategy
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base md:text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Boost positive reviews, increase customer retention, and gather actionable feedback with our innovative AI-powered platform.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 glass-card"
          >
            <div className="flex justify-center mb-4">
              <Star className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Positive Review Acceleration</h3>
            <p className="text-gray-600 text-sm">
              Turn happy customers into brand advocates with AI-enhanced review generation and instant reward incentives
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 glass-card"
          >
            <div className="flex justify-center mb-4">
              <Gift className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Revisit Rewards</h3>
            <p className="text-gray-600 text-sm">
              Drive customer loyalty with our 4-visit reward program, turning first-time diners into regular patrons
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 glass-card"
          >
            <div className="flex justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Customer Survey</h3>
            <p className="text-gray-600 text-sm">
              Free up staff time with our AI-powered voice feedback system that captures detailed customer insights
            </p>
          </motion.div>
        </div>

        {/* AI Survey Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto glass-card"
        >
          <div className="flex justify-center mb-4">
            <MessageCircle className="h-10 w-10 text-pink-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">EatUP! AI Customer Survey</h3>
          <p className="text-gray-600 mb-6">
            Experience our conversational AI that engages customers in natural dialogue, gathering comprehensive feedback about their dining experience while your staff focuses on service.
          </p>
          <Button
            onClick={onTryDemo}
            className="bg-pink-500 hover:bg-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            size="lg"
          >
            <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Try AI Survey Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};