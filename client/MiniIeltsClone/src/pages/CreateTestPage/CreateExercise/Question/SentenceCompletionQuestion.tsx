import { Form, Input } from "antd";
import React, { FunctionComponent, useEffect, useState } from "react";
import useTest from "../../../../hooks/useTest";
import { Blank } from "../../../../contants/sentenceCompletion";
import { IQuestion } from "../../../../types/Model/Question";

interface SentenceCompletionQuestionProps {
  questionOrder: number;
  exerciseOrder: number;
}

const getKey = (
  questionOrder: number,
  exerciseOrder: number,
  inputOrder: number
) => {
  return `sentenceCompletion-exercise${exerciseOrder}-question${questionOrder}-input${inputOrder}`;
};

const inputValues = [
  {
    label: "Front: ",
    key: 1,
  },
  {
    label: "Answer: ",
    key: 2,
  },
  {
    label: "End: ",
    key: 3,
  },
];

const SentenceCompletionQuestion: FunctionComponent<
  SentenceCompletionQuestionProps
> = ({ questionOrder, exerciseOrder }) => {
  const { handleUpdateQuestion, findQuestion } = useTest();
  const [inputs, setInputs] = useState<string[]>(["", "", ""]);
  const handleInputChange = (order: number, value: string) =>
    setInputs((prev) =>
      prev.map((item, index) => (index === order ? value : item))
    );

  useEffect(() => {
    const question = findQuestion(exerciseOrder, questionOrder);
    if (!question) return;
    const newQuestion: IQuestion = {
      ...question,
      answer: inputs[1],
      content: inputs[0] + Blank + inputs[2],
    };
    handleUpdateQuestion(newQuestion, exerciseOrder, questionOrder);
  }, [inputs]);
  return (
    <React.Fragment
      key={`sentenceCompletion-exercise${exerciseOrder}-question${questionOrder}`}
    >
      {questionOrder}.
      {inputValues.map((value, index) => (
        <Form.Item
          label={value.label}
          key={`form.item${getKey(questionOrder, exerciseOrder, index)}}`}
        >
          <Input
            key={getKey(questionOrder, exerciseOrder, index)}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </Form.Item>
      ))}
    </React.Fragment>
  );
};

export default SentenceCompletionQuestion;
