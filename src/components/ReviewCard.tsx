import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { nanoid } from 'nanoid';
import { ReviewHeader } from "./review/ReviewHeader";
import { ReviewForm } from "./review/ReviewForm";
import { ReviewCode } from "./review/ReviewCode";
import { UnlockedOffers } from "./review/UnlockedOffers";
import { Button } from "@/components/ui/button";

interface ReviewCardProps {
  businessName: string;
  businessImage?: string;
  onTakeAiSurvey: () => void;
  googleMapsUrl: string;
}

export const ReviewCard = ({ 
  businessName, 
  businessImage, 
  onTakeAiSurvey,
  googleMapsUrl 
}: ReviewCardProps) => {
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [review, setReview] = useState("");
  const [contactEmail, setContactEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Load preferences from localStorage
      const savedPreferences = localStorage.getItem('demoPreferences');
      console.log('Loading preferences from localStorage:', savedPreferences);
      
      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences);
        console.log('Parsed preferences:', parsed);
        
        if (parsed.contactEmail) {
          console.log('Setting contact email from preferences:', parsed.contactEmail);
          setContactEmail(parsed.contactEmail);
        }
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  }, []);

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
    
    const emailBody = `Hi there,

I just left a review for ${businessName}. Here's my review code: ${uniqueCode}

My review:
${review}

Looking forward to enjoying the rewards!

Best regards`;

    console.log('Current contact email:', contactEmail);
    
    // Create recipients list
    let recipients = ['rewards@eatup.co'];
    if (contactEmail) {
      recipients.push(contactEmail);
      console.log('Added contact email to recipients:', contactEmail);
    }
    
    const recipientString = encodeURIComponent(recipients.join(','));
    console.log('Final recipients string:', recipientString);
    
    const subject = encodeURIComponent(`Sign me up for EatUP! Rewards at ${businessName}`);
    const body = encodeURIComponent(emailBody);
    
    const mailtoLink = `mailto:${recipientString}?subject=${subject}&body=${body}`;
    console.log('Generated mailto link:', mailtoLink);
    
    toast({
      title: "Review copied!",
      description: "Opening Google Reviews in a new tab. Please paste your review there.",
    });

    window.location.href = mailtoLink;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="glass-card rounded-xl p-6 max-w-xl w-full mx-auto space-y-6 fade-in">
      <ReviewHeader businessName={businessName} businessImage={businessImage} />
      
      <ReviewForm 
        onSubmit={handleSubmitReview} 
        review={review}
        setReview={setReview}
      />

      {uniqueCode && (
        <div className="space-y-6">
          <ReviewCode uniqueCode={uniqueCode} />
          <UnlockedOffers />
          <Button
            onClick={handleCopyAndRedirect}
            className="w-full button-hover bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            Copy & Share on Google
          </Button>
        </div>
      )}
    </div>
  );
};