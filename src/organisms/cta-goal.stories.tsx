import type { Meta, StoryObj } from "@storybook/react";
import { CtaGoal as CtaGoalComponent } from "./cta-goal";

const meta = {
  title: "Organisms/CTA Goal",
  component: CtaGoalComponent,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CtaGoalComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CTAGoal: Story = {
  args: { current: 3, total: 5 },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CtaGoalComponent current={3} total={5} />
      <CtaGoalComponent current={1} total={3} />
      <CtaGoalComponent current={5} total={5} />
    </div>
  ),
};
