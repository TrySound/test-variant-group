import { generateText } from "ai";

export const generateCoverLetter = async (
  request: Request,
): Promise<Response> => {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Bad request" },
      {
        status: 400,
      },
    );
  }
  try {
    const body = await request.json();
    const { jobTitle, companyName, jobDescription, userBackground } = body;

    if (!jobTitle || !companyName || !jobDescription || !userBackground) {
      return Response.json(
        { error: "Missing required fields" },
        {
          status: 400,
        },
      );
    }

    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        {
          status: 500,
        },
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
    return Response.json(
      { error: "Internal server error" },
      {
        status: 500,
      },
    );
  }
};
