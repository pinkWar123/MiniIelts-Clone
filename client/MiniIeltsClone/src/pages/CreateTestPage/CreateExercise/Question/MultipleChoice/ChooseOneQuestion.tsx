import { Flex, Input, Radio } from "antd";
import { FunctionComponent } from "react";
import MultipleChoiceQuestion from "./MutipleChoiceQuestion";
import useTest from "../../../../../hooks/useTest";
import { IQuestion } from "../../../../../types/Model/Question";

interface ChooseOneQuestionProps {
  choiceCount: number;
  questionOrder: number;
  exerciseOrder: number;
}

const ChooseOneQuestion: FunctionComponent<ChooseOneQuestionProps> = ({
  choiceCount,
  questionOrder,
  exerciseOrder,
}) => {
  const { handleUpdateChoice, handleUpdateQuestion, findQuestion } = useTest();
  const renderChoices = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: choiceCount }, (_, value) => {
      return (
        <div key={`chooseone-${questionOrder}-${value}`}>
          <Radio value={letters[value]}>
            <Flex gap={"small"}>
              {letters[value]}.{" "}
              <Input
                id={`chooseone-${questionOrder}-${value}`}
                onChange={(e) => {
                  handleUpdateChoice(exerciseOrder, questionOrder, value + 1, {
                    value: letters[value],
                    order: value + 1,
                    content: e.target.value,
                  });
                }}
              />
            </Flex>
          </Radio>
        </div>
      );
    });
  };
  const updateQuestion = (value: string) => {
    const question = findQuestion(exerciseOrder, questionOrder);
    if (!question) return;
    const newQuestion: IQuestion = { ...question, answer: value };
    handleUpdateQuestion(newQuestion, exerciseOrder, questionOrder);
  };
  return (
    <>
      <MultipleChoiceQuestion
        questionOrder={questionOrder}
        choices={
          <Radio.Group onChange={(e) => updateQuestion(e.target.value)}>
            {renderChoices()}
          </Radio.Group>
        }
        exerciseOrder={exerciseOrder}
      />
    </>
  );
};

export default ChooseOneQuestion;
