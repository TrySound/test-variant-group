import { Hono } from "hono";
import { generateText } from "ai";

export const generateCoverLetterApp = new Hono();

// Cover letter generation endpoint
generateCoverLetterApp.post(async (c) => {
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

    console.log("before generation");
    const { text } = await generateText({
      model: "openai/gpt-5.4-nano",
      system:
        "You are a helpful assistant that writes professional cover letters.",
      prompt,
    });
    console.log("after generation");

    return c.text(text);
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});
