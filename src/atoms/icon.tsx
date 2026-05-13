import styles from "./icon.module.css";

export interface IconProps {
  name: "home" | "trash" | "copy" | "plus" | "check" | "refresh" | "spinner";
  size?: "sm" | "md" | "lg";
}

export const Icon = ({ name, size = "md" }: IconProps) => {
  let width = 20;
  if (size === "sm") {
    width = 16;
  }
  if (size === "lg") {
    width = 24;
  }
  const className = name === "spinner" ? styles.spinner : undefined;
  return (
    <svg width={width} height={width} className={className} aria-hidden="true">
      <use href={`/icon.svg#icon-${name}`} />
    </svg>
  );
};
