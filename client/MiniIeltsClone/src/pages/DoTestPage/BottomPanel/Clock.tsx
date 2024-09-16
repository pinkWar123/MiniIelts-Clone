import { FunctionComponent, useEffect, useState } from "react";
import styles from "./BottomPanel.module.scss";
import useStartTest from "../../../hooks/useStartTest";
import { convertSecondsToMinuteAndSecond } from "../../../helpers/time";
interface ClockProps {}

const Clock: FunctionComponent<ClockProps> = () => {
  const [second, setSecond] = useState<number>(0);
  const { startTest } = useStartTest();
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((prev) => {
        if (!startTest) return prev;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTest]);

  return (
    <div className={styles["clock"]}>
      <div className={styles["text"]}>
        {convertSecondsToMinuteAndSecond(second)}
      </div>
    </div>
  );
};

export default Clock;
