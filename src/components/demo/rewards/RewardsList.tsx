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
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Exclusive Reward Awaits</h4>
            <p className="text-gray-600">
              <span className="bg-gray-50 p-2 rounded-lg text-gray-500 text-sm mt-3 block">
                💡 After your first visit, reply to your welcome email with your receipt to unlock this reward for your second visit
              </span>
            </p>
          </div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="absolute -top-3 -right-3 bg-[#E94E87] text-white px-3 py-1 rounded-full text-sm font-medium">
            Third Visit
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Special Dining Reward</h4>
            <p className="text-gray-600">
              <span className="bg-gray-50 p-2 rounded-lg text-gray-500 text-sm mt-3 block">
                💡 After your second visit, reply to your EatUP! email with your receipt to unlock this reward for your third visit
              </span>
            </p>
          </div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="absolute -top-3 -right-3 bg-[#E94E87] text-white px-3 py-1 rounded-full text-sm font-medium">
            Fourth Visit
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Ultimate Dining Experience</h4>
            <p className="text-gray-600">
              <span className="bg-gray-50 p-2 rounded-lg text-gray-500 text-sm mt-3 block">
                💡 After your third visit, reply to your EatUP! email with your receipt to unlock this final reward
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};