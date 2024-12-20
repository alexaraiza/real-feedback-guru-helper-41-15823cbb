import { useState, useEffect } from "react";
import { Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionPaywall } from "../subscription/SubscriptionPaywall";

export const CreateReviewPageSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        if (session) {
          const { data, error } = await supabase.functions.invoke('check-subscription');
          if (error) throw error;
          setIsSubscribed(data.subscribed);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        toast({
          title: "Error",
          description: "Failed to check subscription status",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [toast]);

  const handleCreateReviewPage = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a review page",
        variant: "destructive",
      });
      return;
    }
    navigate("/restaurants/create-review-page");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSubscribed) {
    return <SubscriptionPaywall />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg border border-pink-100">
      <div className="text-center space-y-6">
        <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Create Your Review Page
          </h2>
          <p className="text-gray-600">
            Get started with your own personalized review collection page. Perfect for restaurants looking to gather authentic customer feedback.
          </p>
        </div>

        <Button
          onClick={handleCreateReviewPage}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
        >
          Create Review Page
        </Button>
      </div>
    </div>
  );
};