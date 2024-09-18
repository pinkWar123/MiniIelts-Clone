export interface CreateFullTestDto {
  title: string;
  testIds: string[];
}

export interface FullTestQueryObject {
  pageNumber: number;
  pageSize: number;
  title?: string;
  orderBy?: "newest" | "popular";
}
