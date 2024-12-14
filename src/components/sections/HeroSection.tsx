import { Button } from "@/components/ui/button";
import { MessageSquare, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onTryDemo: () => void;
}

export const HeroSection = ({ onTryDemo }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-b from-white via-[#FFE5ED] to-[#FFD5E2]/20 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50" />
        <img
          src="/lovable-uploads/904ec366-7d38-41e6-b8ef-909e3fb33baf.png"
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 text-center relative">
        <img 
          src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
          alt="EatUP! Logo" 
          className="h-28 mx-auto mb-8 hover:scale-105 transition-transform duration-300"
        />
        <h1 className="text-5xl font-bold tracking-tight text-secondary mb-6">
          The Future of Restaurant Reviews
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join the EatUP! community where authentic dining experiences create meaningful connections between restaurants and their customers.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onTryDemo}
            className="bg-gradient-to-r from-[#E94E87] to-[#F17BA3] hover:from-[#D13D73] hover:to-[#E94E87] text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            size="lg"
          >
            <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Try Voice Review Demo
          </Button>
          <Link to="/restaurants/register-interest">
            <Button 
              variant="outline"
              size="lg"
              className="border-[#E94E87] text-[#E94E87] hover:bg-[#E94E87] hover:text-white"
            >
              <Utensils className="mr-2 h-5 w-5" />
              Register Restaurant Interest
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};