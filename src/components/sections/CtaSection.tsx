import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CtaSectionProps {
  onTryDemo: () => void;
}

export function CtaSection({ onTryDemo }: CtaSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
          Ready to Transform Your Restaurant Reviews?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join restaurants that are revolutionizing their customer feedback experience with EatUP!
        </p>
        <div className="space-y-4">
          <Button
            onClick={onTryDemo}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try Demo Now
          </Button>
          <div className="text-sm text-gray-500 mt-4">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}