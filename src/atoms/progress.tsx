import styles from "./progress.module.css";

export interface ProgressProps {
  current: number;
  total: number;
  variant?: "dots" | "dashes";
}

export const Progress = ({
  current,
  total,
  variant = "dots",
}: ProgressProps) => {
  const progressClass =
    variant === "dashes" ? `${styles.progress} ${styles.dashes}` : styles.progress;
  return (
    <div className={progressClass}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={
            index < current
              ? `${styles.item} ${styles.itemActive}`
              : styles.item
          }
        />
      ))}
    </div>
  );
};
