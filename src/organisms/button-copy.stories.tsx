import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonCopy as ButtonCopyComponent } from "./button-copy";

const meta = {
  title: "Organisms/Button Copy",
  component: ButtonCopyComponent,
} satisfies Meta<typeof ButtonCopyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const ButtonCopyStory = () => {
  const [text, setText] = useState(
    "Edit this text and click the button to copy it!",
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ padding: "12px", fontSize: "14px", resize: "vertical" }}
      />
      <ButtonCopyComponent text={text} />
      <ButtonCopyComponent text={undefined} />
    </div>
  );
};

export const ButtonCopy: Story = {
  args: { text: "" },
  render: () => <ButtonCopyStory />,
};
