import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, language } = await req.json();
    console.log(`Executing ${language} code:`, code);

    let output = "";
    let error = "";

    if (language === "python") {
      try {
        const command = new Deno.Command("python3", {
          args: ["-c", code],
          stdout: "piped",
          stderr: "piped",
        });

        const process = command.spawn();
        
        // Set a timeout of 5 seconds
        const timeoutId = setTimeout(() => {
          process.kill();
        }, 5000);

        const { stdout, stderr } = await process.output();
        clearTimeout(timeoutId);

        output = new TextDecoder().decode(stdout);
        error = new TextDecoder().decode(stderr);
      } catch (e) {
        error = e instanceof Error ? e.message : "Execution error";
      }
    } else if (language === "bash") {
      try {
        const command = new Deno.Command("bash", {
          args: ["-c", code],
          stdout: "piped",
          stderr: "piped",
        });

        const process = command.spawn();
        
        // Set a timeout of 5 seconds
        const timeoutId = setTimeout(() => {
          process.kill();
        }, 5000);

        const { stdout, stderr } = await process.output();
        clearTimeout(timeoutId);

        output = new TextDecoder().decode(stdout);
        error = new TextDecoder().decode(stderr);
      } catch (e) {
        error = e instanceof Error ? e.message : "Execution error";
      }
    } else {
      error = `${language} execution not supported. Only Python and Bash are currently supported.`;
    }

    return new Response(
      JSON.stringify({ output, error }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (e) {
    console.error('Code execution error:', e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
