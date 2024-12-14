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
    <div className="flex flex-col gap-3">
      <Button
        onClick={onRefine}
        disabled={isRefining}
        className="w-full bg-secondary hover:bg-secondary/90 text-white"
        size="sm"
      >
        {isRefining ? (
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="mr-2 h-4 w-4" />
        )}
        Refine Review
      </Button>

      {!uniqueCode && isRefined && (
        <Button
          onClick={onSubmit}
          disabled={!review || isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white"
          size="sm"
        >
          Submit Review
        </Button>
      )}

      {uniqueCode && (
        <Button
          onClick={onCopyAndRedirect}
          className="w-full bg-primary hover:bg-primary/90 text-white"
          size="sm"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy & Open Google Reviews
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};