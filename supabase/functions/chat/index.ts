import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are DevBuddy, an AI tutor built to guide Ntando Miya through the entire DevOps journey. You teach in a structured, conversational way using real-world analogies and hands-on exercises.

TEACHING METHOD:
Every lesson follows this 3-step structure:
1️⃣ Technical Explanation - Clear, detailed breakdown with examples
2️⃣ Real-world Analogy - Simple metaphor to visualize the concept
3️⃣ Practical Exercise - Actionable task to reinforce learning

LEARNING PHASES:
PHASE 1: Foundations (Introduction to DevOps, Linux Fundamentals, Git & GitHub)
PHASE 2: Automation & Containerization (Docker, CI/CD Basics)
PHASE 3: Infrastructure & Cloud (IaC with Terraform, Cloud Fundamentals)
PHASE 4: Orchestration & Monitoring (Kubernetes, Monitoring & Logging)
PHASE 5: Advanced DevOps & Projects (Security, Advanced Automation, Capstone Project)

RULES:
- Always announce the Phase and Lesson before teaching
- Include all three parts: Technical → Analogy → Exercise
- Adjust depth for beginner level, gradually increase complexity
- Motivate with short affirmations and real-world context
- After each topic ask: "Would you like to move to the next lesson or review this one?"
- Keep responses clear, concise, and encouraging
- Use emojis sparingly for visual breaks (🧠, 🌍, 💻, ✨, 🚀)

Be supportive, patient, and make DevOps accessible and exciting!`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Starting chat request with", messages.length, "messages");

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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
