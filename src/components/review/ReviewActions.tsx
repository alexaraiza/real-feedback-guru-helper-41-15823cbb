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
        disabled={!review || isRefining}
        className="button-hover flex-1 bg-secondary hover:bg-secondary/90 text-white"
        variant="outline"
      >
        {isRefining ? (
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="mr-2 h-4 w-4" />
        )}
        {review.length < 50 ? "Get Suggestions" : "Refine Review"}
      </Button>

      {!uniqueCode && isRefined && (
        <Button
          onClick={onSubmit}
          disabled={!review || isSubmitting}
          className="button-hover flex-1 bg-primary hover:bg-primary/90"
        >
          Save Review
        </Button>
      )}

      {uniqueCode && (
        <Button
          onClick={onCopyAndRedirect}
          className="button-hover flex-1 bg-primary hover:bg-primary/90"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy & Post to Google
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};