import { FunctionComponent, useState } from "react";
import { IExerciseProps } from "../exerciseProps";
import { QuestionTypeEnum } from "../../../../contants/questionType";
import TypedInputNumber from "antd/es/input-number";
import { Divider, Form } from "antd";
import { MatchingHeadingsOptions } from "../../../../contants/answerOptions";
import Exercise from "../Exercise";
import ExerciseDivider from "../../../../components/create-test/ExerciseDivider";
import { convertQuestionTypeEnumToDescription } from "../../../../helpers/convertQuestionType";
import HeadingEditor from "./HeadingEditor";
import useTest from "../../../../hooks/useTest";

interface MatchingHeadingProps extends IExerciseProps {}

const MatchingHeading: FunctionComponent<MatchingHeadingProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const [headingCount, setHeadingCount] = useState<number>(1);
  const { handleUpdateExercise, findExercise } = useTest();
  const generateOptions = () => {
    return Array.from(
      { length: headingCount },
      (_, index) => MatchingHeadingsOptions[index]
    );
  };
  return (
    <>
      <ExerciseDivider
        exerciseName={convertQuestionTypeEnumToDescription(
          QuestionTypeEnum.MatchingHeadings
        )}
        exerciseOrder={exerciseOrder}
      />

      <Form.Item label="Number of headings: " required>
        <TypedInputNumber
          min={1}
          value={headingCount}
          onChange={(value) => {
            setHeadingCount(value ?? 1);
            const newExcercise = findExercise(exerciseOrder);
            if (!newExcercise) return;
            newExcercise.choiceCount = value ?? 1;
            handleUpdateExercise(newExcercise, exerciseOrder);
          }}
        />
      </Form.Item>

      <HeadingEditor exerciseOrder={exerciseOrder} />

      <Divider orientation="left">Answer:</Divider>
      <Exercise
        start={startQuestion}
        end={endQuestion}
        exerciseOrder={exerciseOrder}
        type="select"
        options={generateOptions().map((value) => ({ value, label: value }))}
      />
    </>
  );
};

export default MatchingHeading;
