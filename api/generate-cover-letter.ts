import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";
import { cors } from "hono/cors";
import { generateText } from "ai";

export const app = new Hono();

// CORS
app.use("/*", cors());

// Health check
app.get("/api/health", (c) => c.json({ status: "ok" }));

// Cover letter generation endpoint
app.post("/api/generate-cover-letter", async (c) => {
  try {
    const body = await c.req.json();
    const { jobTitle, companyName, jobDescription, userBackground } = body;

    if (!jobTitle || !companyName || !jobDescription || !userBackground) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      return c.json({ error: "API key not configured" }, 500);
    }

    const prompt = `
Write a cover letter for a ${jobTitle} position at ${companyName}.

Job Description:
${jobDescription}

My Background:
${userBackground}

Requirements:
- 3-4 paragraphs
- Professional tone but conversational
- Highlight relevant experience matching the job
- Show enthusiasm for the company/role
- No generic fluff, be specific where possible
- Output raw text
`;

    const { text } = await generateText({
      model: "openai/gpt-5.4-nano",
      system:
        "You are a helpful assistant that writes professional cover letters.",
      prompt,
    });

    return c.text(text);
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default handle(app);
