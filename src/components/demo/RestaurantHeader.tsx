import { Card } from "@/components/ui/card";

interface RestaurantHeaderProps {
  logoUrl: string;
  name: string;
  description: string;
}

export const RestaurantHeader = ({ logoUrl, name, description }: RestaurantHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-primary/10 shadow-lg mx-auto md:mx-0"
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
            {name}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="text-center md:text-left">
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          Below, you'll see a demonstration of our AI-powered review system. Try uploading a receipt and see how our AI enhances your review, making it more engaging while maintaining authenticity. You can also explore how we generate personalized rewards based on dining experiences.
        </p>
      </div>
    </div>
  );
};