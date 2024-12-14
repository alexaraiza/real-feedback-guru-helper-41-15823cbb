import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { review, businessName } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates suggestions to expand short restaurant reviews. Generate 3 short, specific suggestions that would naturally complement the existing review. Each suggestion should be a complete sentence that could be added to the review.'
          },
          {
            role: 'user',
            content: `The user wrote this short review for ${businessName}: "${review}". Generate 3 natural suggestions to expand this review. Each suggestion should be specific and feel personal, not generic.`
          }
        ],
      }),
    });

    const data = await response.json();
    const suggestions = data.choices[0].message.content
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 3);

    return new Response(
      JSON.stringify({ suggestions }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate suggestions' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});