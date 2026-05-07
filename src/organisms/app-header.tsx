import { Icon } from "../atoms/icon";
import { Progress } from "../atoms/progress";
import { SuccessIndicator } from "../atoms/success-indicator";

export interface AppHeaderProps {
  currentApplications: number;
  totalApplications: number;
}

export const AppHeader = ({
  currentApplications,
  totalApplications,
}: AppHeaderProps) => {
  const isComplete = currentApplications >= totalApplications;

  return (
    <header className="app-header">
      <img src="/logo.svg" alt="Alt+Shift" width="179" height="48" />
      <div className="app-header-toolbar">
        <div className="app-header-progress">
          <span>
            {currentApplications}/{totalApplications} applications generated
          </span>
          {isComplete ? (
            <SuccessIndicator />
          ) : (
            <Progress current={currentApplications} total={totalApplications} />
          )}
        </div>
        <a href="/" className="button button--icon" aria-label="Home">
          <Icon name="home" />
        </a>
      </div>
    </header>
  );
};
