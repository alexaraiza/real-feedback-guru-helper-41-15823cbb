import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ReviewCard } from "@/components/ReviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReceiptUploadSection } from "@/components/demo/ReceiptUploadSection";
import { ReceiptAnalysisDisplay } from "@/components/demo/ReceiptAnalysisDisplay";

const generateNaturalReview = (items: Array<{ name: string; price: number }>, totalAmount: number) => {
  // Convert items array to a natural language list
  const itemNames = items.map(item => item.name);
  // Use a fallback for browsers/environments that don't support Intl.ListFormat
  let naturalItemsList: string;
  try {
    naturalItemsList = new (Intl as any).ListFormat('en', { style: 'long', type: 'conjunction' }).format(itemNames);
  } catch {
    // Fallback to simple joining with commas and "and"
    naturalItemsList = itemNames.length > 1 
      ? `${itemNames.slice(0, -1).join(', ')} and ${itemNames[itemNames.length - 1]}`
      : itemNames[0];
  }
  
  // Generate opening sentences with some variety
  const openings = [
    "Had an amazing dining experience here!",
    "What a delightful meal we had today!",
    "Really enjoyed our visit to this restaurant!",
    "Just had a wonderful dining experience!",
  ];
  
  const opening = openings[Math.floor(Math.random() * openings.length)];
  
  // Generate the main review
  const review = `${opening} We tried ${naturalItemsList} and everything was perfectly prepared. The flavors were exceptional and the presentation was beautiful. The service was attentive and friendly throughout our meal. At $${totalAmount}, the value was great for the quality of food and service received.

Our table had:
${items.map(item => `• ${item.name}`).join('\n')}

Would definitely recommend this place to anyone looking for a great dining experience!`;

  return review;
};

const DemoPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [reviewText, setReviewText] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReceiptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('review_photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('review_photos')
        .getPublicUrl(filePath);

      setReceiptUrl(publicUrl);
      analyzeReceipt(publicUrl);
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Error",
        description: "Failed to upload receipt",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeReceipt = async (imageUrl: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-receipt', {
        body: { imageUrl },
      });

      if (error) throw error;

      setAnalysisResult(data.analysis);
      
      // Generate a natural-sounding review using the new format
      const review = generateNaturalReview(data.analysis.items, data.analysis.total_amount);
      setReviewText(review);

      toast({
        title: "Success",
        description: "Receipt analyzed and review generated",
      });
    } catch (error) {
      console.error('Error analyzing receipt:', error);
      toast({
        title: "Error",
        description: "Failed to analyze receipt",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          Experience EatUP! Demo
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Upload a receipt, get an AI-powered review, and earn rewards instantly. See how easy it is to share your dining experience!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review & Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ReceiptUploadSection 
                  onFileSelect={handleReceiptUpload}
                  isAnalyzing={isAnalyzing}
                />

                {analysisResult && (
                  <ReceiptAnalysisDisplay analysisResult={analysisResult} />
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Generated Review</label>
                  <Textarea
                    value={reviewText}
                    readOnly
                    className="min-h-[250px] bg-white/50 font-medium"
                  />
                </div>

                <ReviewCard
                  businessName="Demo Restaurant"
                  businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
                  onTakeAiSurvey={() => {}}
                />
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <div className="sticky top-24 space-y-6">
              <img
                src="/lovable-uploads/f790e463-d057-4fec-b168-02e376930c1c.png"
                alt="Restaurant experience"
                className="rounded-xl shadow-xl"
              />
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  Create your own restaurant page and start collecting valuable customer feedback.
                </p>
                <Button
                  onClick={() => navigate("/restaurants/onboard")}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Create Your Restaurant Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;