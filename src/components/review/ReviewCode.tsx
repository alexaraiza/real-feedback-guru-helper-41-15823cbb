interface ReviewCodeProps {
  uniqueCode: string;
}

export const ReviewCode = ({ uniqueCode }: ReviewCodeProps) => {
  return (
    <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
      <p className="text-center">
        Your unique review code: <span className="font-mono font-bold">{uniqueCode}</span>
      </p>
      <p className="text-sm text-center text-muted-foreground mt-2">
        Save this code to track your review status
      </p>
    </div>
  );
};