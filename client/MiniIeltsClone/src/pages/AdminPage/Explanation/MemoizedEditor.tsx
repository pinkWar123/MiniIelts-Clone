import React from "react";
import Editor from "../../../components/Editor/Editor";

export const MemoizedEditor = React.memo(
  ({ editorHtml, setEditorHtml, disabled }: any) => {
    return (
      <Editor
        editorHtml={editorHtml}
        setEditorHtml={setEditorHtml}
        disabled={disabled}
      />
    );
  }
);
