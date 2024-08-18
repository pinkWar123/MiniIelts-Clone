import { IResponse } from "../types/Responses/response";
import { UploadResultDto } from "../types/Responses/upload";
import axiosInstance from "./axiosConfig";

export const uploadFiles = async (formData: FormData) => {
  return (
    await axiosInstance.post<IResponse<UploadResultDto>>(
      "Attachment",
      formData,
      {
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  ).data;
};
