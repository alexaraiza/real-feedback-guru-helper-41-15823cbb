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
    const fetchContactEmail = async () => {
      // First try to get from localStorage
      const savedPreferences = localStorage.getItem('demoPreferences');
      if (savedPreferences) {
        const { contactEmail: savedEmail } = JSON.parse(savedPreferences);
        if (savedEmail) {
          console.log('Found contact email in localStorage:', savedEmail);
          setContactEmail(savedEmail);
          return;
        }
      }

      // If not in localStorage, try to get from URL/database
      const pathParts = window.location.pathname.split('/');
      const slug = pathParts[pathParts.length - 1];
      
      if (slug) {
        console.log('Fetching contact email for slug:', slug);
        const { data, error } = await supabase
          .from('demo_pages')
          .select('contact_email')
          .eq('slug', slug)
          .single();
        
        if (!error && data?.contact_email) {
          console.log('Found contact email in database:', data.contact_email);
          setContactEmail(data.contact_email);
        } else {
          console.log('No contact email found in database or error:', error);
        }
      }
    };

    fetchContactEmail();
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

    // Get contact email from state
    console.log('Contact email before creating mailto:', contactEmail);
    const recipients = contactEmail ? `rewards@eatup.co,${contactEmail}` : 'rewards@eatup.co';
    console.log('Final recipients string:', recipients);
    
    const mailtoLink = `mailto:${encodeURIComponent(recipients)}?subject=Sign me up for EatUP! Rewards at ${encodeURIComponent(businessName)}&body=${encodeURIComponent(emailBody)}`;
    
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