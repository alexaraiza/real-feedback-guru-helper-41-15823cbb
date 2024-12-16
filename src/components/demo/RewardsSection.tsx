import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RewardsSectionProps {
  rewardCode: string | null;
}

export const RewardsSection = ({ rewardCode }: RewardsSectionProps) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Success!",
      description: "Your rewards have been sent to your email.",
    });
  };

  return (
    <div className="space-y-6">
      {rewardCode && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-xl text-center mb-4">Your Reward Code</h3>
          <p className="text-center text-3xl font-mono font-bold text-[#E94E87] mb-4 tracking-wider">
            {rewardCode}
          </p>
          <p className="text-center text-gray-600">
            Show this code on your next visit to redeem your rewards!
          </p>
        </div>
      )}

      <div className="bg-gradient-to-br from-primary/5 via-accent to-primary/5 rounded-2xl p-8 border border-primary/10 shadow-lg">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Gift className="h-7 w-7 text-primary" />
          <h3 className="font-bold text-2xl text-secondary">Your Rewards Are Ready!</h3>
        </div>

        <form onSubmit={handleEmailSubmit} className="mb-8">
          <p className="text-center text-muted-foreground mb-4">
            Enter your email to receive your rewards and save them for your next visit:
          </p>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-primary/20 focus:border-primary/40"
            />
            <Button type="submit" variant="outline" className="bg-primary hover:bg-primary/90 text-white">
              Send Rewards
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-lg text-secondary">20% Off Your Next Visit</h4>
                <p className="text-sm text-muted-foreground">Valid for 30 days</p>
              </div>
              <Button variant="outline" size="sm" className="text-primary hover:bg-primary/10">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-lg text-secondary">Free Dessert</h4>
                <p className="text-sm text-muted-foreground">With any main course</p>
              </div>
              <Button variant="outline" size="sm" className="text-primary hover:bg-primary/10">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};