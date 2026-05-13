import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../atoms/icon";

const meta = {
  title: "Organisms/Page Header",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageHeader: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "24px" }}>
      <div className="page-header">
        <h1 className="page-header-title text-heading-2">Applications</h1>
        <button className="button button--primary">
          <Icon name="plus" />
          Create New
        </button>
      </div>

      <div className="page-header">
        <h1 className="page-header-title text-heading-2">Cover Letters</h1>
        <button className="button button--primary">
          <Icon name="plus" />
          Create New
        </button>
      </div>

      <div className="page-header">
        <h1 className="page-header-title text-heading-2">Resumes</h1>
        <button className="button button--primary">
          <Icon name="plus" />
          Create New
        </button>
      </div>
    </div>
  ),
};
