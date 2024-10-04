export interface FullTestNameDto {
  title: string;
  id: number;
}
export interface SeriesViewDto {
  id: number;
  title: string;
  image?: string;
  createdOn?: string;
  tests: FullTestNameDto[];
  testCount: number;
}
