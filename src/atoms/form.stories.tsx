import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Form",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  render: () => (
    <div className="form-stack" style={{ width: "400px" }}>
      {/* Label */}
      <div className="form-group">
        <label className="label">Form Label</label>
        <input type="text" className="field" placeholder="Placeholder text" />
      </div>

      {/* Field states */}
      <div className="form-group">
        <input type="text" className="field" placeholder="Default field" />
        <input type="text" className="field" value="Filled field" readOnly />
        <input
          type="text"
          className="field"
          placeholder="Disabled field"
          disabled
        />
      </div>

      {/* Multiline field (textarea) */}
      <div className="form-group">
        <label className="label">Additional details</label>
        <textarea
          className="field field--multiline"
          placeholder="Describe why you are a great fit or paste your bio"
        />
        <div className="character-counter">0/1200</div>
      </div>

      <div className="form-group">
        <label className="label">Additional details</label>
        <textarea
          aria-invalid="true"
          className="field field--multiline"
          placeholder="Describe why you are a great fit or paste your bio"
        />
        <div className="character-counter" data-state="invalid">
          0/1200
        </div>
      </div>

      {/* Large multiline field */}
      <textarea
        className="field field--multiline field--large"
        placeholder="Large textarea"
      />

      {/* Form row */}
      <div className="form-row">
        <div className="form-group">
          <label className="label">Job title</label>
          <input type="text" className="field" placeholder="Product manager" />
        </div>
        <div className="form-group">
          <label className="label">Company</label>
          <input type="text" className="field" placeholder="Apple" />
        </div>
      </div>

      <button type="submit" className="button button--primary button--lg">
        Generate Now
      </button>
    </div>
  ),
};
