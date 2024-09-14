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
  const handleFindChoiceContent = (index: number) => {
    const choices = findQuestion(exerciseOrder, questionOrder)?.choices;
    if (!choices || choices.length <= index) return undefined;
    return choices[index].content;
  };
  console.log(findQuestion(exerciseOrder, questionOrder)?.answer);
  const renderChoices = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: choiceCount }, (_, value) => {
      return (
        <div
          key={`chooseone-${questionOrder}-${value}`}
          style={{ margin: "12px 12px" }}
        >
          <Radio value={letters[value]}>
            <Flex gap={"small"} style={{ marginTop: "8px" }}>
              {letters[value]}.{" "}
              <Input
                id={`chooseone-${questionOrder}-${value}`}
                value={handleFindChoiceContent(value)}
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
          <Radio.Group
            onChange={(e) => updateQuestion(e.target.value)}
            value={findQuestion(exerciseOrder, questionOrder)?.answer}
          >
            {renderChoices()}
          </Radio.Group>
        }
        exerciseOrder={exerciseOrder}
      />
    </>
  );
};

export default ChooseOneQuestion;
