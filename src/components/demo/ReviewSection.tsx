import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, MessageSquare, Upload, Bot } from "lucide-react";
import { ReceiptUploadSection } from "@/components/demo/ReceiptUploadSection";
import { ReceiptAnalysisDisplay } from "@/components/demo/ReceiptAnalysisDisplay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RewardsSection } from "./RewardsSection";

export const ReviewSection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
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

      const { data, error } = await supabase.functions.invoke('analyze-receipt', {
        body: { imageUrl: publicUrl },
      });

      if (error) throw error;

      setAnalysisResult(data.analysis);
      toast({
        title: "✅ Step 1 Complete!",
        description: "Receipt uploaded and analyzed successfully. Please proceed to Step 2.",
      });
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Error",
        description: "Failed to analyze receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRefineReview = async () => {
    if (!reviewText.trim()) {
      toast({
        title: "Review required",
        description: "Please write your thoughts before refining.",
        variant: "destructive",
      });
      return;
    }

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
        title: "✅ Step 3 Complete!",
        description: "Your review has been professionally enhanced. Ready to share!",
      });
    } catch (error) {
      console.error('Error refining review:', error);
      toast({
        title: "Error",
        description: "Failed to refine review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopyAndRedirect = () => {
    navigator.clipboard.writeText(reviewText);
    window.open('https://maps.app.goo.gl/Nx23mQHet4TBfctJ6', '_blank');
    setRewardCode('plzrdDDQ');
    toast({
      title: "Review copied!",
      description: "Opening Google Reviews in a new tab. Please paste your review there.",
    });
  };

  return (
    <Card>
      <CardContent className="space-y-8 pt-6">
        {/* Step 1: Upload receipt */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-primary">
            <Upload className="h-5 w-5" />
            <h3>Step 1: Upload a photo of your receipt</h3>
          </div>
          <ReceiptUploadSection 
            onFileSelect={handleReceiptUpload}
            isAnalyzing={isAnalyzing}
          />
          {analysisResult && (
            <ReceiptAnalysisDisplay analysisResult={analysisResult} />
          )}
        </div>

        {/* Step 2: Share thoughts (only shown after receipt upload) */}
        {analysisResult && (
          <div className="space-y-4 fade-in">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <MessageSquare className="h-5 w-5" />
              <h3>Step 2: Share some positive thoughts</h3>
            </div>
            <Textarea
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                if (e.target.value.trim().length > 0) {
                  toast({
                    title: "✅ Step 2 Complete!",
                    description: "Great! Click 'AI Refine Review' to enhance your review.",
                  });
                }
              }}
              placeholder="What did you love about your visit? Tell us about the amazing food, exceptional service, or memorable moments!"
              className="min-h-[150px] bg-white/50 font-medium resize-none"
            />
          </div>
        )}

        {/* Step 3: Refine and share (only shown after entering review text) */}
        {analysisResult && reviewText.trim() && (
          <div className="space-y-4 fade-in">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <Bot className="h-5 w-5" />
              <h3>Step 3: Refine your review and share it</h3>
            </div>
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
          </div>
        )}

        {/* Rewards Section */}
        <div className="pt-6">
          <h3 className="text-xl font-semibold text-center mb-6">
            Want a reward for your next visit?
          </h3>
          <RewardsSection rewardCode={rewardCode} />
        </div>
      </CardContent>
    </Card>
  );
};