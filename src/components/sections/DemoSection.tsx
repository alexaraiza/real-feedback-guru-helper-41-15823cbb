import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface DemoSectionProps {
  onSurveyCall: () => void;
}

export const DemoSection = ({ onSurveyCall }: DemoSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#FFE5ED]/20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
          Experience EatUP!
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="relative">
              <img
                src="/lovable-uploads/f790e463-d057-4fec-b168-02e376930c1c.png"
                alt="Dining experience"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E94E87]/20 to-transparent rounded-lg" />
            </div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#E94E87] to-[#F17BA3] text-transparent bg-clip-text">
              Share Your Experience
            </h3>
            <p className="text-muted-foreground">
              Try our innovative review system that makes sharing your dining experience easy and rewarding. 
              Use text or voice to share your feedback and earn rewards from your favorite restaurants.
            </p>
            <Button
              onClick={onSurveyCall}
              className="w-full bg-gradient-to-r from-[#E94E87] to-[#F17BA3] hover:from-[#D13D73] hover:to-[#E94E87] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bot className="mr-2 h-5 w-5" />
              Try AI Voice Feedback Demo
            </Button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <ReviewCard
              businessName="The Local Kitchen & Bar"
              businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
              onTakeAiSurvey={onSurveyCall}
            />
          </div>
        </div>
      </div>
    </section>
  );
};