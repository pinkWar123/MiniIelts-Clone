import { Space } from "antd";
import { FunctionComponent } from "react";
import styles from "./FullTestResultPage.module.scss";
interface AnswerProps {
  order: number;
  value: string;
}

const Answer: FunctionComponent<AnswerProps> = ({ order, value }) => {
  return (
    <Space>
      <div className={styles["number"]}>{order}</div>{" "}
      <div className={styles["answer-text"]}>{value}</div>
    </Space>
  );
};

export default Answer;
