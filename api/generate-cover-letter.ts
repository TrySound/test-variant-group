import { generateText } from "ai";
import * as v from "valibot";

export const coverLetterRequestSchema = v.object({
  jobTitle: v.pipe(
    v.string("Job title must be a string"),
    v.minLength(1, "Job title is required"),
    v.maxLength(200, "Job title must be 200 characters or less"),
  ),
  companyName: v.pipe(
    v.string("Company name must be a string"),
    v.minLength(1, "Job title is required"),
    v.maxLength(200, "Company name must be 200 characters or less"),
  ),
  jobDescription: v.pipe(
    v.string("Job description must be a string"),
    v.maxLength(5000, "Job description must be 5000 characters or less"),
  ),
  userBackground: v.pipe(
    v.string("User background must be a string"),
    v.maxLength(5000, "User background must be 5000 characters or less"),
  ),
});

export type CoverLetterRequest = v.InferInput<typeof coverLetterRequestSchema>;

export const generateCoverLetter = async (
  request: Request,
): Promise<Response> => {
  if (request.method !== "POST") {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  try {
    const body = await request.json();

    // Validate request body using Valibot
    const parseResult = v.safeParse(coverLetterRequestSchema, body);
    if (!parseResult.success) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { jobTitle, companyName, jobDescription, userBackground } =
      parseResult.output;

    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 },
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

    return new Response(text);
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
