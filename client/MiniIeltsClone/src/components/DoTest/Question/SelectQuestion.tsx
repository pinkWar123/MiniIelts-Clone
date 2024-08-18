import { Flex, Form, Select, Typography } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import useAnswers from "../../../hooks/useAnswers";
import { IDoTestAnswer } from "../../../types/Model/Answer";

interface SelectQuestionProps {
  order: number;
  options: {
    label: string;
    value: string;
  }[];
  content: string;
}

const SelectQuestion: FunctionComponent<SelectQuestionProps> = ({
  order,
  options,
  content,
}) => {
  const { getAnswerByOrder, handleUpdateAnswer } = useAnswers();
  const [defaultValue, setDefautValue] = useState<IDoTestAnswer>();
  useEffect(() => {
    setDefautValue(getAnswerByOrder(order));
  }, [order]);
  return (
    <Flex gap="small">
      <strong>{order}</strong>
      <Form.Item key={`select-${content}`}>
        <Select
          id={order.toString()}
          options={options}
          style={{ width: "120px" }}
          disabled={defaultValue !== undefined && defaultValue.value !== ""}
          value={getAnswerByOrder(order)}
          onChange={(item) => handleUpdateAnswer(order, item)}
        />
      </Form.Item>
      <Form.Item key={"content"}>{content}</Form.Item>
    </Flex>
  );
};

export default SelectQuestion;
