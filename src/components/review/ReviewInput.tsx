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
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/10"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{businessName}</h2>
          <p className="text-sm text-muted-foreground">Share your positive dining experience!</p>
        </div>
      </div>

      <Textarea
        value={review}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What did you love about your visit? Tell us about the amazing food, exceptional service, or memorable moments that made your experience special!"
        className="min-h-[150px] resize-none"
      />
    </div>
  );
};