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
    variant === "dashes" ? "progress progress--dashes" : "progress";
  return (
    <div className={progressClass}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={
            index < current
              ? "progress-item progress-item--active"
              : "progress-item"
          }
        />
      ))}
    </div>
  );
};
