import { FunctionComponent } from "react";
import styles from "./CorrectAnswer.module.scss";
import Answer from "../../Answer/Answer";
interface SelectAnswerProps {
  order: number;
  answer: string;
}

const SelectAnswer: FunctionComponent<SelectAnswerProps> = ({
  order,
  answer,
}) => {
  return (
    <div className={styles["answer"]} key={`answer-${order}`}>
      <Answer answer={answer} />
    </div>
  );
};

export default SelectAnswer;
