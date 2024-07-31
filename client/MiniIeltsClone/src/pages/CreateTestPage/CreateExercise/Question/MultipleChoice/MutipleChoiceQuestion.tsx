import { Form } from "antd";
import { FunctionComponent } from "react";
import QuestionContent from "../QuestionContent";

interface MultipleChoiceQuestionProps {
  questionOrder: number;
  choices: React.ReactElement;
  exerciseOrder: number;
}

const MultipleChoiceQuestion: FunctionComponent<
  MultipleChoiceQuestionProps
> = ({ choices, questionOrder, exerciseOrder }) => {
  return (
    <>
      <div>
        <Form.Item label={<>{questionOrder}</>}>
          <QuestionContent
            exerciseOrder={exerciseOrder}
            questionOrder={questionOrder}
          />
        </Form.Item>
      </div>
      {choices}
    </>
  );
};

export default MultipleChoiceQuestion;
