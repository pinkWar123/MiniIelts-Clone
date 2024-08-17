import axiosInstance from "./axiosConfig";

export const uploadFiles = async (formData: FormData) => {
  return (
    await axiosInstance.post("Attachment", formData, {
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
};
