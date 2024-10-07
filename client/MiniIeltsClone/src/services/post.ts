import { CreatePostDto, UpdatePostDto } from "../types/Request/post";
import { PostListingDto, PostViewDto } from "../types/Responses/post";
import { IResponse } from "../types/Responses/response";
import axiosInstance from "./axiosConfig";

export const createNewPost = async (dto: CreatePostDto) => {
  return (await axiosInstance.post<IResponse<string>>("Post", dto)).data;
};

export const getPostById = async (id: number) => {
  return (await axiosInstance.get<IResponse<PostViewDto>>(`Post/${id}`)).data;
};

export const getRandomPosts = async () => {
  return (await axiosInstance.get<IResponse<PostListingDto[]>>("Post/random"))
    .data;
};

export const updatePostById = async (id: number, dto: UpdatePostDto) => {
  return await axiosInstance.put(`Post/${id}`, dto);
};

export const deletePostById = async (id: number) => {
  return await axiosInstance.delete(`Post/${id}`);
};
