import { Card } from "@/components/ui/card";

interface GeneratedRewardProps {
  rewardCode: string | null;
}

export const GeneratedReward = ({ rewardCode }: GeneratedRewardProps) => {
  if (!rewardCode) return null;

  return (
    <Card className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-xl text-center mb-4">Your Generated Review Reward</h3>
      <p className="text-center text-3xl font-mono font-bold text-[#E94E87] mb-4 tracking-wider">
        {rewardCode}
      </p>
      <p className="text-center text-gray-600">
        Enter your email below to receive this reward code and unlock additional rewards for your next visits!
      </p>
    </Card>
  );
};