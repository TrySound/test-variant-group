import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../atoms/icon";

const meta = {
  title: "Atoms/Card",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <div className="card">
        <div className="card-content">
          <p>This is a card component with a gray background.</p>
          <p>This is a card component with a gray background.</p>
        </div>
      </div>
      <div className="card">
        <div className="card-content card-content--collapsed">
          Dear Stripe team,{"\n"}
          {"\n"}I am a highly skilled product designer with a passion for
          creating intuitive, user-centered designs. I have a strong background
          in design systems and am excited about the opportunity to join the
          Stripe product design team and work on building out the design system
          for the platform.{"\n"}
          {"\n"}I am particularly drawn to Stripe's mission of making it easy
          for businesses to sell online and am confident that my experience in
          creating user-friendly designs will be an asset to the team. I have
          experience in conducting user research, creating wireframes, and
          prototyping interactive designs, as well as working closely with
          engineers to ensure that my designs are implemented correctly.{"\n"}
          {"\n"}I am a strong collaborator and have experience working in
          cross-functional teams to bring new products and features to market.
          I'm confident that I can help improve Stripe's user experience and
          make it even more accessible to businesses.{"\n"}
          {"\n"}I would love the opportunity to speak with you further about my
          qualifications and how I can contribute to the Stripe team. Thank you
          for considering my application.
        </div>
        <div className="card-actions">
          <button className="button">
            Delete
            <Icon name="trash" />
          </button>
          <button className="button">
            Copy to clipboard
            <Icon name="copy" />
          </button>
        </div>
      </div>
    </div>
  ),
};
