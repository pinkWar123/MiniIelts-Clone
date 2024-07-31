import { FunctionComponent, useState } from "react";
import { IExerciseProps } from "./exerciseProps";
import { QuestionTypeEnum } from "../../../contants/questionType";
import TypedInputNumber from "antd/es/input-number";
import { Divider, Form, Input } from "antd";
import { MatchingHeadingsOptions } from "../../../contants/answerOptions";
import Exercise from "./Exercise";
import ExerciseDivider from "../../../components/create-test/ExerciseDivider";
import { convertQuestionTypeEnumToDescription } from "../../../helpers/convertQuestionType";

interface MatchingHeadingProps extends IExerciseProps {}

const MatchingHeading: FunctionComponent<MatchingHeadingProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const [headingCount, setHeadingCount] = useState<number>(1);
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
          onChange={(value) => setHeadingCount(value ?? 1)}
        />
      </Form.Item>
      {generateOptions()?.map((option) => (
        <>
          {option}. <Input id={`m-${option}`} key={`option-${option}`} />
        </>
      ))}
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
