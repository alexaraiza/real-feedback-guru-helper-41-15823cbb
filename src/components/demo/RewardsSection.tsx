import { GeneratedReward } from "./rewards/GeneratedReward";
import { EmailCapture } from "./rewards/EmailCapture";
import { RewardsList } from "./rewards/RewardsList";

interface RewardsSectionProps {
  rewardCode: string | null;
  hasUploadedReceipt?: boolean;
  customGoogleMapsUrl?: string;
  customRestaurantName?: string;
}

export const RewardsSection = ({ 
  rewardCode, 
  hasUploadedReceipt,
  customGoogleMapsUrl,
  customRestaurantName 
}: RewardsSectionProps) => {
  return (
    <div className="space-y-8">
      <GeneratedReward rewardCode={rewardCode} />

      <div className="bg-gradient-to-br from-pink-50/80 via-white/50 to-pink-50/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100/20 shadow-xl">
        <EmailCapture 
          rewardCode={rewardCode} 
          customGoogleMapsUrl={customGoogleMapsUrl}
          customRestaurantName={customRestaurantName}
        />
        <RewardsList 
          hasUploadedReceipt={hasUploadedReceipt}
          customRestaurantName={customRestaurantName}
        />
      </div>
    </div>
  );
};