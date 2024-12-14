import { Textarea } from "@/components/ui/textarea";

interface ReviewInputProps {
  review: string;
  onChange: (value: string) => void;
  businessName: string;
  businessImage?: string;
}

export const ReviewInput = ({ review, onChange, businessName, businessImage }: ReviewInputProps) => {
  return (
    <div className="space-y-4">
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
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your experience..."
        className="min-h-[150px] resize-none"
      />
    </div>
  );
};