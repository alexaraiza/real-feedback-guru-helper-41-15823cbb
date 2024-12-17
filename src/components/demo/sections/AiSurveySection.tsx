import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AiSurveySectionProps {
  onSurveyDemoClick: () => void;
}

export const AiSurveySection = ({ onSurveyDemoClick }: AiSurveySectionProps) => {
  return (
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
        onClick={onSurveyDemoClick}
        className="bg-[#E94E87] hover:bg-[#E94E87]/90 text-white font-semibold w-full md:w-auto"
      >
        Try AI Survey Demo
        <Bot className="ml-2 h-4 w-4 md:h-5 md:w-5" />
      </Button>
    </motion.div>
  );
};