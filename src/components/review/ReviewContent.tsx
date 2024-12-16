import { FC } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ReviewContentProps {
  review: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export const ReviewContent: FC<ReviewContentProps> = ({ review, onChange, maxLength = 500 }) => {
  return (
    <div className="space-y-2">
      <Textarea
        value={review}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What did you love about your visit? Tell us about the amazing food, exceptional service, or memorable moments that made your experience special!"
        className="min-h-[150px] resize-none rounded-xl border-primary/20 focus:border-primary/40 transition-colors"
      />
      <div className="text-sm text-muted-foreground text-right">
        {review.length}/{maxLength} characters
      </div>
    </div>
  );
};