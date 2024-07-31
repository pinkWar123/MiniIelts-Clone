import { AxiosResponse } from "axios";
import { CreateTestDto, TestSubmitDto } from "../types/Request/Test";
import { IResponseTest, ITest } from "../types/Model/Test";
import axiosInstance from "./axiosConfig";
import { IPagedResponse, IResponse } from "../types/Responses/response";
import { TestResultDto } from "../types/Responses/Test";

export const createTest = async (
  createTestDto: CreateTestDto
): Promise<AxiosResponse<ITest>> => {
  return await axiosInstance.post("/Test", createTestDto);
};

export const getAllTests = async (): Promise<IPagedResponse<ITest[]>> => {
  return (await axiosInstance.get("/Test?pageNumber=1&pageSize=10")).data;
};

export const getTestById = async (
  id: number | string
): Promise<AxiosResponse<IResponseTest>> => {
  return (await axiosInstance.get(`Test/${id}`)).data;
};

export const getTestResult = async (
  id: number,
  testSubmitDto: TestSubmitDto
): Promise<AxiosResponse<IResponse<TestResultDto>>> => {
  return await axiosInstance.post(`Test/${id}/result`, testSubmitDto);
};
