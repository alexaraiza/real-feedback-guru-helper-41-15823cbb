import { useState } from "react";
import { ReviewContent } from "./ReviewContent";
import { ReceiptUploader } from "./ReceiptUploader";
import { ReceiptAnalysis } from "./ReceiptAnalysis";
import { ReviewActions } from "./ReviewActions";
import { ReviewCode } from "./ReviewCode";
import { UnlockedOffers } from "./UnlockedOffers";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReviewFormProps {
  onSubmit: () => void;
  review: string;
  setReview: (review: string) => void;
}

export const ReviewForm = ({ onSubmit, review, setReview }: ReviewFormProps) => {
  const [isRefining, setIsRefining] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [isRefined, setIsRefined] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const { toast } = useToast();

  const handleReceiptAnalyzed = (data: any) => {
    setReceiptData(data);
    // Generate initial review from receipt data
    const items = data.items.map((item: any) => item.name).join(", ");
    const initialReview = `I had a wonderful dining experience and enjoyed ${items}. The total came to $${data.total_amount}.`;
    setReview(initialReview);
  };

  const handleCreateReview = async () => {
    if (!review.trim()) {
      toast({
        title: "Review required",
        description: "Please write your thoughts before creating a review.",
        variant: "destructive",
      });
      return;
    }

    setIsRefining(true);
    try {
      const { data, error } = await supabase.functions.invoke('refine-review', {
        body: { 
          review,
          receiptData: receiptData || null
        },
      });

      if (error) throw error;
      
      setReview(data.refinedReview);
      setIsRefined(true);
      setUniqueCode('plzrdDDQ'); // For demo purposes, we're using a static code
      
      toast({
        title: "Review created!",
        description: "Your review has been professionally created.",
      });
    } catch (error) {
      console.error('Error creating review:', error);
      toast({
        title: "Error",
        description: "Failed to create review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopyAndRedirect = () => {
    navigator.clipboard.writeText(review);
    window.open('https://www.google.com/maps', '_blank');
  };

  return (
    <div className="space-y-6">
      <ReviewContent 
        review={review} 
        onChange={setReview}
      />
      
      <ReceiptUploader
        onReceiptAnalyzed={handleReceiptAnalyzed}
        isAnalyzing={isRefining}
      />

      {receiptData && (
        <ReceiptAnalysis receiptData={receiptData} />
      )}

      <ReviewActions
        review={review}
        isRefining={isRefining}
        isSubmitting={false}
        uniqueCode={uniqueCode}
        isRefined={isRefined}
        onRefine={handleCreateReview}
        onSubmit={onSubmit}
        onCopyAndRedirect={handleCopyAndRedirect}
      />

      {uniqueCode && (
        <>
          <ReviewCode uniqueCode={uniqueCode} />
          <UnlockedOffers />
        </>
      )}
    </div>
  );
};