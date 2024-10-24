import { CreateListeningTestDto } from "../types/Request/listeningTest";
import { ListeningTestViewDto } from "../types/Responses/listeningTest";
import { IResponse } from "../types/Responses/response";
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
