import { Button } from "@/components/ui/button";
import { Gift, ExternalLink } from "lucide-react";

export const UnlockedOffers = () => {
  return (
    <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
      <div className="flex items-center justify-center gap-2 mb-4 text-primary">
        <Gift className="h-6 w-6" />
        <h3 className="font-semibold text-lg">Unlocked Offers!</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-white/80 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">20% Off Your Next Visit</h4>
              <p className="text-sm text-muted-foreground">Valid for 30 days</p>
            </div>
            <Button variant="outline" size="sm" className="text-primary">
              <ExternalLink className="h-4 w-4 mr-2" />
              Claim
            </Button>
          </div>
        </div>
        <div className="bg-white/80 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Free Dessert</h4>
              <p className="text-sm text-muted-foreground">With any main course</p>
            </div>
            <Button variant="outline" size="sm" className="text-primary">
              <ExternalLink className="h-4 w-4 mr-2" />
              Claim
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};