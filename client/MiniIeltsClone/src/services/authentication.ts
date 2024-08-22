import { AxiosResponse } from "axios";
import { LoginDto, RegisterDto } from "../types/auth";
import axiosInstance from "./axiosConfig";
import { ILoginResponse } from "../types/Responses/ILoginResponse";

export const login = async (
  loginDto: LoginDto
): Promise<AxiosResponse<ILoginResponse>> => {
  return await axiosInstance.post("/User/login", loginDto);
};

export const register = async (registerDto: RegisterDto) => {
  return await axiosInstance.post("/User/register", registerDto);
};

export const getUserByToken = async (): Promise<
  AxiosResponse<ILoginResponse>
> => {
  return await axiosInstance.get(`/User/me`);
};

export const refreshTokens = async () => {
  return (await axiosInstance.post<ILoginResponse>("/User/refresh-token")).data;
};
