import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        Additional Rewards You'll Unlock with EatUP!:
      </h4>
      
      <div className="space-y-4">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div>
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Free Dessert</h4>
            <p className="text-gray-600">
              Indulge in a complimentary dessert of your choice during your third visit! Choose from our selection of house-made desserts, including our famous chocolate lava cake, creamy cheesecake, or seasonal fruit tart. 
              <span className="text-[#E94E87] block mt-2">
                Value up to £8.95 - Valid during your third visit
              </span>
              <span className="text-gray-500 text-sm mt-1 block">
                *Send us your second visit receipt to unlock this reward
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div>
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Complimentary Appetizer</h4>
            <p className="text-gray-600">
              Start your fourth dining experience with us in style! Choose any appetizer from our menu - from our crispy calamari to our fresh bruschetta or signature spring rolls. Perfect for sharing or enjoying solo.
              <span className="text-[#E94E87] block mt-2">
                Value up to £12.95 - Valid during your fourth visit
              </span>
              <span className="text-gray-500 text-sm mt-1 block">
                *Send us your third visit receipt to unlock this reward
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};