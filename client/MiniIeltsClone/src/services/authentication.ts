import { AxiosResponse } from "axios";
import { LoginDto, RegisterDto } from "../types/auth";
import axiosInstance from "./axiosConfig";
import { ILoginResponse } from "../types/Responses/ILoginResponse";
import { IResponse } from "../types/Responses/response";

export const login = async (
  loginDto: LoginDto
): Promise<AxiosResponse<ILoginResponse>> => {
  return await axiosInstance.post("/User/login", loginDto);
};

export const register = async (registerDto: RegisterDto) => {
  return await axiosInstance.post("/User/register", registerDto);
};

export const getUserByToken = async () => {
  return (await axiosInstance.get<IResponse<ILoginResponse>>(`/User/me`)).data;
};

export const refreshTokens = async () => {
  return (await axiosInstance.post<ILoginResponse>("/User/refresh-token")).data;
};

export const logout = async () => {
  return await axiosInstance.post("/User/logout");
};
