import { Flex, Form, Select } from "antd";
import { FunctionComponent } from "react";
import useAnswers from "../../../hooks/useAnswers";
import styles from "./Question.module.scss";
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
    <div id={`question-${order}`}>
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
              value={getAnswerByOrder(order)}
              onChange={(item) => handleUpdateAnswer(order, item)}
            />
          )}
        </Form.Item>
        <Form.Item key={"content"}>{content}</Form.Item>
      </Flex>
    </div>
  );
};

export default SelectQuestion;
