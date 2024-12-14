import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { nanoid } from 'nanoid';
import { ReviewInput } from "./review/ReviewInput";
import { ReviewActions } from "./review/ReviewActions";
import { ReviewCode } from "./review/ReviewCode";
import { UnlockedOffers } from "./review/UnlockedOffers";
import { Button } from "./ui/button";
import { Phone, Bot } from "lucide-react";

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const checkForComplaints = (text: string) => {
    const negativeKeywords = ['disappointed', 'bad', 'terrible', 'poor', 'worst', 'awful', 'horrible', 'complaint', 'unhappy', 'slow', 'rude'];
    return negativeKeywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  const handleRefineReview = async () => {
    if (!review.trim()) return;

    setIsRefining(true);
    try {
      // If review is too short (less than 50 characters), get suggestions
      if (review.length < 50) {
        const { data: suggestionsData, error: suggestionsError } = await supabase.functions.invoke('generate-suggestions', {
          body: { review, businessName },
        });

        if (suggestionsError) throw suggestionsError;
        setSuggestions(suggestionsData.suggestions);
        
        toast({
          title: "Review seems a bit short",
          description: "We've generated some suggestions to help you expand your review!",
        });
        setIsRefined(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('refine-review', {
        body: { review },
      });

      if (error) throw error;
      
      if (data.refinedReview === review || !data.refinedReview) {
        toast({
          title: "More details needed",
          description: "Please add more specific details about your experience to help us refine your review.",
        });
        setIsRefined(false);
      } else {
        setReview(data.refinedReview);
        setIsRefined(true);
        setSuggestions([]); // Clear any previous suggestions

        if (checkForComplaints(data.refinedReview)) {
          setShowComplaintPrompt(true);
          toast({
            title: "We notice you had some concerns",
            description: "Would you like to share your feedback directly through our AI survey call? We'd love to make it right.",
          });
        } else {
          toast({
            title: "Review refined!",
            description: "Your review has been professionally refined.",
          });
        }
      }
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
        title: "Review saved!",
        description: "Your review has been saved. Click 'Copy & Post to Google' to share it.",
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
      description: "Opening Google Reviews where you can paste your review...",
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
        suggestions={suggestions}
        onSelectSuggestion={(suggestion) => {
          setReview(review + " " + suggestion);
          setSuggestions([]);
        }}
      />

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

      <ReviewActions
        review={review}
        isRefining={isRefining}
        isSubmitting={isSubmitting}
        uniqueCode={uniqueCode}
        onRefine={handleRefineReview}
        onSubmit={handleSubmitReview}
        onCopyAndRedirect={handleCopyAndRedirect}
        isRefined={isRefined}
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