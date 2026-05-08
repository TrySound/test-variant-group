import { Link } from "react-router";
import { Icon } from "../atoms/icon";
import { Progress } from "../atoms/progress";

export interface CtaGoalProps {
  current: number;
  total: number;
}

export const CtaGoal = ({ current, total }: CtaGoalProps) => {
  return (
    <section className="cta cta-success" aria-label="Create more applications">
      <div className="cta-content">
        <h2 className="text-heading-2">Hit your goal</h2>
        <p>
          Generate and send out couple more job applications today to get hired
          faster
        </p>
        <Link className="button button--primary button--lg" to="/generator">
          <Icon name="plus" size="lg" />
          Create new
        </Link>
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
