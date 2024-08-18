import React, { FunctionComponent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FORMATS, MODULES } from "./editor.config";

interface EditorProps {
  editorHtml: string;
  setEditorHtml: (htmlString: string) => void;
  quillRef: React.MutableRefObject<ReactQuill | null>;
}

const Editor: FunctionComponent<EditorProps> = ({
  editorHtml,
  setEditorHtml,
  quillRef,
}) => {
  const handleChange = (html: string) => {
    setEditorHtml(html);
  };
  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={handleChange}
        modules={MODULES}
        formats={FORMATS}
        theme="snow"
      />
    </div>
  );
};

export default Editor;
