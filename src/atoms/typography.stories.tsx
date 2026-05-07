export default {
  title: "Atoms/Typography",
  parameters: {
    layout: "centered",
  },
};

export const Typography = () => (
  <div style={{ maxWidth: "600px" }}>
    {/* Headings */}
    <h1 className="text-heading-1">Heading 1</h1>
    <h2 className="text-heading-2">Heading 2</h2>

    {/* Paragraphs */}
    <p>
      This is a paragraph with the default body text styling. It uses the Fixel
      Text font family with a font size of 18px and line height of 28px. The
      color is set to the secondary text color for comfortable reading.
    </p>
    <p>
      Another paragraph to demonstrate spacing and text flow. Typography is an
      essential part of any design system, ensuring consistency and readability
      across all user interfaces.
    </p>

    {/* Combined Example */}
    <h2 className="text-heading-2">Section Title</h2>
    <p>
      This demonstrates how headings and paragraphs work together in a typical
      content section. The heading uses the primary text color for emphasis,
      while the body text uses the secondary color for a harmonious visual
      hierarchy.
    </p>
  </div>
);
