import { CategoryEnum } from "../../contants/categories";
import { IExercise } from "./Exercise";

export interface ITest {
  id: string;
  title: string;
  essay: string;
  picture?: string;
  viewCount: number;
  questionCount: number;
  category?: CategoryEnum;
  exercises: IExercise[];
}

export interface TestSearchViewDto {
  id: string;
  title: string;
  picture?: string;
  viewCount: number;
  questionCount: number;
  createdOn: string;
}

export interface TestDropDownViewDto {
  id: string;
  title: string;
}
