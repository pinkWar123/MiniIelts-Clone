import { IResponse } from "../types/Responses/response";
import {
  Accuracy,
  QuestionDistribution,
  ScoreDistribution,
  TopStatistics,
  TotalStatistics,
} from "../types/Responses/statistic";
import axiosInstance from "./axiosConfig";

export const getTotalStatistics = async () => {
  return (
    await axiosInstance.get<IResponse<TotalStatistics>>("Statistic/total")
  ).data;
};

export const getTopStatistics = async () => {
  return (await axiosInstance.get<IResponse<TopStatistics>>("Statistic/top"))
    .data;
};

export const getQuestionAccuracies = async () => {
  return (
    await axiosInstance.get<IResponse<Accuracy>>("Statistic/question-accuracy")
  ).data;
};

export const getQuestionDistribution = async () => {
  return (
    await axiosInstance.get<IResponse<QuestionDistribution>>(
      "Statistic/question-distribution"
    )
  ).data;
};

export const getScoreDistribution = async () => {
  return (
    await axiosInstance.get<IResponse<ScoreDistribution>>(
      "Statistic/score-distribution"
    )
  ).data;
};
