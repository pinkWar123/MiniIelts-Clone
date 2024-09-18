import { ITest } from "../Model/Test";

export interface FullTestViewDto {
  tests: ITest[];
  title: string;
  createdOn: string;
}
