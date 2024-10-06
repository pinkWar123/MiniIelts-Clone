import { FunctionComponent } from "react";
import useTest from "../../../../../hooks/useTest";
import { Checkbox, Col, Flex, Input, Row } from "antd";
import MultipleChoiceQuestion from "./MutipleChoiceQuestion";
import { IQuestion } from "../../../../../types/Model/Question";

interface ChooseManyQuestionProps {
  choiceCount: number;
  questionOrder: number;
  exerciseOrder: number;
}

const ChooseManyQuestion: FunctionComponent<ChooseManyQuestionProps> = ({
  choiceCount,
  questionOrder,
  exerciseOrder,
}) => {
  const { handleUpdateChoice, handleUpdateQuestion, findQuestion } = useTest();
  const renderChoices = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: choiceCount }, (_, value) => {
      return (
        <div
          key={`choosemany-${questionOrder}-${value}`}
          style={{ width: "100%" }}
        >
          <Checkbox value={letters[value]} style={{ width: "500px" }}>
            <Flex gap={"small"}>
              <div style={{ alignContent: "center" }}>{letters[value]}. </div>
              <Input
                style={{ width: "500px" }}
                id={`choosemany-${questionOrder}-${value}`}
                onChange={(e) => {
                  handleUpdateChoice(exerciseOrder, questionOrder, value + 1, {
                    value: letters[value],
                    order: value + 1,
                    content: e.target.value,
                  });
                }}
              />
            </Flex>
          </Checkbox>
        </div>
      );
    });
  };
  const updateQuestion = (value: string[]) => {
    const question = findQuestion(exerciseOrder, questionOrder);
    if (!question) return;
    const newQuestion: IQuestion = { ...question, answer: value.join("") };
    handleUpdateQuestion(newQuestion, exerciseOrder, questionOrder);
  };
  return (
    <>
      <MultipleChoiceQuestion
        questionOrder={questionOrder}
        choices={
          <Checkbox.Group<string>
            onChange={(value: string[]) => updateQuestion(value)}
            value={findQuestion(exerciseOrder, questionOrder)?.answer.split("")}
          >
            <Row>
              <Col span={24}>{renderChoices()}</Col>
            </Row>
          </Checkbox.Group>
        }
        exerciseOrder={exerciseOrder}
      />
    </>
  );
};

export default ChooseManyQuestion;
