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
  listeningTests: FullTestNameDto[];
  testCount: number;
}

export interface CollectionViewDto {
  title: string;
  readingTestId: number;
  listeningTestId: number;
  order: number;
}

export interface SeriesCollectionViewDto {
  id: number;
  title: string;
  image?: string;
  collections: CollectionViewDto[];
}
