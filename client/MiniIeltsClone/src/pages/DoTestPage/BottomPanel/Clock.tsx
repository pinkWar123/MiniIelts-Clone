import { FunctionComponent, useEffect } from "react";
import styles from "./BottomPanel.module.scss";
import { TestTime } from "./BottomPanel";
interface ClockProps {
  time: TestTime;
  setTime: React.Dispatch<React.SetStateAction<TestTime>>;
}

const Clock: FunctionComponent<ClockProps> = ({ time, setTime }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const newTime: TestTime = { ...prev };
        if (prev.second < 59) newTime.second += 1;
        else if (prev.second === 59) {
          prev.second = 0;
          prev.minute += 1;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time, setTime]);

  return (
    <div className={styles["clock"]}>
      <div className={styles["text"]}>
        {time.minute} : {time.second}
      </div>
    </div>
  );
};

export default Clock;
