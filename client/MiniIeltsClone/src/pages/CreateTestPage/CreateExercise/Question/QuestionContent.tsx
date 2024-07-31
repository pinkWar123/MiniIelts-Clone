import { Input } from "antd";
import { FunctionComponent } from "react";
import useTest from "../../../../hooks/useTest";

interface QuestionContentProps {
  exerciseOrder: number;
  questionOrder: number;
}

const QuestionContent: FunctionComponent<QuestionContentProps> = ({
  exerciseOrder,
  questionOrder,
}) => {
  const { handleUpdateQuestion, findQuestion } = useTest();
  const onUpdateQuestion = (content: string) => {
    const question = findQuestion(exerciseOrder, questionOrder);
    if (!question) return;
    const newQuestion = { ...question, content: content };
    handleUpdateQuestion(newQuestion, exerciseOrder, questionOrder);
  };
  return (
    <>
      <Input
        id={`q-${questionOrder}`}
        placeholder="Enter question"
        onChange={(e) => onUpdateQuestion(e.target.value)}
      />
    </>
  );
};

export default QuestionContent;
