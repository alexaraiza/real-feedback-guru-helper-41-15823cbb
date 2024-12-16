import { ExternalLink } from "lucide-react";

export const RewardsList = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-center text-gray-800 mt-12 mb-8">
        Your Review Journey with EatUP! 🎉
      </h4>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300 space-y-8">
        {/* First Visit Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            1️⃣ First Visit Reward – Get it Now!
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• Share your review on Google and show it to a staff member</p>
            <p>• The staff will give you today's special reward right away! 🎁</p>
          </div>
        </div>

        {/* Future Visits Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            Join EatUP! for More Rewards!
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600">
            <p className="font-medium mb-2">For your 2nd, 3rd, and 4th visits:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Take a photo of your receipt after each visit</li>
              <li>Email it to EatUP!</li>
              <li>We'll send you the reward of the day for your next visit</li>
              <li>Show your reward email to redeem it on your next visit</li>
            </ul>
          </div>
        </div>

        {/* Why Join EatUP! Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3">
            Why Join EatUP!?
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-600 space-y-2">
            <p>• <span className="font-medium">Instant First Reward:</span> Get today's special offer just for sharing your review!</p>
            <p>• <span className="font-medium">Easy Future Rewards:</span> Simply email your receipt to unlock rewards for your next three visits</p>
          </div>
        </div>
      </div>
    </div>
  );
};