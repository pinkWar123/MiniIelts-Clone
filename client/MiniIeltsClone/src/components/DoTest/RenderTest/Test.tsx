import { FunctionComponent } from "react";
import { IExercise } from "../../../types/Model/Exercise";
import TFNG from "./TFNG";
import { QuestionTypeEnum } from "../../../contants/questionType";
import SummaryCompletion from "./SummaryCompletion";

interface TestProps {
  exercises: IExercise[];
  showAnswer?: boolean;
}

const Test: FunctionComponent<TestProps> = ({ exercises, showAnswer }) => {
  const renderExercise = (exercise: IExercise, index: number) => {
    switch (exercise.exerciseType) {
      case QuestionTypeEnum.TFNG:
        return (
          <TFNG
            startQuestion={exercise.startQuestion}
            endQuestion={exercise.endQuestion}
            questions={exercise.questions}
            key={`TFNG-${index}`}
            showAnswer={showAnswer}
          />
        );
      case QuestionTypeEnum.SummaryCompletion:
        return (
          <SummaryCompletion
            startQuestion={exercise.startQuestion}
            endQuestion={exercise.endQuestion}
            questions={exercise.questions}
            content={exercise.content}
            key={`SummaryCompletion-${index}`}
            showAnswer={showAnswer}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <div style={{ paddingBottom: "150px" }}>
      {exercises?.map((exercise, index) => renderExercise(exercise, index))}
    </div>
  );
};

export default Test;
