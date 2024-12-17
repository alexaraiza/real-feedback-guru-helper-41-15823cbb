import { motion } from "framer-motion";
import { Star, Gift, MessageSquare } from "lucide-react";

export const FeatureCards = () => {
  return (
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
  );
};