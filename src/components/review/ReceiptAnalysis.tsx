interface ReceiptAnalysisProps {
  receiptData: any;
}

export const ReceiptAnalysis = ({ receiptData }: ReceiptAnalysisProps) => {
  if (!receiptData) return null;

  return (
    <div className="bg-secondary/5 p-4 rounded-lg space-y-2">
      <h3 className="font-semibold">Receipt Analysis</h3>
      <p><strong>Total:</strong> ${receiptData.total_amount}</p>
      <div>
        <strong>Items:</strong>
        <ul className="list-disc list-inside">
          {receiptData.items?.map((item: any, index: number) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};