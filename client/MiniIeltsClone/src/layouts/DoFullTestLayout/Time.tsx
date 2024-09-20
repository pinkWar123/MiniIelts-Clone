import { ClockCircleOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./DoFullTestLayout.module.scss";
import { convertSecondsToMinute } from "../../helpers/time";
interface TimeProps {}

const Time: FunctionComponent<TimeProps> = () => {
  const [time, setTime] = useState<number>(60 * 60);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <Space>
        {" "}
        <ClockCircleOutlined className={styles["clock-logo"]} />
        <span className={styles["minute"]}>
          {convertSecondsToMinute(time)}
        </span>{" "}
        minutes remaining
      </Space>
    </div>
  );
};

export default Time;
