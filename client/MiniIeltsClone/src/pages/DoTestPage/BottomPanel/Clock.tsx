import { FunctionComponent } from "react";
import styles from "./BottomPanel.module.scss";
import useStartTest from "../../../hooks/useStartTest";
interface ClockProps {}

const Clock: FunctionComponent<ClockProps> = () => {
  const { time } = useStartTest();

  return (
    <div className={styles["clock"]}>
      <div className={styles["text"]}>
        {time.minute} : {time.second}
      </div>
    </div>
  );
};

export default Clock;
