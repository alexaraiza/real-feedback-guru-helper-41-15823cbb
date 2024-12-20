import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SubscriptionPaywall } from "@/components/subscription/SubscriptionPaywall";
import { supabase } from "@/integrations/supabase/client";

interface CreateReviewPageSectionProps {
  onShowAuth: () => void;
}

export const CreateReviewPageSection = ({ onShowAuth }: CreateReviewPageSectionProps) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsSubscribed(false);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) throw error;
        setIsSubscribed(data?.subscribed || false);
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isSubscribed) {
    return <SubscriptionPaywall />;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
            Create Your Review Page
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build a custom-branded review page that encourages positive reviews and helps you gather valuable customer feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-3 text-[#E94E87]">Custom Branding</h3>
            <p className="text-gray-600">
              Add your logo, colors, and messaging to create a seamless brand experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-3 text-[#E94E87]">Smart Routing</h3>
            <p className="text-gray-600">
              Automatically direct happy customers to leave positive reviews on your preferred platforms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-3 text-[#E94E87]">Feedback Collection</h3>
            <p className="text-gray-600">
              Gather detailed customer feedback to improve your service and operations.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={onShowAuth}
            className="bg-gradient-to-r from-[#E94E87] to-[#F17BA3] text-white hover:opacity-90"
            size="lg"
          >
            Create Your Review Page <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};