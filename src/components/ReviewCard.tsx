import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { nanoid } from 'nanoid';
import { Button } from "./ui/button";
import { Camera, RefreshCw } from "lucide-react";
import { ReviewHeader } from "./review/ReviewHeader";
import { ReviewContent } from "./review/ReviewContent";
import { ReviewCode } from "./review/ReviewCode";
import { UnlockedOffers } from "./review/UnlockedOffers";
import { ReceiptAnalysis } from "./review/ReceiptAnalysis";

interface ReviewCardProps {
  businessName: string;
  businessImage?: string;
  onTakeAiSurvey: () => void;
}

export const ReviewCard = ({ businessName, businessImage, onTakeAiSurvey }: ReviewCardProps) => {
  const [review, setReview] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const [showComplaintPrompt, setShowComplaintPrompt] = useState(false);
  const [isRefined, setIsRefined] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const { toast } = useToast();

  const handleReceiptUpload = async (file: File) => {
    if (!file) return;

    setIsRefining(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('review_photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('review_photos')
        .getPublicUrl(filePath);

      // Analyze receipt
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-receipt', {
        body: { imageUrl: publicUrl },
      });

      if (analysisError) throw analysisError;

      setReceiptData(analysisData);
      
      // Generate initial review from receipt data
      const items = analysisData.items.map((item: any) => item.name).join(", ");
      const initialReview = `I had a wonderful dining experience and enjoyed ${items}. The total came to $${analysisData.total_amount}.`;
      setReview(initialReview);

      toast({
        title: "Receipt analyzed!",
        description: "Your receipt has been analyzed and added to your review.",
      });
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Upload failed",
        description: "Failed to analyze receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
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

  const handleSubmitReview = async () => {
    if (!review.trim() || !isRefined) return;

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
      description: "Opening Google Reviews in a new tab. Please paste your review there.",
    });
    window.open("https://maps.app.goo.gl/Nx23mQHet4TBfctJ6", "_blank");
  };

  return (
    <div className="glass-card rounded-xl p-6 max-w-xl w-full mx-auto space-y-6 fade-in">
      <ReviewHeader businessName={businessName} businessImage={businessImage} />

      <div className="space-y-4">
        <ReviewContent review={review} onChange={setReview} />

        <div className="flex justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleReceiptUpload(file);
            }}
            className="hidden"
            id="receipt-upload"
          />
          <label htmlFor="receipt-upload" className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={isRefining}
              className="bg-primary hover:bg-primary/90 text-white border-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isRefining ? (
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Camera className="w-5 h-5 mr-2" />
              )}
              {isRefining ? "Analyzing Receipt..." : "Add Receipt Photo"}
            </Button>
          </label>
        </div>

        {receiptData && <ReceiptAnalysis receiptData={receiptData} />}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleCreateReview}
            disabled={isRefining || !review.trim()}
            className="button-hover flex-1 bg-secondary hover:bg-secondary/90 text-white shadow-lg"
          >
            {isRefining ? (
              <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-5 w-5" />
            )}
            Create Review
          </Button>

          {!uniqueCode && isRefined && (
            <Button
              onClick={handleSubmitReview}
              disabled={!review || isSubmitting}
              className="button-hover flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              Submit Review
            </Button>
          )}

          {uniqueCode && (
            <Button
              onClick={handleCopyAndRedirect}
              className="button-hover flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              Copy & Share on Google
            </Button>
          )}
        </div>
      </div>

      {uniqueCode && (
        <div className="space-y-6">
          <ReviewCode uniqueCode={uniqueCode} />
          <UnlockedOffers />
        </div>
      )}
    </div>
  );
};