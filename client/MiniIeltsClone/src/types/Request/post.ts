import { Skills } from "../../contants/skills";

export interface CreatePostDto {
  content: string;
  title: string;
  image?: string;
  tag: Skills;
}

export interface UpdatePostDto extends CreatePostDto {}
