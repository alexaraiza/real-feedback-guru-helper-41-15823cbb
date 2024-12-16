import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-4">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-lg text-secondary">20% Off Your Next Visit</h4>
            <p className="text-sm text-muted-foreground">Valid for 30 days after your review</p>
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
            <p className="text-sm text-muted-foreground">On your third visit</p>
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
            <p className="text-sm text-muted-foreground">On your fourth visit</p>
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