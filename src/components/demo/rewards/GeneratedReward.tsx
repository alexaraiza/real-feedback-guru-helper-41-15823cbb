import { Card } from "@/components/ui/card";

interface GeneratedRewardProps {
  rewardCode: string | null;
}

export const GeneratedReward = ({ rewardCode }: GeneratedRewardProps) => {
  if (!rewardCode) return null;

  return (
    <Card className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-xl text-center mb-4">Your Second Visit Reward Code</h3>
      <div className="space-y-2">
        <p className="text-center text-3xl font-mono font-bold text-[#E94E87] mb-4 tracking-wider">
          {rewardCode}
        </p>
        <p className="text-center text-lg font-semibold text-secondary">
          20% Off Your Next Visit
        </p>
        <p className="text-center text-muted-foreground">
          Valid for 30 days after your review
        </p>
      </div>
      <p className="text-center text-gray-600 mt-4">
        Enter your email below to receive this reward code and unlock additional rewards for your future visits!
      </p>
    </Card>
  );
};