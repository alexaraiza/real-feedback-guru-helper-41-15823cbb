import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RestaurantHeader } from "@/components/demo/RestaurantHeader";
import { ReviewSection } from "@/components/demo/ReviewSection";

const DemoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <RestaurantHeader 
          logoUrl="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
          name="Demo Restaurant"
          description="Share your positive dining experience!"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <ReviewSection />

          <div className="relative">
            <div className="sticky top-24 space-y-6">
              <img
                src="/lovable-uploads/f790e463-d057-4fec-b168-02e376930c1c.png"
                alt="Restaurant experience"
                className="rounded-xl shadow-xl"
              />
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  Create your own restaurant page and start collecting valuable customer feedback.
                </p>
                <Button
                  onClick={() => navigate("/restaurants/onboard")}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Create Your Restaurant Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;