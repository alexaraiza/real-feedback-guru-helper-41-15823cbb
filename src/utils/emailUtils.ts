export const constructRewardEmailBody = (
  businessName: string,
  googleMapsUrl: string,
  uniqueCode: string | null,
  review: string,
) => {
  const visitTimestamp = new Date().toLocaleString();
  
  let emailBody = `Dear EatUP! Team,\n\n`;
  emailBody += `I'm excited to join the EatUP! rewards program at ${businessName}! I understand that EatUP! is revolutionizing the dining experience by offering progressive rewards that get better with each visit.\n\n`;
  
  if (uniqueCode) {
    emailBody += `My Unique Reward Code: ${uniqueCode}\n`;
    emailBody += `(I'll show this code to my server on my next visit to redeem my personalized reward)\n\n`;
  }
  
  emailBody += `Visit Details:\n`;
  emailBody += `Date: ${visitTimestamp}\n`;
  emailBody += `Restaurant: ${businessName}\n`;
  emailBody += `Location: ${googleMapsUrl}\n\n`;
  
  emailBody += `My Review:\n${review}\n\n`;

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

  return emailBody;
};

export const getEmailRecipients = () => {
  const defaultRecipient = 'rewards@eatup.co';
  const recipients = [defaultRecipient];
  
  try {
    const savedRestaurantInfo = localStorage.getItem('restaurantInfo');

    if (savedRestaurantInfo) {
      const preferences = JSON.parse(savedRestaurantInfo);
      if (preferences.contactEmail && preferences.contactEmail.trim()) {
        recipients.push(preferences.contactEmail.trim());
      }
    }
  } catch (error) {
    console.error('Error getting email recipients:', error);
  }
  
  return recipients.join(',');
};