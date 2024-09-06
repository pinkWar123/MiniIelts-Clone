import { TestHistory } from "../types/Responses/history";
import { Performance } from "../types/Responses/performance";
import { QuestionStatistics } from "../types/Responses/questionStatistics";
import { IPagedResponse, IResponse } from "../types/Responses/response";
import axiosInstance from "./axiosConfig";

export const callGetOverallResult = async () => {
  return (
    await axiosInstance.get<IResponse<Performance>>("Dashboard/overall-result")
  ).data;
};

export const callGetTestHistory = async (
  pageNumber: number,
  pageSize: number
) => {
  return (
    await axiosInstance.get<IPagedResponse<TestHistory[]>>(
      "Dashboard/history",
      {
        params: { pageNumber, pageSize },
      }
    )
  ).data;
};

export const callGetQuestionStatistics = async () => {
  return (
    await axiosInstance.get<IResponse<QuestionStatistics[]>>(
      "Dashboard/question-statistics"
    )
  ).data;
};
