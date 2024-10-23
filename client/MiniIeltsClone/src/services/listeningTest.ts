import { CreateListeningTestDto } from "../types/Request/listeningTest";
import axiosInstance from "./axiosConfig";

export const createListeningTest = async (dto: CreateListeningTestDto) => {
  return await axiosInstance.post("ListeningTest", dto);
};
