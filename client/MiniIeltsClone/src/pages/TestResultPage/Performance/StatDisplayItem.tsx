import { FunctionComponent } from "react";
import styles from "./Performance.module.scss";

interface StatDisplayItemProps {
  value: number | string;
  title: string;
  variant?: "green" | "orange" | "yellow";
}

const StatDisplayItem: FunctionComponent<StatDisplayItemProps> = ({
  value,
  title,
  variant,
}) => {
  return (
    <div
      className={`${styles["container"]} ${
        variant && styles[`border-${variant}`]
      }`}
    >
      <div className={styles["value"]}>{value}</div>
      <div className={styles["title"]}>{title}</div>
    </div>
  );
};

export default StatDisplayItem;
