import * as v from "valibot";

export const coverLetterSchema = v.object({
  id: v.pipe(
    v.string("ID must be a string"),
    v.uuid("ID must be a valid UUID"),
  ),
  jobTitle: v.pipe(
    v.string("Job title must be a string"),
    v.minLength(1, "Job title is required"),
  ),
  company: v.pipe(
    v.string("Company must be a string"),
    v.minLength(1, "Company is required"),
  ),
  skills: v.string("Skills must be a string"),
  details: v.string("Details must be a string"),
  generatedText: v.string("Generated text must be a string"),
  createdAt: v.number("Created at must be a number"),
});

export type CoverLetter = v.InferInput<typeof coverLetterSchema>;

export const coverLettersArraySchema = v.array(coverLetterSchema);

const STORAGE_KEY = "cover-letters";

export function getCoverLetters(): CoverLetter[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return v.parse(coverLettersArraySchema, JSON.parse(stored));
  } catch {
    return [];
  }
}

export function getCoverLetter(id: string): CoverLetter | null {
  const letters = getCoverLetters();
  return letters.find((letter) => letter.id === id) || null;
}

export function saveCoverLetter(
  data: Omit<CoverLetter, "id" | "generatedText" | "createdAt">,
): CoverLetter {
  const letters = getCoverLetters();
  const newLetter: CoverLetter = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    generatedText: "",
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...letters, newLetter]));
  return newLetter;
}

function updateCoverLetter(
  id: string,
  update: (existing: CoverLetter) => CoverLetter,
): CoverLetter | undefined {
  const letters = getCoverLetters();
  const existingLetter = letters.find((letter) => letter.id === id);
  if (!existingLetter) {
    return;
  }
  const updatedLetter: CoverLetter = {
    ...update(existingLetter),
    id,
  };
  const updatedLetters = letters.map((letter) =>
    letter.id === id ? updatedLetter : letter,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLetters));
  return updatedLetter;
}

export function updateCoverLetterUserData(
  id: string,
  data: Omit<CoverLetter, "id" | "generatedText" | "createdAt">,
): CoverLetter | undefined {
  return updateCoverLetter(id, (existingLetter) => ({
    ...data,
    id,
    createdAt: existingLetter.createdAt,
    generatedText: existingLetter.generatedText,
  }));
}

export function updateCoverLetterResult(
  id: string,
  data: { generatedText: string },
): CoverLetter | undefined {
  return updateCoverLetter(id, (existingLetter) => ({
    ...existingLetter,
    id,
    generatedText: data.generatedText,
  }));
}

export function deleteCoverLetter(id: string): void {
  const letters = getCoverLetters();
  const filtered = letters.filter((letter) => letter.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
