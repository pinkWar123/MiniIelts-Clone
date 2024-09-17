import { AxiosResponse } from "axios";
import {
  CreateTestDto,
  TestSubmitDto,
  UpdateTestDto,
} from "../types/Request/Test";
import { ITest, TestSearchViewDto } from "../types/Model/Test";
import axiosInstance from "./axiosConfig";
import { IPagedResponse, IResponse } from "../types/Responses/response";
import { TestSubmitResultDto } from "../types/Responses/Test";

export const createTest = async (
  createTestDto: CreateTestDto
): Promise<AxiosResponse<ITest>> => {
  return await axiosInstance.post("/Test", createTestDto);
};

export const updateTest = async (
  testId: number,
  updateTestDto: UpdateTestDto
) => {
  return (await axiosInstance.put(`/Test/${testId}`, updateTestDto)).data;
};

export const getAllTests = async (
  queries: Record<string, string | number | null | string[]>
): Promise<IPagedResponse<ITest[]>> => {
  return (
    await axiosInstance.get("/Test", {
      params: queries,
    })
  ).data;
};

export const getTestSearch = async (qs: string) => {
  return (
    await axiosInstance.get<IPagedResponse<TestSearchViewDto[]>>(`/Test?${qs}`)
  ).data;
};

export const getTestById = async (id: number | string) => {
  return (await axiosInstance.get<IResponse<ITest>>(`Test/${id}`)).data;
};

export const getTestResult = async (
  id: number,
  testSubmitDto: TestSubmitDto
) => {
  return (await axiosInstance.post(`Test/${id}/result`, testSubmitDto)).data;
};

export const submitTest = async (id: number, testSubmitDto: TestSubmitDto) => {
  return (
    await axiosInstance.post<IResponse<TestSubmitResultDto>>(
      `Test/${id}/submit`,
      testSubmitDto
    )
  ).data;
};

export const incrementTestViewCount = async (id: number) => {
  return await axiosInstance.post(`Test/${id}/increment-viewcount`);
};

export const deleteTestById = async (id: number) => {
  return (await axiosInstance.delete(`Test/${id}`)).data;
};
