import { GeneratedReward } from "./rewards/GeneratedReward";
import { EmailCapture } from "./rewards/EmailCapture";
import { RewardsList } from "./rewards/RewardsList";

interface RewardsSectionProps {
  rewardCode: string | null;
}

export const RewardsSection = ({ rewardCode }: RewardsSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Want a reward for your next visit?
        </h2>
        <h3 className="text-4xl font-bold text-gray-900">
          Unlock Rewards for Your Next Visits
        </h3>
      </div>
      
      <GeneratedReward rewardCode={rewardCode} />

      <div className="bg-gradient-to-br from-pink-50/80 via-white/50 to-pink-50/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100/20 shadow-xl">
        <EmailCapture rewardCode={rewardCode} />
        <RewardsList />
      </div>
    </div>
  );
};