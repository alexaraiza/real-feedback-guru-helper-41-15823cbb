import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailCaptureProps {
  rewardCode: string | null;
}

export const EmailCapture = ({ rewardCode }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Here you would typically send the email with the reward code
    toast({
      title: "Success!",
      description: "Your rewards have been sent to your email. Check your inbox!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Gift className="h-7 w-7 text-primary" />
        <h3 className="font-bold text-2xl text-secondary">Claim Your Rewards</h3>
      </div>

      <form onSubmit={handleEmailSubmit} className="mb-8">
        <p className="text-center text-muted-foreground mb-4">
          Enter your email to receive your 20% off reward code for your next visit and unlock these additional rewards:
        </p>
        <div className="flex gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-primary/20 focus:border-primary/40"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
            Send Rewards
          </Button>
        </div>
      </form>
    </div>
  );
};