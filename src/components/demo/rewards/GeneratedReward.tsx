import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";

interface GeneratedRewardProps {
  rewardCode: string | null;
}

export const GeneratedReward = ({ rewardCode }: GeneratedRewardProps) => {
  if (!rewardCode) return null;

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100/50 shadow-lg">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Gift className="h-8 w-8 text-[#E94E87]" />
        <h3 className="font-bold text-2xl">Your Next Visit Reward</h3>
      </div>
      <div className="space-y-6">
        <p className="text-center text-6xl font-bold text-[#E94E87] tracking-tight">
          20% OFF
        </p>
        <div className="space-y-2">
          <p className="text-center text-2xl font-semibold text-gray-800">
            Your Next Visit
          </p>
          <p className="text-center text-gray-500 text-lg">
            Valid for 30 days after your review
          </p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-center text-gray-600 text-lg">
          Enter your email below to receive your unique reward code and unlock additional rewards for future visits!
        </p>
      </div>
    </Card>
  );
};