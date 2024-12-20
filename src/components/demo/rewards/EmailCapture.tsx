import { Button } from "@/components/ui/button";
import { Gift, Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface EmailCaptureProps {
  rewardCode: string | null;
  customGoogleMapsUrl?: string;
  customRestaurantName?: string;
}

export const EmailCapture = ({ 
  rewardCode,
  customGoogleMapsUrl,
  customRestaurantName 
}: EmailCaptureProps) => {
  const [restaurantName, setRestaurantName] = useState(customRestaurantName || "The Local Kitchen & Bar");
  const [googleMapsUrl, setGoogleMapsUrl] = useState(customGoogleMapsUrl || "https://maps.app.goo.gl/Nx23mQHet4TBfctJ6");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    // Load preferences from localStorage

    const savedRestaurantInfo = localStorage.getItem('restaurantInfo');
    console.log('Loaded preferences:', savedRestaurantInfo); // Debug log
    
    if (savedRestaurantInfo) {
      const { 
        restaurantName: savedRestaurantName,
        googleMapsUrl: savedGoogleMapsUrl,
        contactEmail: savedContactEmail
      } = JSON.parse(savedRestaurantInfo);
      
      console.log('Parsed contact email:', savedContactEmail); // Debug log
      
      if (!customRestaurantName) setRestaurantName(savedRestaurantName);
      if (!customGoogleMapsUrl) setGoogleMapsUrl(savedGoogleMapsUrl);
      if (savedContactEmail) setContactEmail(savedContactEmail);
    }
  }, [customRestaurantName, customGoogleMapsUrl]);

  const handleEmailClick = () => {
    // Get receipt analysis from localStorage if available
    const analysisResult = localStorage.getItem('receiptAnalysis');
    const reviewText = localStorage.getItem('reviewText');
    const refinedReview = localStorage.getItem('refinedReview');
    const visitTimestamp = new Date().toLocaleString();
    
    let emailBody = `Dear EatUP! Team,\n\n`;
    emailBody += `I'm excited to join the EatUP! rewards program at ${restaurantName}! I understand that EatUP! is revolutionizing the dining experience by offering progressive rewards that get better with each visit.\n\n`;
    
    // Add today's reward code if available
    if (rewardCode) {
      emailBody += `My Unique Reward Code: ${rewardCode}\n`;
      emailBody += `(I'll show this code to my server on my next visit to redeem my personalized reward)\n\n`;
    }
    
    emailBody += `Visit Details:\n`;
    emailBody += `Date: ${visitTimestamp}\n`;
    emailBody += `Restaurant: ${restaurantName}\n`;
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
    emailBody += "1. Return to " + restaurantName + " with my unique reward code\n";
    emailBody += "2. After dining, reply to this email with my receipt photo\n";
    emailBody += "3. Receive my exclusive third-visit reward voucher\n\n";

    emailBody += "What I'll Get with EatUP!:\n";
    emailBody += `1. Immediate Reward: Special offer for my next visit to ${restaurantName}\n`;
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

    const mailtoLink = `mailto:${recipients}?subject=Sign me up for EatUP! Rewards at ${encodeURIComponent(restaurantName)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-3">
        <Gift className="h-8 w-8 text-[#E94E87]" />
        <h3 className="font-bold text-2xl bg-gradient-to-r from-[#E94E87] via-[#FF6B9C] to-[#FF9B9B] text-transparent bg-clip-text">
          Get Your Reward for Your Next Visit! 🎁
        </h3>
      </div>

      <div>
        <p className="text-center text-gray-600 text-lg mb-6">
          {rewardCode 
            ? "Sign up now to save your unique reward code and join our progressive rewards program!" 
            : "Join EatUP! now to unlock our innovative 4-tier rewards program with AI-powered personalization!"}
        </p>
        <Button 
          onClick={handleEmailClick}
          className="w-full h-12 px-8 bg-gradient-to-r from-[#E94E87] via-[#FF6B9C] to-[#FF9B9B] hover:opacity-90 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02]"
        >
          <Mail className="h-5 w-5" />
          <span>Sign Up to EatUP!</span>
        </Button>
      </div>
    </div>
  );
};