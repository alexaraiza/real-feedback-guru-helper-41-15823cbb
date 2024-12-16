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
    
    toast({
      title: "Success!",
      description: "Your reward code and future rewards have been sent to your email. Check your inbox!",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-3">
        <Gift className="h-8 w-8 text-[#E94E87]" />
        <h3 className="font-bold text-2xl">Get Your Reward Code</h3>
      </div>

      <form onSubmit={handleEmailSubmit}>
        <p className="text-center text-gray-600 text-lg mb-6">
          Enter your email to receive your unique reward code for 20% off and unlock these additional rewards:
        </p>
        <div className="flex gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 text-lg border-gray-200 focus:border-[#E94E87]/30 rounded-xl"
          />
          <Button 
            type="submit" 
            className="h-12 px-8 bg-[#E94E87] hover:bg-[#E94E87]/90 text-white rounded-xl text-lg font-semibold"
          >
            Send Rewards
          </Button>
        </div>
      </form>
    </div>
  );
};