import { Building2, ArrowRight } from "lucide-react";
import { CreateDemoButton } from "./CreateDemoButton";

export const CustomPageCreationSection = () => {
  return (
    <div className="md:sticky md:top-24 space-y-4 md:space-y-6 bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-pink-100">
      <div className="text-center space-y-3 md:space-y-4">
        <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
          <Building2 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Create Your Custom Review Page
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Set up a personalized review collection page for your restaurant in minutes.
        </p>
        <div className="space-y-4 text-left border-t border-gray-100 pt-4 mt-4">
          <h3 className="font-semibold text-gray-800">What You'll Get:</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="font-semibold text-primary">1.</span>
              A custom-branded review collection page
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">2.</span>
              Unique URL to share with your customers
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">3.</span>
              Instant review notifications and analytics
            </li>
          </ul>
          <div className="bg-primary/5 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-primary mb-2">Why Create a Custom Page?</h4>
            <p className="text-sm text-gray-600">
              Your custom review page makes it easy for happy customers to share their experiences, helping you build a stronger online presence and attract more diners.
            </p>
          </div>
        </div>
      </div>
      <CreateDemoButton />
    </div>
  );
};