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
  const [contactEmail, setContactEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load contact email from demo preferences
    const savedPreferences = localStorage.getItem('demoPreferences');
    if (savedPreferences) {
      const { contactEmail: savedEmail } = JSON.parse(savedPreferences);
      if (savedEmail) {
        setContactEmail(savedEmail);
        console.log('Loaded contact email from preferences:', savedEmail);
      }
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

    // Get receipt analysis from localStorage if available
    const analysisResult = localStorage.getItem('receiptAnalysis');
    const reviewText = localStorage.getItem('reviewText');
    const refinedReview = localStorage.getItem('refinedReview');
    const visitTimestamp = new Date().toLocaleString();
    
    let emailBody = `Dear EatUP! Team,\n\n`;
    emailBody += `I'm excited to join the EatUP! rewards program at ${businessName}! I understand that EatUP! is revolutionizing the dining experience by offering progressive rewards that get better with each visit.\n\n`;
    
    // Add today's reward code if available
    if (uniqueCode) {
      emailBody += `My Unique Reward Code: ${uniqueCode}\n`;
      emailBody += `(I'll show this code to my server on my next visit to redeem my personalized reward)\n\n`;
    }
    
    emailBody += `Visit Details:\n`;
    emailBody += `Date: ${visitTimestamp}\n`;
    emailBody += `Restaurant: ${businessName}\n`;
    emailBody += `Location: ${googleMapsUrl}\n\n`;
    
    // Add the enhanced review if available, otherwise use original review
    if (refinedReview) {
      emailBody += `My Enhanced Review:\n${refinedReview}\n\n`;
    } else if (reviewText) {
      emailBody += `My Review:\n${reviewText}\n\n`;
    }
    
    // Add receipt analysis if available
    if (analysisResult) {
      const analysis = JSON.parse(analysisResult);
      emailBody += "Receipt Details:\n";
      emailBody += `Total Amount: $${analysis.total_amount}\n`;
      emailBody += "Items:\n";
      analysis.items.forEach((item: { name: string; price: number }) => {
        emailBody += `- ${item.name}: $${item.price}\n`;
      });
      emailBody += "\n";
    }

    emailBody += "About EatUP! Progressive Rewards Program:\n";
    emailBody += "• First Visit (Today): Left a review and joined the program\n";
    emailBody += "• Second Visit: Use unique reward code for a special welcome-back reward\n";
    emailBody += "• Third Visit: Send receipt to unlock premium rewards tier\n";
    emailBody += "• Fourth Visit and Beyond: Access to exclusive VIP offers\n\n";

    emailBody += "My Next Steps:\n";
    emailBody += "1. Return to " + businessName + " with my unique reward code\n";
    emailBody += "2. After dining, reply to this email with my receipt photo\n";
    emailBody += "3. Receive my exclusive third-visit reward voucher\n\n";

    emailBody += "What I'll Get with EatUP!:\n";
    emailBody += `1. Immediate Reward: Special offer for my next visit to ${businessName}\n`;
    emailBody += "2. Progressive Benefits: Increasing rewards with each visit\n";
    emailBody += "3. VIP Treatment: Priority access to special events and promotions\n";
    emailBody += "4. Personalized Experience: AI-powered reward recommendations\n";
    emailBody += "5. Exclusive Access: Members-only dining events and tastings\n\n";

    emailBody += "Thank you for helping me enhance my dining experience with EatUP!'s innovative rewards program.\n\n";
    emailBody += "Looking forward to my next visit!\n\n";
    emailBody += "Best regards,\n";
    emailBody += "[Your Name]";

    console.log('Contact email before creating mailto:', contactEmail); // Debug log

    // Construct the recipients string, including the contact email if it exists
    const recipients = contactEmail 
      ? encodeURIComponent(`rewards@eatup.co,${contactEmail}`)
      : encodeURIComponent('rewards@eatup.co');
    
    console.log('Final recipients string:', recipients); // Debug log

    const mailtoLink = `mailto:${recipients}?subject=Sign me up for EatUP! Rewards at ${encodeURIComponent(businessName)}&body=${encodeURIComponent(emailBody)}`;

    toast({
      title: "Review copied!",
      description: "Opening Google Reviews in a new tab. Please paste your review there.",
    });

    // Open both the mailto link and Google Maps URL
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