import { CreateSeriesDto, SeriesQuery } from "../types/Request/series";
import { IPagedResponse } from "../types/Responses/response";
import { SeriesViewDto } from "../types/Responses/series";
import axiosInstance from "./axiosConfig";

export const createNewSeries = async (dto: CreateSeriesDto) => {
  return (await axiosInstance.post(`Series`, dto)).data;
};

export const getAllSeries = async (query: SeriesQuery) => {
  return (
    await axiosInstance.get<IPagedResponse<SeriesViewDto[]>>(`Series`, {
      params: query,
    })
  ).data;
};
