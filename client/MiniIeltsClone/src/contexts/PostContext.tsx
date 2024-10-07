import { UploadFile, UploadProps } from "antd";
import React, { createContext, useState, ReactNode, useRef } from "react";
import { useUpload } from "../hooks/useUpload";
import ReactQuill from "react-quill";
import { IResponse } from "../types/Responses/response";
import { UploadResultDto } from "../types/Responses/upload";

export interface PostContextProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  props: UploadProps<unknown>;
  onPreview: (file: UploadFile) => Promise<void>;
  quillRef: React.MutableRefObject<ReactQuill | null>;
  fileList: UploadFile<unknown>[];
  handleUpload: (prefix: string) => Promise<IResponse<UploadResultDto>>;
}

export const PostContext = createContext<PostContextProps | undefined>(
  undefined
);

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { props, onPreview, fileList, handleUpload } = useUpload();
  const quillRef = useRef<ReactQuill | null>(null);
  return (
    <PostContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        props,
        onPreview,
        quillRef,
        fileList,
        handleUpload,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
