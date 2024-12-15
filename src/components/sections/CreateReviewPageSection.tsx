import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const CreateReviewPageSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleCreateReviewPage = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a review page",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Check if user has completed onboarding
    const { data: restaurants } = await supabase
      .from("restaurants")
      .select("id")
      .limit(1);

    if (!restaurants?.length) {
      // No restaurants found, redirect to onboarding
      navigate("/restaurants/onboard");
    } else {
      // User has restaurants, go to create review page
      navigate("/restaurants/create-review-page");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#FFE5ED]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
            Create Your Review Collection Page
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with your own branded review collection page
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Custom Review Page</h3>
                <p className="text-muted-foreground mb-4">
                  Create a dedicated page for collecting customer reviews, complete with your branding and special offers
                </p>
                <Button 
                  onClick={handleCreateReviewPage}
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#E94E87] to-[#F17BA3] hover:from-[#D13D73] hover:to-[#E94E87]"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your Review Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};