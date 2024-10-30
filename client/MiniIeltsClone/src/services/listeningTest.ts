import {
  CreateListeningTestDto,
  ListeningTestQuery,
  UpdateListeningTestDto,
} from "../types/Request/listeningTest";
import { TestSubmitDto } from "../types/Request/test";
import {
  ListeningDropDownDto,
  ListeningTestKeyDto,
  ListeningTestViewDto,
} from "../types/Responses/listeningTest";
import { IPagedResponse, IResponse } from "../types/Responses/response";
import axiosInstance from "./axiosConfig";

export const createListeningTest = async (dto: CreateListeningTestDto) => {
  return await axiosInstance.post("ListeningTest", dto);
};

export const getListeningTestById = async (id: number) => {
  return (
    await axiosInstance.get<IResponse<ListeningTestViewDto>>(
      `ListeningTest/${id}`
    )
  ).data;
};

export const getListeningTests = async (query: ListeningTestQuery) => {
  return (
    await axiosInstance.get<IPagedResponse<ListeningDropDownDto[]>>(
      "ListeningTest",
      {
        params: query,
      }
    )
  ).data;
};

export const updateListeningTestById = async (
  id: number,
  dto: UpdateListeningTestDto
) => {
  return await axiosInstance.put(`ListeningTest/${id}`, dto);
};

export const getListeningTestSolution = async (id: number) => {
  return (
    await axiosInstance.get<IResponse<ListeningTestKeyDto>>(
      `ListeningTest/${id}/solution`
    )
  ).data;
};

export const submitTest = async (id: number, dto: TestSubmitDto) => {
  return (
    await axiosInstance.post<IResponse<number>>(`ListeningTest/${id}`, dto)
  ).data;
};
