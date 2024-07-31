import React, { FunctionComponent } from "react";
import { IExerciseProps } from "../exerciseProps";
import SentenceCompletionQuestion from "../Question/SentenceCompletionQuestion";
import ExerciseDivider from "../../../../components/create-test/ExerciseDivider";
import { QuestionTypeEnum } from "../../../../contants/questionType";
import { convertQuestionTypeEnumToDescription } from "../../../../helpers/convertQuestionType";

interface SentenceCompletionProps extends IExerciseProps {}

const SentenceCompletion: FunctionComponent<SentenceCompletionProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const renderQuestions = () => {
    return Array.from(
      { length: endQuestion - startQuestion + 1 },
      (_, index) => (
        <div style={{ marginTop: "20px" }}>
          <SentenceCompletionQuestion
            questionOrder={startQuestion + index}
            exerciseOrder={exerciseOrder}
          />
        </div>
      )
    );
  };
  return (
    <React.Fragment key={`setencecompletion-exercise${exerciseOrder}`}>
      <ExerciseDivider
        exerciseName={convertQuestionTypeEnumToDescription(
          QuestionTypeEnum.SentenceCompletion
        )}
        exerciseOrder={exerciseOrder}
      />
      {renderQuestions()}
    </React.Fragment>
  );
};

export default SentenceCompletion;
