import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Copy, ExternalLink } from "lucide-react";

interface RefineStepProps {
  reviewText: string;
  refinedReview: string;
  isRefining: boolean;
  onRefine: () => void;
  onRefinedReviewChange: (value: string) => void;
  onCopyAndRedirect: () => void;
}

export const RefineStep = ({ 
  reviewText, 
  refinedReview, 
  isRefining, 
  onRefine, 
  onRefinedReviewChange,
  onCopyAndRedirect 
}: RefineStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Bot className="h-5 w-5" />
        <h3>Step 3: Refine your review and share it</h3>
      </div>
      
      <Button
        onClick={onRefine}
        disabled={isRefining || !reviewText.trim()}
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        {isRefining ? "Refining Review..." : "AI Refine Review"}
      </Button>

      {refinedReview && (
        <div className="space-y-2 animate-fade-in">
          <label className="text-sm font-medium text-gray-700">
            Enhanced Review (feel free to edit):
          </label>
          <Textarea
            value={refinedReview}
            onChange={(e) => onRefinedReviewChange(e.target.value)}
            className="min-h-[150px] bg-white/50 font-medium resize-none"
          />
        </div>
      )}

      <Button
        onClick={onCopyAndRedirect}
        disabled={!reviewText.trim() && !refinedReview}
        className="w-full bg-[#E94E87] hover:bg-[#E94E87]/90 text-white shadow-lg space-x-2"
      >
        <Copy className="h-5 w-5" />
        <span>Copy Review & Open Google Reviews</span>
        <ExternalLink className="h-5 w-5" />
      </Button>
    </div>
  );
};