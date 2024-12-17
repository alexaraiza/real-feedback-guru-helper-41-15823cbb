import { Card } from "@/components/ui/card";

interface RestaurantHeaderProps {
  name: string;
  isCustomDemo?: boolean;
}

export const RestaurantHeader = ({ name, isCustomDemo = false }: RestaurantHeaderProps) => {
  if (isCustomDemo) {
    return (
      <div className="flex flex-col items-center space-y-4 mb-8 md:mb-12">
        <img
          src="/lovable-uploads/9770ff21-86a3-477a-b98e-8264c81daf39.png"
          alt="Restaurant food spread"
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
          Leave a Review for {name}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8 md:mb-12">
      <img
        src="/lovable-uploads/9770ff21-86a3-477a-b98e-8264c81daf39.png"
        alt="Restaurant food spread"
        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full mx-auto md:mx-0"
      />
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          Try EatUP! For Your Restaurant
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-2">
          See How EatUP! Works for Your Restaurant
        </p>
        <p className="text-sm text-muted-foreground max-w-lg">
          Customize the demo with your restaurant's name and Google Maps link to experience the process as your customers would. Watch how they write reviews, upload receipts for rewards, and share their feedback. EatUP! boosts positive reviews, encourages loyalty, and drives repeat visits with AI-powered tools.
        </p>
      </div>
    </div>
  );
};