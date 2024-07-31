import { FunctionComponent } from "react";
import { IExercise } from "../../../types/Model/Exercise";
import TFNG from "./TFNG";
import { QuestionTypeEnum } from "../../../contants/questionType";
import SummaryCompletion from "./SummaryCompletion";
import { TestBase } from "./base";
import MatchingHeading from "./MatchingHeadings";

interface TestProps {
  exercises: IExercise[];
  showAnswer?: boolean;
}

const Test: FunctionComponent<TestProps> = ({ exercises, showAnswer }) => {
  const renderExercise = (exercise: IExercise, index: number) => {
    const { startQuestion, endQuestion, questions, content } = exercise;
    const props: TestBase = {
      startQuestion,
      endQuestion,
      questions,
      content,
      showAnswer,
    };
    switch (exercise.exerciseType) {
      case QuestionTypeEnum.TFNG:
        return <TFNG {...props} key={`TFNG-${index}`} />;
      case QuestionTypeEnum.SummaryCompletion:
        return (
          <SummaryCompletion {...props} key={`SummaryCompletion-${index}`} />
        );
      case QuestionTypeEnum.MatchingHeadings:
        return <MatchingHeading {...props} />;
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
