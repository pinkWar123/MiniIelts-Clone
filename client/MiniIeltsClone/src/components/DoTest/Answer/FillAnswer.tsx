import { Input } from "antd";
import { FunctionComponent } from "react";
import styles from "./CorrectAnswer.module.scss";
import { CheckOutlined, XOutlined } from "@ant-design/icons";

interface CorrectAnswerProps {
  clientAnswer?: string;
  rightAnswer: string;
}

const CorrectAnswer: FunctionComponent<CorrectAnswerProps> = ({
  clientAnswer,
  rightAnswer,
}) => {
  const isAnswerFalse = !clientAnswer || clientAnswer !== rightAnswer;

  return (
    <>
      <Input value={clientAnswer} disabled />
      <div className={isAnswerFalse ? styles["false"] : styles["true"]}>
        {isAnswerFalse ? <XOutlined /> : <CheckOutlined />} Answer:{" "}
        {rightAnswer}
      </div>
    </>
  );
};

export default CorrectAnswer;
