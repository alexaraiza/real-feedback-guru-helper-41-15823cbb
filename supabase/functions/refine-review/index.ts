import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { review, receiptData } = await req.json();
    console.log('Processing review:', review, 'with receipt data:', receiptData);

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    const systemPrompt = `You are EatUP!, an AI assistant that helps refine restaurant reviews. Your task is to create an engaging and detailed review that incorporates both the customer's personal experience and the specific items from their receipt.

Instructions:
1. Analyze both the initial review and the receipt details
2. Create a natural-sounding review that mentions specific dishes and their qualities
3. Maintain a positive, authentic tone while being detailed and helpful
4. Include the total amount spent if available
5. Keep the personal touches from the original review
6. Ensure the review flows naturally and doesn't sound automated`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Initial Review: "${review}"\n\nReceipt Details: ${receiptData ? JSON.stringify(receiptData) : 'No receipt data available'}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.3
    });

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Invalid response from OpenAI');
    }

    const refinedReview = response.choices[0].message.content.trim();
    console.log('Refined review:', refinedReview);

    return new Response(
      JSON.stringify({ refinedReview }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error in refine-review function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        refinedReview: "We apologize, but we couldn't refine your review at this moment. Your original review has been preserved. Please try again later."
      }),
      {
        status: 200, // Return 200 even on error to handle it gracefully on the client
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});