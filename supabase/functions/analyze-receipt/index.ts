import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisResult {
  total_amount: number;
  items: Array<{ name: string; price: number }>;
  tax_amount?: number;
  discounts?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();
    console.log('Processing receipt image:', imageUrl);

    if (!imageUrl) {
      throw new Error('Image URL is required');
    }

    const requestBody = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a receipt analysis expert. Extract the following information from the receipt image and format your response EXACTLY as a JSON object with this structure:
{
  "total_amount": number,
  "items": [
    {
      "name": string,
      "price": number
    }
  ],
  "tax_amount": number (optional),
  "discounts": number (optional)
}
Do not include any additional text or explanation. Only return the JSON object.`
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0
    };

    console.log('Sending request to OpenAI:', JSON.stringify(requestBody, null, 2));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API error: ${response.status}\nResponse: ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', JSON.stringify(data, null, 2));

    let analysis: AnalysisResult;
    try {
      const content = data.choices[0].message.content;
      console.log('Raw content from OpenAI:', content);
      
      // Try to parse the content, handling both string and parsed JSON
      analysis = typeof content === 'string' ? JSON.parse(content.trim()) : content;

      // Validate the required fields
      if (typeof analysis.total_amount !== 'number' || !Array.isArray(analysis.items)) {
        console.error('Invalid analysis format:', analysis);
        throw new Error('Response missing required fields');
      }

      // Validate each item in the items array
      analysis.items.forEach((item, index) => {
        if (typeof item.name !== 'string' || typeof item.price !== 'number') {
          throw new Error(`Invalid item format at index ${index}`);
        }
      });

    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Invalid response format from OpenAI');
    }

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-receipt function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to analyze receipt',
        details: error.stack
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});