import { FunctionComponent } from "react";
import useTest from "../../hooks/useTest";
import { QuestionTypeEnum } from "../../contants/questionType";
import TFNG from "./CreateExercise/TFNG";
import YNNG from "./CreateExercise/YNNG";
import ABC from "./CreateExercise/ABC";
import MatchingHeading from "./CreateExercise/MatchingHeading";
import MultipleChoice from "./CreateExercise/MultipleChoice/MultipleChoice";
import SentenceCompletion from "./CreateExercise/Completion/SentenceCompletion";
import SummaryCompletion from "./CreateExercise/Completion/SummaryCompletion/SummayCompletion";

interface ExerciseListProps {}

const ExerciseList: FunctionComponent<ExerciseListProps> = () => {
  const { test } = useTest();
  return (
    <>
      {test?.exercises?.map((exercise) => {
        const props = {
          startQuestion: exercise.startQuestion,
          endQuestion: exercise.endQuestion,
          exerciseOrder: exercise.order,
        };
        if (exercise.exerciseType === QuestionTypeEnum.TFNG)
          return <TFNG {...props} key={exercise.order} />;
        else if (exercise.exerciseType === QuestionTypeEnum.YNNG)
          return <YNNG {...props} key={exercise.order} />;
        else if (exercise.exerciseType === QuestionTypeEnum.MatchingInformation)
          return <ABC {...props} key={exercise.order} />;
        else if (exercise.exerciseType === QuestionTypeEnum.MatchingHeadings)
          return <MatchingHeading {...props} key={exercise.order} />;
        else if (exercise.exerciseType === QuestionTypeEnum.MultipleChoice)
          return <MultipleChoice {...props} />;
        else if (exercise.exerciseType === QuestionTypeEnum.SentenceCompletion)
          return <SentenceCompletion {...props} key={exercise.order} />;
        else if (exercise.exerciseType === QuestionTypeEnum.SummaryCompletion)
          return <SummaryCompletion {...props} key={exercise.order} />;
      })}
    </>
  );
};

export default ExerciseList;
