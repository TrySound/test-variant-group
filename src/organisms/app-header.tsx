import { Link } from "react-router";
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
      <Link to="/" aria-label="Home">
        <img src="/logo.svg" alt="Alt+Shift" width="179" height="48" />
      </Link>
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
        <Link
          to="/"
          className="button button--outline button--icon"
          aria-label="Home"
        >
          <Icon name="home" />
        </Link>
      </div>
    </header>
  );
};
