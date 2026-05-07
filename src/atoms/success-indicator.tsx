import { Icon } from "./icon";

export interface SuccessIndicatorProps {
  className?: string;
}

export const SuccessIndicator = ({ className = "" }: SuccessIndicatorProps) => {
  return (
    <div className={`success-indicator ${className}`.trim()}>
      <Icon name="check" />
    </div>
  );
};
