import { GeneratedReward } from "./rewards/GeneratedReward";
import { EmailCapture } from "./rewards/EmailCapture";
import { RewardsList } from "./rewards/RewardsList";

interface RewardsSectionProps {
  rewardCode: string | null;
}

export const RewardsSection = ({ rewardCode }: RewardsSectionProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-gray-900 text-center">
        Your Review Journey with EatUP!
      </h2>
      
      <div className="text-center space-y-2">
        <p className="text-lg text-gray-600">
          1️⃣ Share your review on Google to unlock your first reward
        </p>
        <p className="text-lg text-gray-600">
          2️⃣ Sign up to EatUP! to claim your rewards for future visits
        </p>
      </div>

      <GeneratedReward rewardCode={rewardCode} />

      <div className="bg-gradient-to-br from-pink-50/80 via-white/50 to-pink-50/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100/20 shadow-xl">
        <EmailCapture rewardCode={rewardCode} />
        <RewardsList />
      </div>
    </div>
  );
};