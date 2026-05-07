import type { Meta, StoryObj } from "@storybook/react";
import { SuccessIndicator as SuccessIndicatorComponent } from "./success-indicator";

const meta = {
  title: "Atoms/Success Indicator",
  component: SuccessIndicatorComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SuccessIndicatorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessIndicator: Story = {};
