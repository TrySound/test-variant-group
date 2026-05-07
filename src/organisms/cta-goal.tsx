import { Icon } from "../atoms/icon";
import { Progress } from "../atoms/progress";

export interface CtaGoalProps {
  current: number;
  total: number;
  onCreateNew?: () => void;
}

export const CtaGoal = ({ current, total, onCreateNew }: CtaGoalProps) => {
  return (
    <section className="cta" aria-label="Create more applications">
      <div className="cta-content">
        <h2 className="text-heading-2">Hit your goal</h2>
        <p>
          Generate and send out couple more job applications today to get hired
          faster
        </p>
        <button
          className="button button--primary button--lg"
          onClick={onCreateNew}
        >
          <Icon name="plus" size="lg" />
          Create new
        </button>
      </div>
      <div className="cta-content">
        <Progress current={current} total={total} variant="dashes" />
        <p>
          {current} out of {total}
        </p>
      </div>
    </section>
  );
};
