import { FunctionComponent } from "react";
import styles from "./Circle.module.scss";
interface CircleProps {
  order?: number;
  className?: string;
}

const Circle: FunctionComponent<CircleProps> = ({ order, className }) => {
  return (
    <div className={`${styles["circle-wrapper"]} ${className}`}>
      {order ?? ""}
    </div>
  );
};

export default Circle;
