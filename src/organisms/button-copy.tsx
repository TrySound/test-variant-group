import { useState } from "react";
import { Icon } from "../atoms/icon";

export const ButtonCopy = ({ text }: { text: undefined | string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (text && !isCopied) {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <button className="button" onClick={handleCopy} disabled={!text}>
      {isCopied ? (
        <>
          Copied! <Icon name="check" />
        </>
      ) : (
        <>
          Copy to clipboard <Icon name="copy" />
        </>
      )}
    </button>
  );
};
