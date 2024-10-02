import { BaseQuery } from "./base";

export interface CreateSeriesDto {
  title: string;
  fullTestIds: string[];
  image?: string;
}

export interface SeriesQuery extends BaseQuery {
  title?: string;
}
