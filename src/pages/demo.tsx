import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RestaurantHeader } from "@/components/demo/RestaurantHeader";
import { ReviewSection } from "@/components/demo/ReviewSection";
import { Building2, ArrowRight, Star, Utensils } from "lucide-react";

const DemoPage = () => {
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    window.open("https://forms.gle/7Zfrin7spzLWixGj9", "_blank");
  };

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
            <div className="sticky top-24 space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-pink-100">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Ready to Transform Your Restaurant Reviews?
                </h2>
                <p className="text-gray-600">
                  Join restaurants that are revolutionizing their customer feedback experience.
                </p>
              </div>

              <div className="space-y-4 py-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Boost Positive Reviews</h3>
                    <p className="text-sm text-gray-600">Encourage happy customers to share their experiences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Utensils className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Custom Review Pages</h3>
                    <p className="text-sm text-gray-600">Personalized review collection pages for your restaurant</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleRegistrationClick}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
              >
                Register Your Restaurant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;