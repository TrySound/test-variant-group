export interface CoverLetter {
  id: string;
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
  generatedText: string;
  createdAt: number;
}

const STORAGE_KEY = "cover-letters";

export function getCoverLetters(): CoverLetter[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
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
