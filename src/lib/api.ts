export interface CoverLetterRequest {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  userBackground: string;
}

export interface ApiError {
  error: string;
}

export async function generateCoverLetter(data: CoverLetterRequest) {
  const response = await fetch("/api/generate-cover-letter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    console.info(errorData);
    throw new Error(errorData.error || "Failed to generate cover letter");
  }

  return response.text();
}
