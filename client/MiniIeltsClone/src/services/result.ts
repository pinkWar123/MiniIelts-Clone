import { IResponse } from "../types/Responses/response";
import { TestResultDto } from "../types/Responses/Test";
import axiosInstance from "./axiosConfig";

export const callGetResultById = async (resultId: number) => {
  return (
    await axiosInstance.get<IResponse<TestResultDto>>(`Result/${resultId}`)
  ).data;
};
