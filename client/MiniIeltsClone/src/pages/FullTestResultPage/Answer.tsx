import { Space } from "antd";
import { FunctionComponent } from "react";
import styles from "./FullTestResultPage.module.scss";
import { CheckOutlined, XOutlined } from "@ant-design/icons";
interface AnswerProps {
  order: number;
  value: string;
  userAnswer?: string;
  showUserAnswer?: boolean;
}

const Answer: FunctionComponent<AnswerProps> = ({
  order,
  value,
  userAnswer,
  showUserAnswer,
}) => {
  return (
    <Space>
      <div className={styles["number"]}>{order}</div>{" "}
      <div className={styles["answer-text"]}>{value}</div>
      {showUserAnswer &&
        (userAnswer === value ? (
          <span style={{ marginLeft: "12px", color: "green" }}>
            <CheckOutlined /> {userAnswer}
          </span>
        ) : (
          <span style={{ marginLeft: "12px", color: "red" }}>
            <XOutlined /> {userAnswer}
          </span>
        ))}
    </Space>
  );
};

export default Answer;
