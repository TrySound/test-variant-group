import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// CORS for development
app.use("/*", cors());

// Health check
app.get("/api/health", (c) => c.json({ status: "ok" }));

// Cover letter generation endpoint
app.post("/api/generate-cover-letter", async (c) => {
  try {
    const body = await c.req.json();
    const {
      jobTitle,
      companyName,
      jobDescription,
      userBackground,
      tone = "professional",
    } = body;

    if (!jobTitle || !companyName || !jobDescription || !userBackground) {
      return c.json(
        { error: "Missing required fields" },
        400
      );
    }

    const apiKey = process.env.GOCODE_API_KEY;
    if (!apiKey) {
      return c.json(
        { error: "API key not configured" },
        500
      );
    }

    const prompt = `
Write a cover letter for a ${jobTitle} position at ${companyName}.

Job Description:
${jobDescription}

My Background:
${userBackground}

Requirements:
- 3-4 paragraphs
- ${tone} tone
- Professional but conversational
- Highlight relevant experience matching the job
- Show enthusiasm for the company/role
- No generic fluff, be specific where possible
`;

    const response = await fetch(
      "https://opencode.ai/zen/go/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "kimi-k2.5",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that writes professional cover letters.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenCode API error:", errorData);
      return c.json(
        { error: "Failed to generate cover letter" },
        500
      );
    }

    const data = await response.json();
    const coverLetter = data.choices[0]?.message?.content;

    if (!coverLetter) {
      return c.json(
        { error: "No cover letter generated" },
        500
      );
    }

    return c.json({ coverLetter });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return c.json(
      { error: "Internal server error" },
      500
    );
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Hono server running on port ${port}`);
