import { Button } from "@/components/ui/button";
import { Gift, Mail } from "lucide-react";

interface EmailCaptureProps {
  rewardCode: string | null;
}

export const EmailCapture = ({ rewardCode }: EmailCaptureProps) => {
  const handleEmailClick = () => {
    // Get receipt analysis from localStorage if available
    const analysisResult = localStorage.getItem('receiptAnalysis');
    const reviewText = localStorage.getItem('reviewText');
    const refinedReview = localStorage.getItem('refinedReview');
    const visitTimestamp = new Date().toLocaleString();
    
    let emailBody = "Hello EatUP! I'd like to sign up and get my next reward.\n\n";
    
    // Add today's reward code if available
    if (rewardCode) {
      emailBody += `Today's Reward Code: ${rewardCode}\n`;
      emailBody += "Show this code to your server on your next visit to redeem your personalized reward!\n\n";
    }
    
    // Add visit timestamp
    emailBody += `Visit Date: ${visitTimestamp}\n\n`;
    
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

    emailBody += "By signing up to EatUP!, I'll receive:\n";
    emailBody += "1. A personalized reward for my next visit based on today's dining preferences\n";
    emailBody += "2. The ability to earn more rewards up to my 4th visit\n";
    emailBody += "3. Special offers tailored to my taste\n\n";
    emailBody += "I'm excited to join EatUP! and earn more rewards with each visit!\n\n";

    const mailtoLink = `mailto:rewards@eatup.co?subject=Sign me up for EatUP! Rewards&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-3">
        <Gift className="h-8 w-8 text-[#E94E87]" />
        <h3 className="font-bold text-2xl bg-gradient-to-r from-[#E94E87] via-[#FF6B9C] to-[#FF9B9B] text-transparent bg-clip-text">
          Join EatUP! Receipt Rewards 🎟️
        </h3>
      </div>

      <div>
        <p className="text-center text-gray-600 text-lg mb-6">
          {rewardCode 
            ? "Sign up now to save your reward code and unlock a special reward for your next visit!" 
            : "Join EatUP! now to unlock better rewards with each visit - up to your 4th visit!"}
        </p>
        <Button 
          onClick={handleEmailClick}
          className="w-full h-12 px-8 bg-gradient-to-r from-[#E94E87] via-[#FF6B9C] to-[#FF9B9B] hover:opacity-90 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02]"
        >
          <Mail className="h-5 w-5" />
          <span>Sign Up to get your reward for your next visit</span>
        </Button>
      </div>
    </div>
  );
};