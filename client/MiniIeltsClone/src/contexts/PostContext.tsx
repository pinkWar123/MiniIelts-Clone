import { UploadFile, UploadProps } from "antd";
import React, { createContext, useState, ReactNode, useRef } from "react";
import { useUpload } from "../hooks/useUpload";
import ReactQuill from "react-quill";
import { IResponse } from "../types/Responses/response";
import { UploadResultDto } from "../types/Responses/upload";
import { CreatePostDto } from "../types/Request/post";
import { Skills } from "../contants/skills";

export interface PostContextProps {
  post: CreatePostDto;
  setPost: React.Dispatch<React.SetStateAction<CreatePostDto>>;
  props: UploadProps<unknown>;
  onPreview: (file: UploadFile) => Promise<void>;
  quillRef: React.MutableRefObject<ReactQuill | null>;
  fileList: UploadFile<unknown>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<unknown>[]>>;
  handleUpload: (prefix: string) => Promise<IResponse<UploadResultDto>>;
}

export const PostContext = createContext<PostContextProps | undefined>(
  undefined
);

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [post, setPost] = useState<CreatePostDto>({
    title: "",
    content: "",
    tag: Skills.LISTENING,
  });
  const { props, onPreview, fileList, setFileList, handleUpload } = useUpload();
  const quillRef = useRef<ReactQuill | null>(null);
  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        props,
        onPreview,
        quillRef,
        fileList,
        setFileList,
        handleUpload,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
