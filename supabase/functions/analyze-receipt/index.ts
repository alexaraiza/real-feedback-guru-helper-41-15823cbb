import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      throw new Error('Image URL is required');
    }

    console.log('Analyzing receipt image:', imageUrl);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a receipt analysis expert. Extract key information from the receipt image and return it in a specific JSON format with total_amount, items (array of objects with name and price), tax_amount (if present), and discounts (if any)."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this receipt and extract the following information in JSON format: total amount, list of items with their prices, tax amount if shown, and any discounts applied."
              },
              {
                type: "image_url",
                image_url: imageUrl
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.1
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to analyze receipt with OpenAI');
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    // Ensure the response is properly formatted JSON
    let analysis;
    try {
      analysis = typeof data.choices[0].message.content === 'string' 
        ? JSON.parse(data.choices[0].message.content)
        : data.choices[0].message.content;
    } catch (e) {
      console.error('Error parsing OpenAI response:', e);
      throw new Error('Invalid response format from OpenAI');
    }

    // Validate the analysis object has the required fields
    if (!analysis.total_amount || !analysis.items) {
      throw new Error('Incomplete analysis result');
    }

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-receipt function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to analyze receipt' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});