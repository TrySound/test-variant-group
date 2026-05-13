import { Icon } from "../atoms/icon";
import { AppHeader } from "../organisms/app-header";
import { CtaGoal } from "../organisms/cta-goal";
import styles from "./applications.module.css";

const preview = `Dear Stripe team,

I am a highly skilled product designer with a passion for creating intuitive, user-centered designs. I have a strong background in design systems and am excited about the opportunity to join the Stripe product design team and work on building out the design system for the platform.

I am particularly drawn to Stripe's mission of making it easy for businesses to sell online and am confident that my experience in creating user-friendly designs will be an asset to the team. I have experience in conducting user research, creating wireframes, and prototyping interactive designs, as well as working closely with engineers to ensure that my designs are implemented correctly.

I am a strong collaborator and have experience working in cross-functional teams to bring new products and features to market. I'm confident that I can help improve Stripe's user experience and make it even more accessible to businesses.

I would love the opportunity to speak with you further about my qualifications and how I can contribute to the Stripe team. Thank you for considering my application.`;

const sampleApplications = Array.from({ length: 6 }, (_, index) => ({
  id: (index + 1).toString(),
  preview,
}));

export default {
  title: "Pages/Applications Page",
  parameters: {
    layout: "fullscreen",
  },
};

const MAX_APPLICATIONS = 5;

export const ApplicationsPage = {
  render: () => (
    <div className="page">
      <AppHeader
        currentApplications={Math.min(
          sampleApplications.length,
          MAX_APPLICATIONS,
        )}
        totalApplications={MAX_APPLICATIONS}
      />
      <div className="page-header">
        <h1 className="page-header-title text-heading-1">Applications</h1>
        <button className="button button--primary">
          <Icon name="plus" />
          Create New
        </button>
      </div>
      <div className={styles.grid}>
        {sampleApplications.map((app) => (
          <div key={app.id} className="card">
            <div className="card-content card-content--collapsed">
              {app.preview}
            </div>
            <div className="card-actions">
              <button className="button">
                <Icon name="trash" />
                Delete
              </button>
              <button className="button">
                Copy to clipboard
                <Icon name="copy" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {sampleApplications.length < MAX_APPLICATIONS && (
        <CtaGoal current={sampleApplications.length} total={MAX_APPLICATIONS} />
      )}
    </div>
  ),
};
