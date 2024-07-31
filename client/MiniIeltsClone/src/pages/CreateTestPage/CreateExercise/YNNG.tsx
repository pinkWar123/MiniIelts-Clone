import { FunctionComponent } from "react";

import Exercise from "./Exercise";
import { IExerciseProps } from "./exerciseProps";
import { QuestionTypeEnum } from "../../../contants/questionType";
import ExerciseDivider from "../../../components/create-test/ExerciseDivider";
import { convertQuestionTypeEnumToDescription } from "../../../helpers/convertQuestionType";

interface YNNGProps extends IExerciseProps {}

const options = ["YES", "NO", "NOT GIVEN"].map((option) => ({
  value: option,
  label: option,
}));

const YNNG: FunctionComponent<YNNGProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  return (
    <>
      <ExerciseDivider
        exerciseName={convertQuestionTypeEnumToDescription(
          QuestionTypeEnum.YNNG
        )}
        exerciseOrder={exerciseOrder}
      />
      <Exercise
        start={startQuestion}
        end={endQuestion}
        exerciseOrder={exerciseOrder}
        type="select"
        options={options}
      />
    </>
  );
};

export default YNNG;
