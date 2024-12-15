import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CreateReviewPageSectionProps {
  onShowAuth: () => void;
}

export const CreateReviewPageSection = ({ onShowAuth }: CreateReviewPageSectionProps) => {
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
      onShowAuth();
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text mb-4">
            Create Your Review Page
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start collecting valuable feedback from your customers and build stronger relationships
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img
              src="/lovable-uploads/77749432-116c-4ca7-8fd9-8c60cbb23112.png"
              alt="Review page example"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#E94E87]/20 to-transparent rounded-lg" />
          </div>
          
          <div className="space-y-8">
            <div className="glass-card rounded-xl p-6">
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customizable Review Pages</h3>
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
    </section>
  );
};