import { Icon } from "./icon";
import styles from "./success-indicator.module.css";

export const SuccessIndicator = () => {
  return (
    <div className={styles.indicator}>
      <Icon name="check" />
    </div>
  );
};
