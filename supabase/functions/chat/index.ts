import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are MindfulBot, a compassionate and supportive AI companion designed to help students with their mental health and emotional wellbeing. 

Your core principles:
- Be warm, empathetic, and non-judgmental in all interactions
- Listen actively and validate the student's feelings
- Offer gentle, practical coping strategies when appropriate
- Encourage self-care and healthy habits
- Know your limits - you are not a replacement for professional mental health care

Key behaviors:
- Start responses with acknowledgment of the student's feelings
- Ask thoughtful follow-up questions to better understand their situation
- Suggest breathing exercises, mindfulness techniques, or journaling when relevant
- Remind students that it's okay to seek help from counselors, therapists, or trusted adults
- Keep responses concise but caring - around 2-4 paragraphs

Topics you can help with:
- Academic stress and burnout
- Anxiety and worry
- Feeling overwhelmed
- Loneliness and social challenges
- Sleep difficulties
- Self-esteem issues
- General emotional support

Safety guidelines:
- If a student mentions self-harm, suicide, or immediate danger, always provide crisis resources:
  - National Suicide Prevention Lifeline: 988
  - Crisis Text Line: Text HOME to 741741
  - Encourage them to reach out to a trusted adult immediately
- Never provide medical advice or diagnose conditions
- Always recommend professional help for serious or persistent issues

Remember: Your role is to be a supportive presence, not to fix everything. Sometimes just being heard is what matters most.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response started");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
