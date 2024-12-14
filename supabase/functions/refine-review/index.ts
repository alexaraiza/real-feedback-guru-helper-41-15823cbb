import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { review } = await req.json()

    // Basic refinement logic - you can enhance this as needed
    const refinedReview = review
      .trim()
      // Capitalize first letter of sentences
      .replace(/(^\w|\.\s+\w)/gm, letter => letter.toUpperCase())
      // Add proper spacing after punctuation
      .replace(/([.!?])\s*(?=[A-Za-z])/g, '$1 ')
      // Remove multiple spaces
      .replace(/\s+/g, ' ')

    // Return the refined review
    return new Response(
      JSON.stringify({ refinedReview }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})