import { BaseQuery } from "../types/Request/base";
import {
  CreateSeriesDto,
  SeriesQuery,
  UpdateSeriesDto,
} from "../types/Request/series";
import { IPagedResponse, IResponse } from "../types/Responses/response";
import {
  CollectionViewDto,
  SeriesCollectionViewDto,
  SeriesViewDto,
} from "../types/Responses/series";
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

export const getSeriesById = async (id: number) => {
  return (await axiosInstance.get<IResponse<SeriesViewDto>>(`Series/${id}`))
    .data;
};

export const updateSeries = async (id: number, dto: UpdateSeriesDto) => {
  return (await axiosInstance.put(`Series/${id}`, dto)).data;
};

export const deleteSeriesById = async (id: number) => {
  return (await axiosInstance.delete(`Series/${id}`)).data;
};

export const getSeriesCollections = async (query: BaseQuery) => {
  return (
    await axiosInstance.get<IPagedResponse<SeriesCollectionViewDto[]>>(
      "Series/collection",
      {
        params: query,
      }
    )
  ).data;
};

export const getCollectionsBySeriesId = async (seriesId: number) => {
  return (
    await axiosInstance.get<IResponse<SeriesCollectionViewDto>>(
      `Series/${seriesId}/collection`
    )
  ).data;
};
