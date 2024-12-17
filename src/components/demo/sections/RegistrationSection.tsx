import { Building2, ArrowRight, Star, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RegistrationSection = () => {
  const handleRegistrationClick = () => {
    window.open("https://forms.gle/7Zfrin7spzLWixGj9", "_blank");
  };

  return (
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
  );
};