import { FunctionComponent, useRef } from "react";
import Editor from "../../../../../components/Editor/Editor";
import ReactQuill from "react-quill";
import useTest from "../../../../../hooks/useTest";
import { IExercise } from "../../../../../types/Model/Exercise";
import { App, Button } from "antd";
import { Blank } from "../../../../../contants/sentenceCompletion";

interface SummaryEditorProps {
  exerciseOrder: number;
  questionCount: number;
}

const SummaryEditor: FunctionComponent<SummaryEditorProps> = ({
  exerciseOrder,
  questionCount,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const { message } = App.useApp();
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
  const insertInput = () => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const blankCount = exercise.content.split(Blank).length - 1;
    if (blankCount >= questionCount) {
      message.error(
        "Number of blanks can not be greater than number of questions"
      );
      return;
    }
    const inputHtml = Blank;
    const quill = quillRef.current?.getEditor(); // Get the Quill instance
    if (quill) {
      const range = quill.getSelection(true);
      quill.clipboard.dangerouslyPasteHTML(range.index, inputHtml);
    }
  };
  return (
    <>
      <Editor
        quillRef={quillRef}
        editorHtml={getEditorHtml()}
        setEditorHtml={handleChangeEditor}
      />
      <Button onClick={insertInput} style={{ marginTop: "20px" }}>
        Add input
      </Button>
    </>
  );
};

export default SummaryEditor;
