import { FunctionComponent } from "react";
import { IExerciseProps } from "../../exerciseProps";
import AnswerContent from "../../Question/AnswerContent";
import { Flex } from "antd";
import SummaryEditor from "./SummaryEditor";
import ExerciseDivider from "../../../../../components/create-test/ExerciseDivider";
import { QuestionTypeEnum } from "../../../../../contants/questionType";
import { convertQuestionTypeEnumToDescription } from "../../../../../helpers/convertQuestionType";

interface SummaryCompletionProps extends IExerciseProps {}

const SummaryCompletion: FunctionComponent<SummaryCompletionProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const renderAnswers = () => {
    return Array.from(
      { length: endQuestion - startQuestion + 1 },
      (_, index) => {
        const questionOrder = index + startQuestion;
        return (
          <Flex
            gap={"small"}
            key={`answer-content[${questionOrder}]`}
            style={{ marginTop: "20px" }}
          >
            {questionOrder}.
            <AnswerContent
              exerciseOrder={exerciseOrder}
              questionOrder={questionOrder}
              type="input"
            />
          </Flex>
        );
      }
    );
  };

  return (
    <>
      <ExerciseDivider
        exerciseName={convertQuestionTypeEnumToDescription(
          QuestionTypeEnum.SummaryCompletion
        )}
        exerciseOrder={exerciseOrder}
      />
      <SummaryEditor
        exerciseOrder={exerciseOrder}
        questionCount={endQuestion - startQuestion + 1}
      />
      {renderAnswers()}
    </>
  );
};

export default SummaryCompletion;
