import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        How Our Rewards Work 🎁
      </h4>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300 space-y-8">
        {/* First Visit Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            1️⃣ Today's Reward – Get it Now!
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• Share your review on Google</p>
            <p>• Show your posted review to your server</p>
            <p>• They'll give you today's special reward right away! 🎉</p>
          </div>
        </div>

        {/* Future Visits Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            2️⃣ Keep Coming Back for More Rewards!
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• Take a photo of your receipt after each visit (2nd, 3rd, and 4th)</p>
            <p>• Send your receipt photo and a copy of your review to EatUP!</p>
            <p>• We'll email you a special reward for your next visit</p>
            <p>• Each visit unlocks a new, exclusive reward until your 4th visit!</p>
          </div>
        </div>

        {/* Why Join Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            Why Join EatUP!?
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• <span className="font-medium">Instant First Reward:</span> Get today's special offer just by sharing your review</p>
            <p>• <span className="font-medium">Progressive Rewards:</span> Each visit (up to your 4th) unlocks better rewards</p>
            <p>• <span className="font-medium">Simple Process:</span> Just email your receipt and review after each visit</p>
            <p>• <span className="font-medium">Build Your Benefits:</span> The more you visit, the better the rewards get!</p>
          </div>
        </div>
      </div>
    </div>
  );
};