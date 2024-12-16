import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";
import { createClient } from '@supabase/supabase-js';

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
    const { review, receiptId } = await req.json();
    console.log('Processing review:', review, 'with receipt:', receiptId);

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get receipt analysis
    const { data: receiptData, error: receiptError } = await supabase
      .from('receipt_analysis')
      .select('*')
      .eq('id', receiptId)
      .single();

    if (receiptError) throw receiptError;

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "Create a restaurant review using information from an uploaded receipt and an initial review. The AI bot, EatUP!, should refine the initial review into a more comprehensive and engaging narrative, ensuring that the review specifically mentions and details the dishes listed in the receipt.\n\n# Steps\n\n1. **Analyze the Initial Review**: Assess the tone, key points, and structure of the initial review to understand its strengths and weaknesses.\n2. **Examine the Receipt**: Identify all dishes, beverages, and any additional items listed on the receipt to be included in the review.\n3. **Integrate Receipt Details**: Seamlessly incorporate the specific dishes and any related experiences or remarks from the receipt into the improved review.\n4. **Refine and Enhance**: Craft a more engaging narrative by improving language, style, and coherence, focusing on creating vivid imagery and clear indicators of the dining experience.\n5. **Maintain Balance**: Ensure that the review is unbiased, providing both positive and negative aspects where applicable, based on the initial review and receipt information."
            }
          ]
        },
        {
          role: "user",
          content: `Initial Review: "${review}"\n\nReceipt Details: ${JSON.stringify(receiptData.analysis_result)}`
        }
      ],
      response_format: { type: "text" },
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});