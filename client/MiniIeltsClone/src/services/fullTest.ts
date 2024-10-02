import {
  CreateFullTestDto,
  FullTestQueryObject,
} from "../types/Request/fullTest";
import {
  FullTestKeyDto,
  FullTestResultDto,
  FullTestViewDto,
  SubmitFullTestDto,
} from "../types/Responses/fullTest";
import { IPagedResponse, IResponse } from "../types/Responses/response";
import axiosInstance from "./axiosConfig";

export const createFullTest = async (dto: CreateFullTestDto) => {
  return (await axiosInstance.post(`FullTest`, dto)).data;
};

export const checkNameExistence = async (name: string) => {
  return (
    await axiosInstance.get<IResponse<boolean>>("FullTest/check-title", {
      params: { title: name },
    })
  ).data;
};

export const getFullTests = async (query: FullTestQueryObject) => {
  return (
    await axiosInstance.get<IPagedResponse<FullTestViewDto[]>>("FullTest", {
      params: query,
    })
  ).data;
};

export const getFullTestByIdAsync = async (id: string) => {
  return (await axiosInstance.get<IResponse<FullTestViewDto>>(`FullTest/${id}`))
    .data;
};

export const submitFullTest = async (id: number, dto: SubmitFullTestDto) => {
  return (
    await axiosInstance.post<IResponse<number>>(`FullTest/${id}/submit`, dto)
  ).data;
};

export const getFullTestSolution = async (id: number) => {
  return (
    await axiosInstance.get<IResponse<FullTestKeyDto>>(
      `FullTest/${id}/solution`
    )
  ).data;
};

export const getFullTestResultById = async (id: number) => {
  return (
    await axiosInstance.get<IResponse<FullTestResultDto>>(
      `FullTest/result/${id}`
    )
  ).data;
};

export const getFullTestResultByQuery = async (
  id: number,
  dto: SubmitFullTestDto
) => {
  return (
    await axiosInstance.post<IResponse<FullTestResultDto>>(
      `FullTest/${id}/result`,
      dto
    )
  ).data;
};

export const deleteFullTestById = async (id: number) => {
  return (await axiosInstance.delete(`FullTest/${id}`)).data;
};
