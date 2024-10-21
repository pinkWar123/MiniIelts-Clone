import { FunctionComponent } from "react";
import Circle from "../../../components/Circle/Circle";
import styles from "./BottomPanel.module.scss";
interface QuestionCircleProps {
  order: number;
  done: boolean;
}

const QuestionCircle: FunctionComponent<QuestionCircleProps> = ({
  order,
  done,
}) => {
  return (
    <a href={`#question-${order - 1}`}>
      <Circle
        order={order}
        className={`${styles["question-circle"]} ${done && styles["active"]}`}
      />
    </a>
  );
};

export default QuestionCircle;
