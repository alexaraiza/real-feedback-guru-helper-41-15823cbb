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
    
    let emailBody = "Hi, I'd like to claim my rewards for my next visits!\n\n";
    
    // Add visit timestamp
    emailBody += `Visit Date: ${visitTimestamp}\n\n`;
    
    // Add the review information
    if (refinedReview) {
      emailBody += `My AI-Enhanced Review:\n${refinedReview}\n\n`;
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

    // Add reward details with unique codes
    emailBody += "My Rewards:\n\n";
    
    // First visit reward
    if (rewardCode) {
      emailBody += "1. FIRST VISIT REWARD\n";
      emailBody += "20% Off Your Next Visit\n";
      emailBody += `Reward Code: ${rewardCode}\n`;
      emailBody += "Valid for 30 days from today\n\n";
    }

    // Generate unique codes for future visits
    const secondVisitCode = generateRewardCode();
    const thirdVisitCode = generateRewardCode();
    const fourthVisitCode = generateRewardCode();

    // Future visit rewards with unique codes
    emailBody += "2. SECOND VISIT REWARD\n";
    emailBody += "Free Dessert\n";
    emailBody += `Reward Code: ${secondVisitCode}\n`;
    emailBody += "Choose from our selection of house-made desserts\n";
    emailBody += "Value up to £8.95\n";
    emailBody += "Valid during your third visit
</lov-search>
<lov-search>
Valid for 45 days after your third visit
</lov-search>
<lov-replace>
Valid during your fourth visit
</lov-search>
<lov-search>
Valid for 60 days after your fourth visit
</lov-search>
<lov-replace>
Valid during your fourth visit\n\n";

    emailBody += "3. THIRD VISIT REWARD\n";
    emailBody += "Complimentary Appetizer\n";
    emailBody += `Reward Code: ${thirdVisitCode}\n`;
    emailBody += "Choose any appetizer from our menu\n";
    emailBody += "Value up to £12.95\n";
    emailBody += "Valid for 45 days after your third visit\n\n";

    emailBody += "4. FOURTH VISIT REWARD\n";
    emailBody += "Special Chef's Surprise\n";
    emailBody += `Reward Code: ${fourthVisitCode}\n`;
    emailBody += "A unique culinary experience prepared just for you\n";
    emailBody += "Valid for 60 days after your fourth visit";

    const mailtoLink = `mailto:george@multiplier.info?subject=Claim My Rewards&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-3">
        <Gift className="h-8 w-8 text-[#E94E87]" />
        <h3 className="font-bold text-2xl bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] text-transparent bg-clip-text">
          Transform Your Dining Experience
        </h3>
      </div>

      <div>
        <p className="text-center text-gray-600 text-lg mb-6">
          Send us an email to claim these rewards for your next visit:
        </p>
        <Button 
          onClick={handleEmailClick}
          className="w-full h-12 px-8 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] hover:opacity-90 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02]"
        >
          <Mail className="h-5 w-5" />
          <span>Send Email to Claim Rewards</span>
        </Button>
      </div>
    </div>
  );
};