import type { Meta, StoryObj } from "@storybook/react";
import { AppHeader as AppHeaderComponent } from "./app-header";

const meta = {
  title: "Organisms/App Header",
  component: AppHeaderComponent,
} satisfies Meta<typeof AppHeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppHeader: Story = {
  args: { currentApplications: 3, totalApplications: 5 },
  render: () => (
    <div style={{ display: "grid", gap: "24px" }}>
      <div>
        <AppHeaderComponent currentApplications={3} totalApplications={5} />
      </div>
      <div>
        <AppHeaderComponent currentApplications={1} totalApplications={3} />
      </div>
      <div>
        <AppHeaderComponent currentApplications={5} totalApplications={5} />
      </div>
    </div>
  ),
};
