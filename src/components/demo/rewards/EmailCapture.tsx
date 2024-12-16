import { Button } from "@/components/ui/button";
import { Gift, Mail } from "lucide-react";
import { nanoid } from 'nanoid';

interface EmailCaptureProps {
  rewardCode: string | null;
}

export const EmailCapture = ({ rewardCode }: EmailCaptureProps) => {
  const generateRewardCode = () => nanoid(8).toUpperCase();
  
  const handleEmailClick = () => {
    // Get receipt analysis from localStorage if available
    const analysisResult = localStorage.getItem('receiptAnalysis');
    const reviewText = localStorage.getItem('reviewText');
    const refinedReview = localStorage.getItem('refinedReview');
    const visitTimestamp = new Date().toLocaleString();
    
    let emailBody = "Hello EatUP! Here's my receipt and review for my next reward.\n\n";
    
    // Add visit timestamp
    emailBody += `Visit Date: ${visitTimestamp}\n\n`;
    
    // Add the review information
    if (refinedReview) {
      emailBody += `My Review:\n${refinedReview}\n\n`;
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

    emailBody += "Please send me my reward for my next visit. Thank you!\n\n";

    const mailtoLink = `mailto:rewards@eatup.co?subject=Receipt and Review for Next Reward&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-3">
        <Gift className="h-8 w-8 text-[#E94E87]" />
        <h3 className="font-bold text-2xl bg-gradient-to-r from-[#E94E87] via-[#FF6B9C] to-[#FF9B9B] text-transparent bg-clip-text">
          Get Your Next Visit Reward
        </h3>
      </div>

      <div>
        <p className="text-center text-gray-600 text-lg mb-6">
          Send us your receipt and review to unlock a special reward for your next visit!
        </p>
        <Button 
          onClick={handleEmailClick}
          className="w-full h-12 px-8 bg-gradient-to-r from-[#E94E87] via-[#FF6B9C] to-[#FF9B9B] hover:opacity-90 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02]"
        >
          <Mail className="h-5 w-5" />
          <span>Email Receipt & Review</span>
        </Button>
      </div>
    </div>
  );
};