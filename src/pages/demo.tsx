import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ReviewCard } from "@/components/ReviewCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const DemoPage = () => {
  const [isRefining, setIsRefining] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRefineReview = async () => {
    if (!reviewText.trim()) {
      toast({
        title: "Review required",
        description: "Please share your experience before refining the review.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRefining(true);
      const { data, error } = await supabase.functions.invoke('refine-review', {
        body: { 
          review: reviewText,
        },
      });

      if (error) throw error;
      
      setReviewText(data.refinedReview);
      toast({
        title: "Review refined!",
        description: "Your review has been professionally enhanced.",
      });
    } catch (error) {
      console.error('Error refining review:', error);
      toast({
        title: "Error",
        description: "Failed to refine review",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          Experience EatUP! Demo
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Share your dining experience and let our AI enhance your review!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-6">
                <img
                  src="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
                  alt="Demo Restaurant"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/10 shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-secondary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Demo Restaurant
                  </h2>
                  <p className="text-muted-foreground">Share your positive dining experience!</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="What did you love about your visit? Tell us about the amazing food, exceptional service, or memorable moments that made your experience special!"
                    className="min-h-[150px] bg-white/50 font-medium resize-none"
                  />
                  
                  <Button
                    onClick={handleRefineReview}
                    disabled={isRefining || !reviewText.trim()}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    {isRefining ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Refining Review...
                      </>
                    ) : (
                      "Refine Review"
                    )}
                  </Button>
                </div>

                <ReviewCard
                  businessName="Demo Restaurant"
                  businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
                  onTakeAiSurvey={() => {}}
                />
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <div className="sticky top-24 space-y-6">
              <img
                src="/lovable-uploads/f790e463-d057-4fec-b168-02e376930c1c.png"
                alt="Restaurant experience"
                className="rounded-xl shadow-xl"
              />
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  Create your own restaurant page and start collecting valuable customer feedback.
                </p>
                <Button
                  onClick={() => navigate("/restaurants/onboard")}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Create Your Restaurant Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;