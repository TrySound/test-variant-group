import type { Meta, StoryObj } from "@storybook/react";
import { Icon as IconComponent } from "./icon";

const meta = {
  title: "Atoms/Icon",
  component: IconComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: { name: "home" },
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="home" />
        <span>home</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="trash" />
        <span>trash</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="copy" />
        <span>copy</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="plus" />
        <span>plus</span>
      </div>
    </div>
  ),
};
