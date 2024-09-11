import { FunctionComponent, useRef, useState } from "react";
import Exercise from "./Exercise";
import TypedInputNumber from "antd/es/input-number";
import { Form } from "antd";
import { IExerciseProps } from "./exerciseProps";
import ExerciseDivider from "../../../components/create-test/ExerciseDivider";
import { QuestionTypeEnum } from "../../../contants/questionType";
import { convertQuestionTypeEnumToDescription } from "../../../helpers/convertQuestionType";
import Editor from "../../../components/Editor/Editor";
import ReactQuill from "react-quill";
import useTest from "../../../hooks/useTest";
import { IExercise } from "../../../types/Model/Exercise";

interface ABCProps extends IExerciseProps {}

const ABC: FunctionComponent<ABCProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const [numOfOptions, setNumOfOptions] = useState<number>(0);
  const quillRef = useRef<ReactQuill | null>(null);
  const { findExercise, handleUpdateExercise } = useTest();
  const getEditorHtml = () => {
    return findExercise(exerciseOrder)?.content ?? "";
  };
  const handleChangeEditor = (value: string) => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const newExercise: IExercise = { ...exercise, content: value };
    handleUpdateExercise(newExercise, exerciseOrder);
  };
  const handleChangeChoiceCount = (value: number) => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const newExercise: IExercise = { ...exercise, choiceCount: value };
    handleUpdateExercise(newExercise, exerciseOrder);
  };
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
          onChange={(value) => {
            if (value !== null) {
              setNumOfOptions(value);
              handleChangeChoiceCount(value);
            }
          }}
        />
      </Form.Item>
      <Editor
        quillRef={quillRef}
        editorHtml={getEditorHtml()}
        setEditorHtml={handleChangeEditor}
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

export default ABC;
