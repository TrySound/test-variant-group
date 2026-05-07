import type { Meta, StoryObj } from "@storybook/react";
import { Progress as ProgressComponent } from "./progress";

const meta = {
  title: "Atoms/Progress",
  component: ProgressComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ProgressComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Progress: Story = {
  args: { current: 3, total: 5 },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
      }}
    >
      <ProgressComponent current={3} total={5} />
      <ProgressComponent current={1} total={3} />
      <ProgressComponent current={5} total={5} />
      <ProgressComponent current={0} total={5} />
      <ProgressComponent current={0} total={5} variant="dashes" />
      <ProgressComponent current={3} total={5} variant="dashes" />
      <ProgressComponent current={5} total={5} variant="dashes" />
    </div>
  ),
};
