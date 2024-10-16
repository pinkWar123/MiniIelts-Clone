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

export const callGetOverallResultByAdmin = async (id: string) => {
  return (
    await axiosInstance.get<IResponse<Performance>>(
      `Dashboard/overall-result/${id}}`
    )
  ).data;
};

export const callGetTestHistory = async (
  pageNumber: number,
  pageSize: number
) => {
  return (
    await axiosInstance.get<IPagedResponse<TestHistory[]>>(
      "Dashboard/test/history",
      {
        params: { pageNumber, pageSize },
      }
    )
  ).data;
};

export const callGetTestHistoryByAdmin = async (
  id: string,
  pageNumber: number,
  pageSize: number
) => {
  return (
    await axiosInstance.get<IPagedResponse<TestHistory[]>>(
      `Dashboard/history/${id}`,
      {
        params: { pageNumber, pageSize },
      }
    )
  ).data;
};

export const callGetFullTestHistory = async (
  pageNumber: number,
  pageSize: number
) => {
  return (
    await axiosInstance.get<IPagedResponse<TestHistory[]>>(
      `Dashboard/full-test/history`,
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

export const callGetQuestionStatisticsByAdmin = async (id: string) => {
  return (
    await axiosInstance.get<IResponse<QuestionStatistics[]>>(
      `Dashboard/question-statistics/${id}`
    )
  ).data;
};
