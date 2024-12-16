import { GeneratedReward } from "./rewards/GeneratedReward";
import { EmailCapture } from "./rewards/EmailCapture";
import { RewardsList } from "./rewards/RewardsList";

interface RewardsSectionProps {
  rewardCode: string | null;
  hasUploadedReceipt?: boolean;
}

export const RewardsSection = ({ rewardCode, hasUploadedReceipt }: RewardsSectionProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-gray-900 text-center">
        Your Review Journey with EatUP!
      </h2>

      <GeneratedReward rewardCode={rewardCode} />

      <div className="bg-gradient-to-br from-pink-50/80 via-white/50 to-pink-50/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100/20 shadow-xl">
        <EmailCapture rewardCode={rewardCode} />
        <RewardsList hasUploadedReceipt={hasUploadedReceipt} />
      </div>
    </div>
  );
};