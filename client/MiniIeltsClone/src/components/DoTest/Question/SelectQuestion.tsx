import { Flex, Form, Select } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import useAnswers from "../../../hooks/useAnswers";
import { IDoTestAnswer } from "../../../types/Model/Answer";
import styles from "./Question.module.scss";
import Answer from "../../Answer/Answer";
interface SelectQuestionProps {
  order: number;
  options: {
    label: string;
    value: string;
  }[];
  content: string;
  showAnswer?: boolean;
}

const SelectQuestion: FunctionComponent<SelectQuestionProps> = ({
  order,
  options,
  content,
  showAnswer,
}) => {
  const { getAnswerByOrder, handleUpdateAnswer } = useAnswers();
  const [defaultValue, setDefautValue] = useState<IDoTestAnswer>();
  useEffect(() => {
    setDefautValue(getAnswerByOrder(order));
  }, [order]);
  const renderSelectAnswer = (order: number) => {
    const answer = getAnswerByOrder(order);
    return (
      <Select
        className={styles["select"]}
        style={{ width: "120px" }}
        disabled
        key={order.toString()}
        value={answer?.value}
      />
    );
  };
  return (
    <>
      <Flex gap="small">
        <strong>{order}</strong>
        <Form.Item key={`select-${content}`}>
          {showAnswer ? (
            renderSelectAnswer(order)
          ) : (
            <Select
              id={order.toString()}
              options={options}
              style={{ width: "120px" }}
              disabled={defaultValue !== undefined && defaultValue.value !== ""}
              value={getAnswerByOrder(order)}
              onChange={(item) => handleUpdateAnswer(order, item)}
            />
          )}
        </Form.Item>
        <Form.Item key={"content"}>{content}</Form.Item>
      </Flex>
    </>
  );
};

export default SelectQuestion;
