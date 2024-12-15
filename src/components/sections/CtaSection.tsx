import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, MessageSquare } from "lucide-react";

interface CtaSectionProps {
  onTryDemo: () => void;
}

export const CtaSection = ({ onTryDemo }: CtaSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-t from-[#FFE5ED]/20 to-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="relative">
          <img
            src="/lovable-uploads/0f6756db-d948-479a-aef7-7576f1c15272.png"
            alt="Fine dining"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
              Ready to Transform Your Restaurant Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join EatUP! and start building stronger connections with your customers through our Verified Dining Audit program.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/restaurants/register-interest">
                <Button 
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-[#E94E87] to-[#F17BA3] hover:from-[#D13D73] hover:to-[#E94E87] w-full sm:w-auto"
                >
                  <Building2 className="mr-2 h-5 w-5" />
                  Register for VDA Program
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                onClick={onTryDemo}
                className="border-[#E94E87] text-[#E94E87] hover:bg-[#E94E87] hover:text-white w-full sm:w-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                See How Reviews Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};