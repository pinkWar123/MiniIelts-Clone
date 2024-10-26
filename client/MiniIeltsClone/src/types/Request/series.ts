import { BaseQuery } from "./base";

export interface CreateSeriesDto {
  title: string;
  fullTestIds: string[];
  listeningTestIds: string[];
  image?: string;
}

export interface UpdateSeriesDto {
  title: string;
  fullTestIds: string[];
  listeningTestIds: string[];
  image?: string;
}

export interface SeriesQuery extends BaseQuery {
  title?: string;
  sort?: string;
  skill?: string;
}
