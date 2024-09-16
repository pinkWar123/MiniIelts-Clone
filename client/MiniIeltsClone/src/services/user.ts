import { UserQueryObject } from "../types/Request/user";
import { IPagedResponse } from "../types/Responses/response";
import { UserInfoDto } from "../types/Responses/user";
import axiosInstance from "./axiosConfig";

export const callGetUsers = async (object: UserQueryObject) => {
  return (
    await axiosInstance.get<IPagedResponse<UserInfoDto[]>>("/User/user-info", {
      params: object,
    })
  ).data;
};
