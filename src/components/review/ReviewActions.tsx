import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, ExternalLink } from "lucide-react";

interface ReviewActionsProps {
  review: string;
  isRefining: boolean;
  isSubmitting: boolean;
  uniqueCode: string | null;
  isRefined: boolean;
  onRefine: () => void;
  onSubmit: () => void;
  onCopyAndRedirect: () => void;
}

export const ReviewActions = ({
  review,
  isRefining,
  isSubmitting,
  uniqueCode,
  isRefined,
  onRefine,
  onSubmit,
  onCopyAndRedirect,
}: ReviewActionsProps) => {
  if (!isRefined) {
    return (
      <Button
        onClick={onRefine}
        disabled={isRefining}
        className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
      >
        {isRefining ? (
          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <RefreshCw className="mr-2 h-5 w-5" />
        )}
        Refine Review
      </Button>
    );
  }

  return (
    <Button
      onClick={onCopyAndRedirect}
      className="w-full bg-[#E94E87] hover:bg-[#E94E87]/90 text-white shadow-lg space-x-2"
    >
      <div className="flex items-center">
        <Copy className="mr-2 h-5 w-5" />
        <span>Copy Review & Open Google Reviews</span>
        <ExternalLink className="ml-2 h-5 w-5" />
      </div>
    </Button>
  );
};