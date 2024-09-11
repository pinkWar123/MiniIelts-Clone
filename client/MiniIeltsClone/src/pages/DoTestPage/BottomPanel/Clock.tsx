import { FunctionComponent } from "react";
import styles from "./BottomPanel.module.scss";
import useStartTest from "../../../hooks/useStartTest";
import { convertSecondsToMinuteAndSecond } from "../../../helpers/time";
interface ClockProps {}

const Clock: FunctionComponent<ClockProps> = () => {
  const { time } = useStartTest();

  return (
    <div className={styles["clock"]}>
      <div className={styles["text"]}>
        {convertSecondsToMinuteAndSecond(time.minute * 60 + time.second)}
      </div>
    </div>
  );
};

export default Clock;
