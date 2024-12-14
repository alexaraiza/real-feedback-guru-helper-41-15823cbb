import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Copy, RefreshCw } from "lucide-react";

interface ReviewCardProps {
  businessName: string;
  businessImage?: string;
}

export const ReviewCard = ({ businessName, businessImage }: ReviewCardProps) => {
  const [review, setReview] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const { toast } = useToast();

  const handleRefineReview = async () => {
    setIsRefining(true);
    // TODO: Implement OpenAI integration
    setTimeout(() => {
      setReview("This is a refined version of your review...");
      setIsRefining(false);
    }, 1000);
  };

  const handleCopyAndRedirect = () => {
    navigator.clipboard.writeText(review);
    toast({
      title: "Review copied!",
      description: "Opening Google Reviews in a new tab...",
    });
    window.open("https://google.com", "_blank");
  };

  return (
    <div className="glass-card rounded-xl p-6 max-w-xl w-full mx-auto space-y-6 fade-in">
      <div className="flex items-center space-x-4">
        {businessImage && (
          <img
            src={businessImage}
            alt={businessName}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{businessName}</h2>
          <p className="text-sm text-muted-foreground">Write your review below</p>
        </div>
      </div>

      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience..."
        className="min-h-[150px] resize-none"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleRefineReview}
          disabled={!review || isRefining}
          className="button-hover flex-1"
          variant="outline"
        >
          {isRefining ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refine Review
        </Button>

        <Button
          onClick={handleCopyAndRedirect}
          disabled={!review}
          className="button-hover flex-1"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy & Submit to Google
        </Button>
      </div>
    </div>
  );
};