import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { Mail } from "lucide-react";
import { format } from "date-fns";

interface EmailCaptureProps {
  rewardCode: string | null;
}

export const EmailCapture = ({ rewardCode }: EmailCaptureProps) => {
  const handleEmailClick = () => {
    // Get receipt analysis from localStorage if available
    const analysisResult = localStorage.getItem('receiptAnalysis');
    const reviewText = localStorage.getItem('reviewText');
    const refinedReview = localStorage.getItem('refinedReview');
    const visitDate = format(new Date(), 'MMMM dd, yyyy HH:mm');
    
    let emailBody = "Hi, I'd like to claim my rewards for my next visits!\n\n";
    emailBody += `Visit Date: ${visitDate}\n\n`;
    
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

    // Future visit rewards with generated codes
    emailBody += "2. SECOND VISIT REWARD\n";
    emailBody += "Free Dessert\n";
    emailBody += "Choose from our selection of house-made desserts\n";
    emailBody += "Value up to £8.95\n";
    emailBody += `Reward Code: DESSERT${Math.random().toString(36).substring(2, 8).toUpperCase()}\n`;
    emailBody += "Valid for 30 days after your second visit\n\n";

    emailBody += "3. THIRD VISIT REWARD\n";
    emailBody += "Complimentary Appetizer\n";
    emailBody += "Choose any appetizer from our menu\n";
    emailBody += "Value up to £12.95\n";
    emailBody += `Reward Code: APPETIZER${Math.random().toString(36).substring(2, 8).toUpperCase()}\n`;
    emailBody += "Valid for 45 days after your third visit\n\n";

    emailBody += "4. FOURTH VISIT REWARD\n";
    emailBody += "Free Bottle of House Wine\n";
    emailBody += "Choose any bottle from our house wine selection\n";
    emailBody += "Value up to £24.95\n";
    emailBody += `Reward Code: WINE${Math.random().toString(36).substring(2, 8).toUpperCase()}\n`;
    emailBody += "Valid for 60 days after your fourth visit\n";

    const mailtoLink = `mailto:george@multiplier.info?subject=Claim My Rewards&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-3">
        <Gift className="h-8 w-8 text-[#E94E87]" />
        <h3 className="font-bold text-2xl">Get Your Reward</h3>
      </div>

      <div>
        <p className="text-center text-gray-600 text-lg mb-6">
          Send us an email to claim these rewards for your next visit:
        </p>
        <Button 
          onClick={handleEmailClick}
          className="w-full h-12 px-8 bg-[#E94E87] hover:bg-[#E94E87]/90 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
        >
          <Mail className="h-5 w-5" />
          <span>Send Email to Claim Rewards</span>
        </Button>
      </div>
    </div>
  );
};