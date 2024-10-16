import { ClockCircleOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { FunctionComponent, useEffect } from "react";
import styles from "./DoFullTestLayout.module.scss";
import { convertSecondsToMinute } from "../../helpers/time";
interface TimeProps {
  time: number;
  start: boolean;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  onTimeOut: () => Promise<void>;
}

const Time: FunctionComponent<TimeProps> = ({
  onTimeOut,
  time,
  setTime,
  start,
}) => {
  useEffect(() => {
    if (!start) return;
    if (time === 0) {
      onTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time, setTime, onTimeOut, start]);
  return (
    <div>
      {time >= 0 && (
        <Space>
          {" "}
          <ClockCircleOutlined className={styles["clock-logo"]} />
          <span className={styles["minute"]}>
            {convertSecondsToMinute(time)}
          </span>{" "}
          {time >= 60 ? "minutes" : "seconds"} remaining
        </Space>
      )}
    </div>
  );
};

export default Time;
