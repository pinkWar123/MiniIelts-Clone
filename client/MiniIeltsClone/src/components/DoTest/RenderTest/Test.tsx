import { FunctionComponent } from "react";
import { IExercise } from "../../../types/Model/Exercise";
import TFNG from "./TFNG";
import { QuestionTypeEnum } from "../../../contants/questionType";
import SummaryCompletion from "./SummaryCompletion";
import { TestBase } from "./base";
import MatchingHeading from "./MatchingHeadings";
import ChooseMany from "./ChooseMany";
import { Typography } from "antd";
import MatchingInformation from "./MatchingInformation";
import YNNG from "./YNNG";
import Labelling from "./Labelling";
import ChooseOne from "./ChooseOne";

interface TestProps {
  exercises: IExercise[];
  showAnswer?: boolean;
}

const Test: FunctionComponent<TestProps> = ({ exercises, showAnswer }) => {
  const renderExercises = (exercise: IExercise, index: number) => {
    const { startQuestion, endQuestion, questions, content, description } =
      exercise;
    const props: TestBase = {
      startQuestion,
      endQuestion,
      questions,
      content,
      description,
      showAnswer,
    };
    const renderExercise = () => {
      switch (exercise.exerciseType) {
        case QuestionTypeEnum.TFNG:
          return <TFNG {...props} key={`TFNG-${index}`} />;
        case QuestionTypeEnum.SummaryCompletion:
          return (
            <SummaryCompletion {...props} key={`SummaryCompletion-${index}`} />
          );
        case QuestionTypeEnum.MatchingHeadings:
          return (
            <MatchingHeading {...props} key={`MatchingHeading-${index}`} />
          );
        case QuestionTypeEnum.YNNG:
          return <YNNG {...props} key={`YNNG-${index}`} />;
        case QuestionTypeEnum.MultipleChoice:
          if (
            !exercise.chooseManyChoices ||
            exercise.chooseManyChoices.length === 0
          )
            return <ChooseOne {...props} key={`ChooseOne-${index}`} />;
          return (
            <ChooseMany
              {...props}
              key={`ChooseMany-${index}`}
              chooseManyChoices={exercise.chooseManyChoices}
            />
          );
        case QuestionTypeEnum.MatchingInformation:
          return (
            <MatchingInformation
              {...props}
              key={`Matching Information-${index}`}
            />
          );
        case QuestionTypeEnum.Labelling:
          return <Labelling {...props} key={`Labelling diagram-${index}`} />;
        default:
          return <></>;
      }
    };
    return (
      <>
        <Typography.Title level={3}>
          Question {startQuestion} - {endQuestion}
        </Typography.Title>
        {renderExercise()}
      </>
    );
  };
  return (
    <div style={{ paddingBottom: "150px" }}>
      {exercises?.map((exercise, index) => renderExercises(exercise, index))}
    </div>
  );
};

export default Test;
