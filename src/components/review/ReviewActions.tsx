import { Button } from "@/components/ui/button";
import { RefreshCw, Copy } from "lucide-react";

interface ReviewActionsProps {
  review: string;
  isRefining: boolean;
  isSubmitting: boolean;
  uniqueCode: string | null;
  onRefine: () => void;
  onSubmit: () => void;
  onCopyAndRedirect: () => void;
}

export const ReviewActions = ({
  review,
  isRefining,
  isSubmitting,
  uniqueCode,
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
        Refine Review
      </Button>

      {!uniqueCode ? (
        <Button
          onClick={onSubmit}
          disabled={!review || isSubmitting}
          className="button-hover flex-1 bg-primary hover:bg-primary/90"
        >
          Submit Review
        </Button>
      ) : (
        <Button
          onClick={onCopyAndRedirect}
          className="button-hover flex-1 bg-primary hover:bg-primary/90"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy & Submit to Google
        </Button>
      )}
    </div>
  );
};