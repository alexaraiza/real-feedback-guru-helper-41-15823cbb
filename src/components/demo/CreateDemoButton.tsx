import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CreateDemoButtonProps {
  onPageCreated: (restaurantName: string) => void;
}

export const CreateDemoButton = ({ onPageCreated }: CreateDemoButtonProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateDemo = async () => {
    setIsCreating(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoRestaurantName = "demo-restaurant";
      onPageCreated(demoRestaurantName);
      
      toast({
        title: "Success!",
        description: "Your demo review page has been created.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create demo review page. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      onClick={handleCreateDemo}
      disabled={isCreating}
      className="w-full"
    >
      {isCreating ? "Creating..." : "Create Demo Review Page"}
    </Button>
  );
};