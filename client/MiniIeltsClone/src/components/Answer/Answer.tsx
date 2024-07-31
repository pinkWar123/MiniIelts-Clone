import { FunctionComponent } from "react";
import styles from "./Answer.module.scss";
interface AnswerProps {
  answer: string;
}

const Answer: FunctionComponent<AnswerProps> = ({ answer }) => {
  return <span className={styles["wrapper"]}>ANSWER: {answer}</span>;
};

export default Answer;
