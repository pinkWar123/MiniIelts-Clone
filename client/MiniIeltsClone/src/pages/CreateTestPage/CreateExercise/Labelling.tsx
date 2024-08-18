import { FunctionComponent, useEffect, useRef } from "react";
import { IExerciseProps } from "./exerciseProps";
import ExerciseDivider from "../../../components/create-test/ExerciseDivider";
import { convertQuestionTypeEnumToDescription } from "../../../helpers/convertQuestionType";
import { QuestionTypeEnum } from "../../../contants/questionType";
import { Form, Input } from "antd";
import useTest from "../../../hooks/useTest";
import { IQuestion } from "../../../types/Model/Question";
import UploadHandler from "../../../components/UploadHandler";
import { useUpload } from "../../../hooks/useUpload";
import { IExercise } from "../../../types/Model/Exercise";
import Editor from "../../../components/Editor/Editor";
import ReactQuill from "react-quill";

interface LabellingProps extends IExerciseProps {}
// export interface IQuestion {
//     order: number;
//     content?: string;
//     answer: string;
//     questionType: QuestionTypeEnum;
//     choices?: IChoice[];
//   }
const Labelling: FunctionComponent<LabellingProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const { props, onPreview, handleUpload, fileList } = useUpload();
  const quillRef = useRef<ReactQuill | null>(null);
  const { handleUpdateQuestion, handleUpdateExercise, findExercise } =
    useTest();
  const onQuestionChange = (index: number, answer: string) => {
    const questionOrder = startQuestion + index;
    const newQuestion: IQuestion = {
      order: questionOrder,
      answer,
      questionType: QuestionTypeEnum.Labelling,
      content: "",
    };
    handleUpdateQuestion(newQuestion, exerciseOrder, questionOrder);
  };

  const handleDescriptionChange = (value: string) => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const newExercise: IExercise = {
      ...exercise,
      description: value,
    };
    handleUpdateExercise(newExercise, exerciseOrder);
  };

  useEffect(() => {
    const uploadDiagram = async () => {
      if (fileList.length === 0) return;
      const images = await handleUpload();
      console.log(images);
      const currentExercise = findExercise(exerciseOrder);
      if (!currentExercise) return;
      const newExercise: IExercise = {
        ...currentExercise,
        content: images.data.fileNames[0],
      };
      handleUpdateExercise(newExercise, exerciseOrder);
    };
    uploadDiagram();
  }, [fileList]);

  return (
    <>
      <ExerciseDivider
        exerciseName={convertQuestionTypeEnumToDescription(
          QuestionTypeEnum.Labelling
        )}
        exerciseOrder={exerciseOrder}
      />

      <Editor
        quillRef={quillRef}
        editorHtml={findExercise(exerciseOrder)?.description ?? ""}
        setEditorHtml={handleDescriptionChange}
      />

      <div style={{ marginBottom: "12px" }}>Diagram:</div>
      <UploadHandler onPreview={onPreview} props={props} />
      <div style={{ marginTop: "12px", marginBottom: "12px" }}>Answer:</div>
      {Array.from({ length: endQuestion - startQuestion + 1 }, (_, index) => (
        <Form.Item key={`label-${index}`} label={`${index + startQuestion} `}>
          <Input onChange={(e) => onQuestionChange(index, e.target.value)} />
        </Form.Item>
      ))}
    </>
  );
};

export default Labelling;
