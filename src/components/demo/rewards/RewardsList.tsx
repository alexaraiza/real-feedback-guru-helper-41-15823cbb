import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mb-8">
        Additional Rewards You'll Unlock:
      </h4>
      
      <div className="space-y-4">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-xl text-gray-800">Free Dessert</h4>
              <p className="text-gray-500">Reward for your third visit</p>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              className="text-[#E94E87] border-[#E94E87]/20 hover:bg-[#E94E87]/5 hover:text-[#E94E87] font-medium"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              View Details
            </Button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-xl text-gray-800">Complimentary Appetizer</h4>
              <p className="text-gray-500">Reward for your fourth visit</p>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              className="text-[#E94E87] border-[#E94E87]/20 hover:bg-[#E94E87]/5 hover:text-[#E94E87] font-medium"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};