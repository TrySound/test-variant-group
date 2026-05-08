import { useState } from "react";
import {
  useLoaderData,
  useFetcher,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { Icon } from "../atoms/icon";
import { CtaGoal } from "../organisms/cta-goal";
import {
  getCoverLetter,
  getCoverLetters,
  saveCoverLetter,
  updateCoverLetterUserData,
  updateCoverLetterResult,
  type CoverLetter,
} from "../lib/cover-letters-storage";
import { generateCoverLetter } from "../lib/api";
import { MAX_APPLICATIONS } from "./layout";

const MAX_DETAILS_LENGTH = 1200;

export function generatorLoader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    const letter = getCoverLetter(params.id);
    const letters = getCoverLetters();
    return { letter, letters };
  }
  return { letter: null, letters: [] };
}

export async function generatorAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const userData = {
    jobTitle: formData.get("jobTitle")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    skills: formData.get("skills")?.toString() ?? "",
    details: formData.get("details")?.toString() ?? "",
  };

  const existingId = params.id;

  // update user input immediately
  let newLetter: ReturnType<typeof saveCoverLetter> | null = null;

  if (existingId) {
    updateCoverLetterUserData(existingId, userData);
  } else {
    // Create new with placeholder
    newLetter = saveCoverLetter(userData);
  }

  try {
    const result = await generateCoverLetter({
      jobTitle: userData.jobTitle,
      companyName: userData.company,
      jobDescription:
        userData.details || "No specific job description provided.",
      userBackground: userData.skills,
      tone: "professional",
    });

    const generatedText = result.coverLetter;

    const letterId = existingId ?? newLetter?.id;
    if (letterId) {
      updateCoverLetterResult(letterId, { generatedText });
    }

    // redirect to saved application
    if (newLetter) {
      return redirect(`/generator/${newLetter.id}`);
    }

    return {
      generatedText,
    };
  } catch (error) {
    console.error("Failed to generate cover letter:", error);
    return {
      generatedText:
        "Error: Failed to generate cover letter. Please try again.",
    };
  }
}

const GeneratorForm = ({
  fetcher,
  letter,
}: {
  fetcher: ReturnType<typeof useFetcher<typeof generatorAction>>;
  letter: undefined | CoverLetter;
}) => {
  const isGenerating = fetcher.state === "submitting";

  const [jobTitle, setJobTitle] = useState(letter?.jobTitle ?? "");
  const [details, setDetails] = useState(letter?.details ?? "");
  const generatedText =
    fetcher.data?.generatedText ?? letter?.generatedText ?? "";
  const isDetailsValid = details.length <= MAX_DETAILS_LENGTH;
  return (
    <section className="generator-form" aria-label="Application form">
      <div
        className="page-header"
        style={{ border: "none", paddingBottom: 0, marginBottom: "32px" }}
      >
        <h1
          className="page-header-title text-heading-1"
          style={{
            color: letter
              ? "var(--color-text-primary)"
              : "var(--color-text-muted)",
          }}
        >
          {letter ? `${letter.jobTitle}, ${letter.company}` : "New application"}
        </h1>
      </div>

      {/* reset the form when navigating from existing form to empty one */}
      <fetcher.Form
        method="post"
        className="form-stack"
        key={letter?.id ?? "empty"}
      >
        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="jobTitle">
              Job title
            </label>
            <input
              id="jobTitle"
              type="text"
              className="field"
              placeholder="Product manager"
              required
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="company">
              Company
            </label>
            <input
              id="company"
              type="text"
              className="field"
              placeholder="Apple"
              required
              name="company"
              defaultValue={letter?.company ?? ""}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="skills">
            I am good at...
          </label>
          <input
            id="skills"
            type="text"
            className="field"
            placeholder="HTML, CSS and doing things in time"
            required
            name="skills"
            defaultValue={letter?.skills ?? ""}
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="details">
            Additional details
          </label>
          <textarea
            id="details"
            className="field field--multiline field--large"
            placeholder="Describe why you are a great fit or paste your bio"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            maxLength={MAX_DETAILS_LENGTH}
          />
          <div
            className="character-counter"
            data-state={!isDetailsValid ? "invalid" : undefined}
          >
            {details.length}/{MAX_DETAILS_LENGTH}
          </div>
        </div>

        {!generatedText ? (
          <button className="button button--primary button--lg">
            {isGenerating ? (
              <>
                {/* unbreakable space preserves the height of button content
                      to avoid slight jump when loader appears and hides */}
                &nbsp;
                <Icon name="spinner" className="icon--spinner" />
                &nbsp;
              </>
            ) : (
              "Generate Now"
            )}
          </button>
        ) : (
          <button className="button button--outline button--lg">
            {isGenerating ? (
              <>
                &nbsp;
                <Icon name="spinner" className="icon--spinner" />
                &nbsp;
              </>
            ) : (
              <>
                <Icon name="refresh" />
                Try Again
              </>
            )}
          </button>
        )}
      </fetcher.Form>
    </section>
  );
};

export function Generator() {
  const { letter, letters } = useLoaderData<typeof generatorLoader>();
  const fetcher = useFetcher<typeof generatorAction>();

  const generatedText =
    fetcher.data?.generatedText ?? letter?.generatedText ?? "";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="generator-page">
      <div className="generator-layout">
        <GeneratorForm fetcher={fetcher} letter={letter ?? undefined} />

        <section
          className="card generator-preview"
          aria-label="Preview personalized job application"
        >
          <div className="card-content">
            {generatedText ||
              "Your personalized job application will appear here..."}
          </div>
          <div className="card-actions">
            <span>{/* fill left space */}</span>
            <button
              className="button"
              onClick={handleCopy}
              disabled={!generatedText}
            >
              {isCopied ? (
                <>
                  Copied!
                  <Icon name="check" />
                </>
              ) : (
                <>
                  Copy to clipboard
                  <Icon name="copy" />
                </>
              )}
            </button>
          </div>
        </section>
      </div>

      {letter && letters.length < MAX_APPLICATIONS && (
        <CtaGoal current={letters.length} total={MAX_APPLICATIONS} />
      )}
    </main>
  );
}
