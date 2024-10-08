import { Skills } from "../../contants/skills";
import { BaseQuery } from "./base";

export interface CreatePostDto {
  content: string;
  title: string;
  image?: string;
  tag: Skills;
}

export interface UpdatePostDto extends CreatePostDto {}

export interface PostQuery extends BaseQuery {
  title?: string;
  tag?: Skills;
  sortBy?: string;
}
