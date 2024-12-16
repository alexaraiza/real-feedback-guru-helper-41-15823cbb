import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-center text-secondary mb-6">
        Additional Rewards You'll Unlock:
      </h4>
      
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-lg text-secondary">Free Dessert</h4>
            <p className="text-sm text-muted-foreground">Reward for your third visit</p>
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
            <h4 className="font-semibold text-lg text-secondary">Complimentary Appetizer</h4>
            <p className="text-sm text-muted-foreground">Reward for your fourth visit</p>
          </div>
          <Button variant="outline" size="sm" className="text-primary hover:bg-primary/10">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};