import { ExternalLink } from "lucide-react";

interface RewardsListProps {
  hasUploadedReceipt?: boolean;
}

export const RewardsList = ({ hasUploadedReceipt }: RewardsListProps) => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        Join EatUP! Receipt Rewards 🎟️
      </h4>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300 space-y-8">
        {/* First Visit Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            1️⃣ Today's Reward
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• Share your experience on Google</p>
            <p>• Show your review to your server</p>
            <p>• Get your reward on the spot! 🎁</p>
          </div>
        </div>

        {/* Second Reward (Only shown if receipt is uploaded) */}
        {hasUploadedReceipt && (
          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-3">
              2️⃣ Your Next Visit Reward
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
              <p className="font-medium text-primary">Thanks for uploading your receipt!</p>
              <p>• Sign up to save your reward code</p>
              <p>• Show it on your next visit</p>
              <p>• Get a special reward based on today's visit! 🎉</p>
            </div>
          </div>
        )}

        {/* Why Join Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            🏆 Keep Earning Rewards
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-3">
            <div>
              <p className="font-medium text-primary">Personalized Rewards</p>
              <p>Each reward is tailored to what you love!</p>
            </div>
            <div>
              <p className="font-medium text-primary">Easy to Redeem</p>
              <p>Just show your code to your server</p>
            </div>
            <div>
              <p className="font-medium text-primary">Progressive Benefits</p>
              <p>Better rewards with each visit (up to 4 visits)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};