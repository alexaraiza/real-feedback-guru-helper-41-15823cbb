import { Button } from "@/components/ui/button";
import { Gift, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const UnlockedOffers = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Here you would typically send the email to your backend
    toast({
      title: "Success!",
      description: "Your rewards have been sent to your email.",
    });
  };

  return (
    <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
      <div className="flex items-center justify-center gap-2 mb-4 text-primary">
        <Gift className="h-6 w-6" />
        <h3 className="font-semibold text-lg">Your Rewards Are Ready!</h3>
      </div>

      <form onSubmit={handleEmailSubmit} className="mb-6">
        <p className="text-sm text-center mb-4">
          Enter your email to receive your rewards and save them for your next visit:
        </p>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="outline" className="text-primary">
            Send Rewards
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        <div className="bg-white/80 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">20% Off Your Next Visit</h4>
              <p className="text-sm text-muted-foreground">Valid for 30 days</p>
            </div>
            <Button variant="outline" size="sm" className="text-primary">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
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
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};