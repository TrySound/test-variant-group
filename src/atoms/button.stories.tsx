import { Icon } from "./icon";

export default {
  title: "Atoms/Button",
  parameters: {
    layout: "centered",
  },
};

export const Button = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
    {/* Ghost (default) */}
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="button">
        <Icon name="trash" />
        Delete
      </button>

      <button className="button">
        Copy to clipboard
        <Icon name="copy" />
      </button>

      <button className="button" disabled>
        <Icon name="trash" />
        Delete
      </button>
    </div>

    {/* Icon-only */}
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="button button--outline button--icon" aria-label="Home">
        <Icon name="home" />
      </button>

      <button className="button button--primary button--icon" aria-label="Home">
        <Icon name="home" />
      </button>

      <button
        className="button button--outline button--icon"
        aria-disabled="true"
        aria-label="Home"
      >
        <Icon name="home" />
      </button>
      <button
        className="button button--primary button--icon"
        aria-label="Home"
        aria-disabled="true"
      >
        <Icon name="home" />
      </button>
    </div>

    {/* Primary */}
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="button button--primary">
        <Icon name="plus" />
        Create New
      </button>

      <button className="button button--primary" aria-disabled="true">
        <Icon name="plus" />
        Create New
      </button>
    </div>

    {/* Outline */}
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="button button--outline">
        <Icon name="plus" />
        Create New
      </button>

      <button className="button button--outline" aria-disabled="true">
        <Icon name="plus" />
        Create New
      </button>
    </div>

    {/* Large */}
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="button button--primary button--lg">
        <Icon name="plus" />
        Create New
      </button>

      <button className="button button--primary button--lg" disabled>
        <Icon name="plus" />
        Create New
      </button>
    </div>
  </div>
);
