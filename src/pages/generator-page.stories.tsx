import { Icon } from "../atoms/icon";
import { AppHeader } from "../organisms/app-header";
import { CtaGoal } from "../organisms/cta-goal";

const generatedCoverLetter = `Dear Apple Team,

I am writing to express my interest in the Product Manager position.

My experience in the realm combined with my skills in HTML, CSS and doing things in time make me a strong candidate for this role

I want to help you build awesome solutions to accomplish your goals and vision. I can create intuitive and aesthetically pleasing devices that are very easy to use.

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`;

export default {
  title: "Pages/Generator Page",
  parameters: {
    layout: "fullscreen",
  },
};

const MAX_APPLICATIONS = 5;

export const EmptyState = {
  render: () => (
    <div className="generator-page">
      <AppHeader currentApplications={3} totalApplications={MAX_APPLICATIONS} />
      <div className="generator-layout">
        {/* Left column - Form */}
        <div className="generator-form">
          <div
            className="page-header"
            style={{ border: "none", paddingBottom: 0, marginBottom: "32px" }}
          >
            <h1
              className="page-header-title text-heading-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              New application
            </h1>
          </div>

          <form className="form-stack">
            <div className="form-row">
              <div className="form-group">
                <label className="label">Job title</label>
                <input
                  type="text"
                  className="field"
                  placeholder="Product manager"
                />
              </div>
              <div className="form-group">
                <label className="label">Company</label>
                <input type="text" className="field" placeholder="Apple" />
              </div>
            </div>

            <div className="form-group">
              <label className="label">I am good at...</label>
              <input
                type="text"
                className="field"
                placeholder="HTML, CSS and doing things in time"
              />
            </div>

            <div className="form-group">
              <label className="label">Additional details</label>
              <textarea
                className="field field--multiline field--large"
                placeholder="Describe why you are a great fit or paste your bio"
              />
              <div className="character-counter">0/1200</div>
            </div>

            <button
              type="submit"
              className="button button--primary button--lg"
              disabled
            >
              Generate Now
            </button>
          </form>
        </div>

        {/* Right column - Preview */}
        <div className="generator-preview">
          <div className="card" style={{ minHeight: "600px" }}>
            <div className="generator-preview-placeholder">
              Your personalized job application will appear here...
            </div>
            <div className="card-actions" style={{ marginTop: "auto" }}>
              <span></span>
              <button className="button">
                Copy to clipboard
                <Icon name="copy" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const GeneratedState = {
  render: () => (
    <div className="generator-page">
      <AppHeader currentApplications={4} totalApplications={MAX_APPLICATIONS} />
      <div className="generator-layout">
        {/* Left column - Form */}
        <div className="generator-form">
          <div
            className="page-header"
            style={{ border: "none", paddingBottom: 0, marginBottom: "32px" }}
          >
            <h1 className="page-header-title text-heading-1">
              Product manager, Apple
            </h1>
          </div>

          <form className="form-stack">
            <div className="form-row">
              <div className="form-group">
                <label className="label">Job title</label>
                <input
                  type="text"
                  className="field"
                  value="Product manager"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="label">Company</label>
                <input type="text" className="field" value="Apple" readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="label">I am good at...</label>
              <input
                type="text"
                className="field"
                value="HTML, CSS and doing things in time"
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="label">Additional details</label>
              <textarea
                className="field field--multiline field--large"
                value="I want to help you build awesome solutions to accomplish your goals and vision. I can create intuitive and aesthetically pleasing devices that are very easy to use."
                readOnly
              />
              <div className="character-counter">0/1200</div>
            </div>

            <button type="button" className="button button--outline button--lg">
              <Icon name="refresh" />
              Try Again
            </button>
          </form>
        </div>

        {/* Right column - Preview */}
        <div className="generator-preview">
          <div className="card" style={{ minHeight: "600px" }}>
            <div className="card-content">{generatedCoverLetter}</div>
            <div className="card-actions" style={{ marginTop: "auto" }}>
              <span></span>
              <button className="button">
                Copy to clipboard
                <Icon name="copy" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "48px" }}>
        <CtaGoal current={3} total={MAX_APPLICATIONS} />
      </div>
    </div>
  ),
};
