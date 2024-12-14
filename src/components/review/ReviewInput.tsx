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
          <p className="text-sm text-muted-foreground">Tell us about your experience</p>
        </div>
      </div>

      <Textarea
        value={review}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What did you enjoy about your visit? How was the food and service? Would you recommend it to others?"
        className="min-h-[150px] resize-none"
      />
    </div>
  );
};