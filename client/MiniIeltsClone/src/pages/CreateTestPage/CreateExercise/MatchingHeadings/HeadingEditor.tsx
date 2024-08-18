import { FunctionComponent, useRef } from "react";
import ReactQuill from "react-quill";
import Editor from "../../../../components/Editor/Editor";
import useTest from "../../../../hooks/useTest";
import { IExercise } from "../../../../types/Model/Exercise";

interface HeadingEditorProps {
  exerciseOrder: number;
}

const HeadingEditor: FunctionComponent<HeadingEditorProps> = ({
  exerciseOrder,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const { findExercise, handleUpdateExercise } = useTest();
  const handleDescriptionChange = (value: string) => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const newExercise: IExercise = {
      ...exercise,
      content: value,
    };

    handleUpdateExercise(newExercise, exerciseOrder);
  };
  return (
    <>
      <Editor
        quillRef={quillRef}
        editorHtml={findExercise(exerciseOrder)?.content ?? ""}
        setEditorHtml={handleDescriptionChange}
      />
    </>
  );
};

export default HeadingEditor;
