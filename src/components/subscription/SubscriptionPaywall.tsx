import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader2 } from "lucide-react";

export const SubscriptionPaywall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to EatUP!",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout');
      
      if (error) throw error;
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start subscription process",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg border border-pink-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Transform Your Restaurant's Review Strategy
      </h2>
      
      <div className="text-center mb-8">
        <div className="text-3xl font-bold text-primary mb-2">£29.99<span className="text-lg text-gray-600">/month</span></div>
        <p className="text-gray-600">Unlock the full potential of your restaurant's customer engagement</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Custom Review Page Creation</h3>
            <p className="text-gray-600 text-sm">Build and manage your own branded EatUP! review page</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Boost Reviews and Retention</h3>
            <p className="text-gray-600 text-sm">Increase customer retention with a seamless review system that incentivizes repeat visits</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Personalized Marketing Platform</h3>
            <p className="text-gray-600 text-sm">Access customer receipt data to craft targeted marketing messages</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Mailing List Growth</h3>
            <p className="text-gray-600 text-sm">Automatically grow your customer mailing list, turning one-time visitors into loyal patrons</p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubscribe}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Subscribe Now"
        )}
      </Button>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        Secure payment powered by Stripe. Cancel anytime.
      </p>
    </div>
  );
};