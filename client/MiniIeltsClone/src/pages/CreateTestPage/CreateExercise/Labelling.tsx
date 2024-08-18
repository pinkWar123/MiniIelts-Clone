import { FunctionComponent } from "react";
import { IExerciseProps } from "./exerciseProps";
import ExerciseDivider from "../../../components/create-test/ExerciseDivider";
import { convertQuestionTypeEnumToDescription } from "../../../helpers/convertQuestionType";
import { QuestionTypeEnum } from "../../../contants/questionType";

interface LabellingProps extends IExerciseProps {}

const Labelling: FunctionComponent<LabellingProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  return (
    <>
      <ExerciseDivider
        exerciseName={convertQuestionTypeEnumToDescription(
          QuestionTypeEnum.Labelling
        )}
        exerciseOrder={exerciseOrder}
      />
    </>
  );
};

export default Labelling;
