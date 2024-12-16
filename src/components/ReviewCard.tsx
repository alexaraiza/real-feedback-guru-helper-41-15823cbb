import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { nanoid } from 'nanoid';
import { ReviewInput } from "./review/ReviewInput";
import { ReviewActions } from "./review/ReviewActions";
import { ReviewCode } from "./review/ReviewCode";
import { UnlockedOffers } from "./review/UnlockedOffers";
import { Button } from "./ui/button";
import { Phone, Bot, Camera, RefreshCw } from "lucide-react";

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
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [receiptData, setReceiptData] = useState<any>(null);
  const { toast } = useToast();

  const checkForComplaints = (text: string) => {
    const negativeKeywords = ['disappointed', 'bad', 'terrible', 'poor', 'worst', 'awful', 'horrible', 'complaint', 'unhappy', 'slow', 'rude'];
    return negativeKeywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  const handleReceiptUpload = async (file: File) => {
    if (!file) return;

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

      setPhotoUrl(publicUrl);

      // Analyze receipt
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-receipt', {
        body: { imageUrl: publicUrl },
      });

      if (analysisError) throw analysisError;

      setReceiptData(analysisData);
      toast({
        title: "Receipt uploaded!",
        description: "Your receipt has been uploaded and analyzed successfully.",
      });
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload and analyze receipt. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateReview = async () => {
    if (!review.trim()) {
      toast({
        title: "Review required",
        description: "Please write your initial thoughts before creating a review.",
        variant: "destructive",
      });
      return;
    }

    setIsRefining(true);
    try {
      const { data, error } = await supabase.functions.invoke('refine-review', {
        body: { 
          review,
          receiptData: receiptData?.analysis || null
        },
      });

      if (error) throw error;
      
      if (data.error) {
        toast({
          title: "Review creation",
          description: "We couldn't create your review at this moment. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      if (data.refinedReview === review || !data.refinedReview) {
        toast({
          title: "Review creation",
          description: "Your review is already well-written! Feel free to submit it or add more details.",
        });
        setIsRefined(true);
      } else {
        setReview(data.refinedReview);
        setIsRefined(true);

        if (checkForComplaints(data.refinedReview)) {
          setShowComplaintPrompt(true);
          toast({
            title: "We notice you had some concerns",
            description: "Would you like to share your feedback directly through our AI survey call? We'd love to make it right.",
          });
        } else {
          toast({
            title: "Review created!",
            description: "Your review has been professionally created.",
          });
        }
      }
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
          photo_url: photoUrl || null,
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
      title: "Review copied to clipboard!",
      description: "Opening Google Reviews in a new tab. Please paste your review there.",
    });
    window.open("https://maps.app.goo.gl/Nx23mQHet4TBfctJ6", "_blank");
  };

  return (
    <div className="glass-card rounded-xl p-6 max-w-xl w-full mx-auto space-y-6 fade-in">
      <div className="flex items-center space-x-6">
        {businessImage && (
          <img
            src={businessImage}
            alt={businessName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/10 shadow-lg"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold text-secondary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {businessName}
          </h2>
          <p className="text-muted-foreground">Share your positive dining experience!</p>
        </div>
      </div>

      <div className="space-y-4">
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
              className="bg-primary hover:bg-primary/90 text-white border-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Camera className="w-5 h-5 mr-2" />
              Add Receipt Photo
            </Button>
          </label>
        </div>

        {receiptData && (
          <div className="bg-secondary/5 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Receipt Analysis</h3>
            <p><strong>Total:</strong> ${receiptData.total_amount}</p>
            <div>
              <strong>Items:</strong>
              <ul className="list-disc list-inside">
                {receiptData.items?.map((item: any, index: number) => (
                  <li key={index}>{item.name} - ${item.price}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <ReviewInput
          review={review}
          onChange={setReview}
          businessName={businessName}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleCreateReview}
            disabled={isRefining}
            className="button-hover flex-1 bg-secondary hover:bg-secondary/90 text-white shadow-lg"
            variant="outline"
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
        </div>
      </div>

      {showComplaintPrompt && (
        <div className="bg-secondary/10 p-4 rounded-lg space-y-4">
          <h3 className="font-semibold text-secondary">We Want to Make It Right!</h3>
          <p className="text-sm">We're sorry to hear about your experience. Share your feedback through our AI survey call and receive a special offer to give us another chance.</p>
          <Button
            onClick={() => {
              onTakeAiSurvey();
              setShowComplaintPrompt(false);
            }}
            className="bg-secondary hover:bg-secondary/90 text-white"
          >
            <Phone className="mr-2 h-4 w-4" />
            Take AI Survey Call
            <Bot className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {uniqueCode && (
        <div className="space-y-6">
          <ReviewCode uniqueCode={uniqueCode} />
          <UnlockedOffers />
        </div>
      )}
    </div>
  );
};