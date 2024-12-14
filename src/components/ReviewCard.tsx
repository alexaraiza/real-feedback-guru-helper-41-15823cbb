import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { nanoid } from 'nanoid';
import { ReviewInput } from "./review/ReviewInput";
import { ReviewActions } from "./review/ReviewActions";
import { ReviewCode } from "./review/ReviewCode";
import { UnlockedOffers } from "./review/UnlockedOffers";

interface ReviewCardProps {
  businessName: string;
  businessImage?: string;
}

export const ReviewCard = ({ businessName, businessImage }: ReviewCardProps) => {
  const [review, setReview] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const { toast } = useToast();

  const handleRefineReview = async () => {
    if (!review.trim()) return;

    setIsRefining(true);
    try {
      const { data, error } = await supabase.functions.invoke('refine-review', {
        body: { review },
      });

      if (error) throw error;
      
      setReview(data.refinedReview);
      toast({
        title: "Review refined!",
        description: "Your review has been professionally refined.",
      });
    } catch (error) {
      console.error('Error refining review:', error);
      toast({
        title: "Error",
        description: "Failed to refine review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!review.trim()) return;

    setIsSubmitting(true);
    const code = nanoid(8);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          review_text: review,
          unique_code: code,
          business_name: businessName,
        });

      if (error) throw error;

      setUniqueCode(code);
      toast({
        title: "Review submitted!",
        description: "Your review has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyAndRedirect = () => {
    navigator.clipboard.writeText(review);
    toast({
      title: "Review copied!",
      description: "Opening Google Reviews in a new tab...",
    });
    window.open("https://www.google.com/maps", "_blank");
  };

  return (
    <div className="glass-card rounded-xl p-6 max-w-xl w-full mx-auto space-y-6 fade-in">
      <ReviewInput
        review={review}
        onChange={setReview}
        businessName={businessName}
        businessImage={businessImage}
      />

      <ReviewActions
        review={review}
        isRefining={isRefining}
        isSubmitting={isSubmitting}
        uniqueCode={uniqueCode}
        onRefine={handleRefineReview}
        onSubmit={handleSubmitReview}
        onCopyAndRedirect={handleCopyAndRedirect}
      />

      {uniqueCode && (
        <div className="space-y-6">
          <ReviewCode uniqueCode={uniqueCode} />
          <UnlockedOffers />
        </div>
      )}
    </div>
  );
};