import { FunctionComponent, useState } from "react";

import Exercise from "./Exercise";
import TypedInputNumber from "antd/es/input-number";
import { Form } from "antd";
import { IExerciseProps } from "./exerciseProps";
import ExerciseDivider from "../../../components/create-test/ExerciseDivider";
import { QuestionTypeEnum } from "../../../contants/questionType";
import { convertQuestionTypeEnumToDescription } from "../../../helpers/convertQuestionType";

interface ABCProps extends IExerciseProps {}

const ABC: FunctionComponent<ABCProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const [numOfOptions, setNumOfQuestions] = useState<number>(0);
  const generateOptions = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array.from({ length: numOfOptions }, (_, index) => {
      return letters[index];
    }).map((value) => ({
      label: value,
      value: value,
    }));
  };
  const options = generateOptions();
  return (
    <>
      <ExerciseDivider
        exerciseName={convertQuestionTypeEnumToDescription(
          QuestionTypeEnum.MatchingInformation
        )}
        exerciseOrder={exerciseOrder}
      />
      <Form.Item required label="Number of options: ">
        <TypedInputNumber<number>
          onChange={(value) => setNumOfQuestions(value ?? 0)}
        />
      </Form.Item>
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

export default ABC;
