interface FullTestNameDto {
  title: string;
  id: number;
}
export interface SeriesViewDto {
  title: string;
  image?: string;
  createdOn?: string;
  tests: FullTestNameDto[];
}
