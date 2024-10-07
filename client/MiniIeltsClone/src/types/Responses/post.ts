import { Skills } from "../../contants/skills";

export interface RatingResult {
  ratingCount: number;
  averageRating: number;
}
export interface PostViewDto {
  content: string;
  title: string;
  viewCount: number;
  ratingResult: RatingResult;
  image?: string;
  createdOn: string;
  createdBy: string;
  tag: Skills;
}

export interface PostListingDto {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  image?: string;
  tag: Skills;
}
