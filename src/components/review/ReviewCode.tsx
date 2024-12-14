interface ReviewCodeProps {
  uniqueCode: string;
}

export const ReviewCode = ({ uniqueCode }: ReviewCodeProps) => {
  return (
    <div className="p-8 bg-gradient-to-br from-primary/5 via-accent to-primary/5 rounded-2xl border border-primary/10 shadow-lg">
      <h3 className="font-bold text-xl text-center mb-4 text-secondary">Your Reward Code</h3>
      <p className="text-center text-3xl font-mono font-bold text-primary mb-4 tracking-wider">{uniqueCode}</p>
      <p className="text-center text-muted-foreground">
        Show this code on your next visit to redeem your rewards!
      </p>
    </div>
  );
};