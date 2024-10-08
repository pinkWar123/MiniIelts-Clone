import { FunctionComponent, useState } from "react";
import { IExerciseProps } from "../exerciseProps";
import { Select } from "antd";
import {
  MultipleChoiceEnum,
  QuestionTypeDescriptionEnum,
} from "../../../../contants/questionType";
import ChooseOne from "./ChooseOne";
import ChooseMany from "./ChooseMany";
import CancelButton from "../../../../components/create-test/CancelButton";
import ExerciseDivider from "../../../../components/create-test/ExerciseDivider";
import useTest from "../../../../hooks/useTest";

interface MultipleChoiceProps extends IExerciseProps {}

const MultipleChoice: FunctionComponent<MultipleChoiceProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const { findExercise } = useTest();
  const isMultipleChoice = () => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return false;
    return exercise.chooseManyChoices && exercise.chooseManyChoices.length > 0;
  };
  const [type, setType] = useState<MultipleChoiceEnum>(
    isMultipleChoice()
      ? MultipleChoiceEnum.ChooseMany
      : MultipleChoiceEnum.ChooseOne
  );
  return (
    <>
      <ExerciseDivider
        exerciseName={QuestionTypeDescriptionEnum.MultipleChoice}
        exerciseOrder={exerciseOrder}
      />
      <Select
        options={[
          { value: MultipleChoiceEnum.ChooseOne, label: "Choose one" },
          { value: MultipleChoiceEnum.ChooseMany, label: "Choose many" },
        ]}
        value={type}
        onChange={(value) => setType(value)}
      />

      {type === MultipleChoiceEnum.ChooseOne && (
        <ChooseOne
          startQuestion={startQuestion}
          endQuestion={endQuestion}
          exerciseOrder={exerciseOrder}
        />
      )}
      {type === MultipleChoiceEnum.ChooseMany && (
        <ChooseMany
          startQuestion={startQuestion}
          endQuestion={endQuestion}
          exerciseOrder={exerciseOrder}
        />
      )}
      <div>
        <CancelButton exerciseOrder={exerciseOrder} />
      </div>
    </>
  );
};

export default MultipleChoice;
