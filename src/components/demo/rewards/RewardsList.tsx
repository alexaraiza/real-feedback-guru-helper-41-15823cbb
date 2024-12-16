import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        Your EatUP! Rewards Journey:
      </h4>
      
      <div className="space-y-6">
        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="absolute -top-3 -right-3 bg-[#E94E87] text-white px-3 py-1 rounded-full text-sm font-medium">
            Second Visit
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Free Dessert</h4>
            <p className="text-gray-600">
              Indulge in a complimentary dessert of your choice! Choose from our selection of house-made desserts, including our famous chocolate lava cake, creamy cheesecake, or seasonal fruit tart.
              <span className="text-[#E94E87] block mt-2 font-medium">
                Value up to £8.95
              </span>
              <span className="bg-gray-50 p-2 rounded-lg text-gray-500 text-sm mt-3 block">
                💡 After your second visit, reply to your EatUP! welcome email with your receipt to unlock this reward
              </span>
            </p>
          </div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="absolute -top-3 -right-3 bg-[#E94E87] text-white px-3 py-1 rounded-full text-sm font-medium">
            Third Visit
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Complimentary Appetizer</h4>
            <p className="text-gray-600">
              Start your dining experience with us in style! Choose any appetizer from our menu - from our crispy calamari to our fresh bruschetta or signature spring rolls.
              <span className="text-[#E94E87] block mt-2 font-medium">
                Value up to £12.95
              </span>
              <span className="bg-gray-50 p-2 rounded-lg text-gray-500 text-sm mt-3 block">
                💡 After your third visit, reply to your EatUP! email with your receipt to unlock this reward
              </span>
            </p>
          </div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="absolute -top-3 -right-3 bg-[#E94E87] text-white px-3 py-1 rounded-full text-sm font-medium">
            Fourth Visit
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Chef's Special Surprise</h4>
            <p className="text-gray-600">
              Experience an exclusive culinary creation prepared specially for our most loyal customers. Our chef will prepare a unique dish just for you!
              <span className="text-[#E94E87] block mt-2 font-medium">
                Special VIP Experience
              </span>
              <span className="bg-gray-50 p-2 rounded-lg text-gray-500 text-sm mt-3 block">
                💡 This reward will be automatically unlocked after confirming your third visit
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};