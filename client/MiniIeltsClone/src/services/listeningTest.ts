import {
  CreateListeningTestDto,
  ListeningTestQuery,
} from "../types/Request/listeningTest";
import {
  ListeningDropDownDto,
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
