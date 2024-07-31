import { FunctionComponent } from "react";
import styles from "./BottomPanel.module.scss";
interface ClockProps {}

const Clock: FunctionComponent<ClockProps> = () => {
  return (
    <div className={styles["clock"]}>
      <div className={styles["text"]}>20:21</div>
    </div>
  );
};

export default Clock;
