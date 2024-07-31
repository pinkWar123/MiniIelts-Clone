import { Input, Select } from "antd";
import { FunctionComponent } from "react";
import useTest from "../../../../hooks/useTest";
import { IQuestion } from "../../../../types/Model/Question";

interface QuestionContentProps {
  exerciseOrder: number;
  questionOrder: number;
  type: "select" | "input";
  options?: { value: string; label: string }[] | undefined;
}

const AnswerContent: FunctionComponent<QuestionContentProps> = ({
  exerciseOrder,
  questionOrder,
  type,
  options,
}) => {
  const { handleUpdateQuestion, test } = useTest();
  const onUpdateQuestion = (answer: string) => {
    if (!test?.exercises) return;
    const exercise = test.exercises?.find(
      (exercise) => exerciseOrder === exercise.order
    );
    if (!exercise) return;
    const oldQuestion = exercise.questions.find(
      (question) => question.order === questionOrder
    );
    const newQuestion = oldQuestion
      ? { ...oldQuestion, answer }
      : ({ answer } as IQuestion);
    handleUpdateQuestion(newQuestion, exerciseOrder, questionOrder);
  };
  return (
    <>
      {type === "input" && (
        <Input
          id={`a-${questionOrder}`}
          placeholder="Enter answer"
          onChange={(e) => onUpdateQuestion(e.target.value)}
        />
      )}
      {type === "select" && (
        <Select<string>
          id={`a-${questionOrder}`}
          options={options}
          onChange={(value) => {
            console.log("Answer: " + value);
            onUpdateQuestion(value);
          }}
        />
      )}
    </>
  );
};

export default AnswerContent;
