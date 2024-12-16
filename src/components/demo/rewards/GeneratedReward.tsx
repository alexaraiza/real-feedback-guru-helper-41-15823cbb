import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";

interface GeneratedRewardProps {
  rewardCode: string | null;
}

export const GeneratedReward = ({ rewardCode }: GeneratedRewardProps) => {
  if (!rewardCode) return null;

  return (
    <Card className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Gift className="h-6 w-6 text-primary" />
        <h3 className="font-bold text-xl text-center">Your Next Visit Reward</h3>
      </div>
      <div className="space-y-4">
        <p className="text-center text-4xl font-bold text-primary tracking-tight">
          20% OFF
        </p>
        <div className="space-y-2">
          <p className="text-center text-lg font-semibold text-secondary">
            Your Next Visit
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Valid for 30 days after your review
          </p>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-center text-muted-foreground text-sm">
          Enter your email below to receive your unique reward code and unlock additional rewards for future visits!
        </p>
      </div>
    </Card>
  );
};