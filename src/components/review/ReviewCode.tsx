interface ReviewCodeProps {
  uniqueCode: string;
}

export const ReviewCode = ({ uniqueCode }: ReviewCodeProps) => {
  return (
    <div className="p-6 bg-secondary/5 rounded-lg border border-secondary/10">
      <h3 className="font-semibold text-lg text-center mb-2">Your Reward Code</h3>
      <p className="text-center text-2xl font-mono font-bold text-primary mb-3">{uniqueCode}</p>
      <p className="text-sm text-center text-muted-foreground">
        Show this code on your next visit to redeem your rewards!
      </p>
    </div>
  );
};