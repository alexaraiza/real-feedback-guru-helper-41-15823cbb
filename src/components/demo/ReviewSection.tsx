import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { ReceiptUploadSection } from "@/components/demo/ReceiptUploadSection";
import { ReceiptAnalysisDisplay } from "@/components/demo/ReceiptAnalysisDisplay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RewardsSection } from "./RewardsSection";

export const ReviewSection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [reviewText, setReviewText] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [rewardCode, setRewardCode] = useState<string | null>(null);
  const { toast } = useToast();

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
      toast({
        title: "Success",
        description: "Receipt analyzed successfully",
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

  const handleRefineReview = async () => {
    try {
      setIsRefining(true);
      const { data, error } = await supabase.functions.invoke('refine-review', {
        body: { 
          review: reviewText,
          receiptData: analysisResult || null
        },
      });

      if (error) throw error;
      
      setReviewText(data.refinedReview);
      toast({
        title: "Review refined!",
        description: "Your review has been professionally enhanced.",
      });
    } catch (error) {
      console.error('Error refining review:', error);
      toast({
        title: "Error",
        description: "Failed to refine review",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopyAndRedirect = () => {
    navigator.clipboard.writeText(reviewText);
    window.open('https://maps.app.goo.gl/Nx23mQHet4TBfctJ6', '_blank');
    // Generate reward code only when user clicks this button
    setRewardCode('plzrdDDQ');
    toast({
      title: "Review copied!",
      description: "Opening Google Reviews in a new tab. Please paste your review there.",
    });
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="What did you love about your visit? Tell us about the amazing food, exceptional service, or memorable moments!"
            className="min-h-[150px] bg-white/50 font-medium resize-none"
          />
          
          <ReceiptUploadSection 
            onFileSelect={handleReceiptUpload}
            isAnalyzing={isAnalyzing}
          />

          {analysisResult && (
            <ReceiptAnalysisDisplay analysisResult={analysisResult} />
          )}

          <Button
            onClick={handleRefineReview}
            disabled={isRefining}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            {isRefining ? "Refining Review..." : "AI Refine Review"}
          </Button>

          <Button
            onClick={handleCopyAndRedirect}
            className="w-full bg-[#E94E87] hover:bg-[#E94E87]/90 text-white shadow-lg space-x-2"
          >
            <Copy className="h-5 w-5" />
            <span>Copy Review & Open Google Reviews</span>
            <ExternalLink className="h-5 w-5" />
          </Button>

          <RewardsSection rewardCode={rewardCode} />
        </div>
      </CardContent>
    </Card>
  );
};