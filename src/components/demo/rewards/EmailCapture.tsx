import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { Mail } from "lucide-react";

interface EmailCaptureProps {
  rewardCode: string | null;
}

export const EmailCapture = ({ rewardCode }: EmailCaptureProps) => {
  const handleEmailClick = () => {
    // Get receipt analysis from localStorage if available
    const analysisResult = localStorage.getItem('receiptAnalysis');
    const reviewText = localStorage.getItem('reviewText');
    
    let emailBody = "Hi, I'd like to get the 1st reward for my next visit!\n\n";
    
    if (reviewText) {
      emailBody += `My review:\n${reviewText}\n\n`;
    }
    
    if (analysisResult) {
      const analysis = JSON.parse(analysisResult);
      emailBody += "Receipt Details:\n";
      emailBody += `Total Amount: $${analysis.total_amount}\n`;
      emailBody += "Items:\n";
      analysis.items.forEach((item: { name: string; price: number }) => {
        emailBody += `- ${item.name}: $${item.price}\n`;
      });
    }

    if (rewardCode) {
      emailBody += `\nReward Code: ${rewardCode}`;
    }

    const mailtoLink = `mailto:george@multiplier.info?subject=Claim My Reward&body=${encodeURIComponent(emailBody)}`;
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