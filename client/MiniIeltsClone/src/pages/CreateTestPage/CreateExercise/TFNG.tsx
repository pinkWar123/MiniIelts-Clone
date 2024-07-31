import { FunctionComponent } from "react";

import Exercise from "./Exercise";
import { IExerciseProps } from "./exerciseProps";
import { QuestionTypeEnum } from "../../../contants/questionType";
import ExerciseDivider from "../../../components/create-test/ExerciseDivider";
import { convertQuestionTypeEnumToDescription } from "../../../helpers/convertQuestionType";
import { generateTFNGOptions } from "../../../helpers/generateQuestionOptions";

interface TFNGProps extends IExerciseProps {}

const TFNG: FunctionComponent<TFNGProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  return (
    <>
      <ExerciseDivider
        exerciseName={convertQuestionTypeEnumToDescription(
          QuestionTypeEnum.TFNG
        )}
        exerciseOrder={exerciseOrder}
      />
      <Exercise
        start={startQuestion}
        end={endQuestion}
        exerciseOrder={exerciseOrder}
        type="select"
        options={generateTFNGOptions()}
      />
    </>
  );
};

export default TFNG;
