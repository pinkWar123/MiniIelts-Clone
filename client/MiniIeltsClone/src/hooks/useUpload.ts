import { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { uploadFiles } from "../services/upload";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const useUpload = (initialFiles?: UploadFile[]) => {
  const [fileList, setFileList] = useState<UploadFile[]>(initialFiles ?? []);
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
  const handleUpload = async () => {
    console.log(fileList);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file as FileType);
    });
    await uploadFiles(formData);
    return fileList?.map(
      (file) =>
        `https://miniieltsbypinkwar.blob.core.windows.net/apiimages/${file.name}`
    );
  };
  return { handleUpload, onPreview, props, fileList };
};
