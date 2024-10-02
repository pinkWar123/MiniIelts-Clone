import { IResponse } from "../types/Responses/response";
import { UploadResultDto } from "../types/Responses/upload";
import axiosInstance from "./axiosConfig";

export const uploadFiles = async (formData: FormData, prefix: string) => {
  return (
    await axiosInstance.post<IResponse<UploadResultDto>>(
      "File/upload",
      formData,
      {
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        params: { bucketName: "miniielts-clone", prefix },
      }
    )
  ).data;
};
