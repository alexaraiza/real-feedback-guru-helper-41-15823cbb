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
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={onRefine}
        disabled={isRefining} // Remove the !review check
        className="button-hover flex-1 bg-secondary hover:bg-secondary/90 text-white shadow-lg"
        variant="outline"
      >
        {isRefining ? (
          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <RefreshCw className="mr-2 h-5 w-5" />
        )}
        Refine Review
      </Button>

      {!uniqueCode && isRefined && (
        <Button
          onClick={onSubmit}
          disabled={!review || isSubmitting}
          className="button-hover flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg"
        >
          Submit Review
        </Button>
      )}

      {uniqueCode && (
        <Button
          onClick={onCopyAndRedirect}
          className="button-hover flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg space-x-2"
        >
          <div className="flex items-center">
            <Copy className="mr-2 h-5 w-5" />
            <span>Copy Review & Open Google Reviews</span>
            <ExternalLink className="ml-2 h-5 w-5" />
          </div>
        </Button>
      )}
    </div>
  );
};