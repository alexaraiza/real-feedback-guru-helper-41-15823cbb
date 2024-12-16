interface ReviewCodeProps {
  uniqueCode: string;
}

export const ReviewCode = ({ uniqueCode }: ReviewCodeProps) => {
  return (
    <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-xl text-center mb-4">Your Reward Code</h3>
      <p className="text-center text-3xl font-mono font-bold text-[#E94E87] mb-4 tracking-wider">{uniqueCode}</p>
      <p className="text-center text-gray-600">
        Show this code on your next visit to redeem your rewards!
      </p>
    </div>
  );
};