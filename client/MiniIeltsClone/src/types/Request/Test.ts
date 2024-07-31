import { CategoryEnum } from "../../contants/categories";
import { CreateExerciseDto } from "./Exercise";

export interface CreateTestDto {
  title: string;
  essay: string;
  picture?: string;
  questionCount: number;
  category?: CategoryEnum;
  excercises: CreateExerciseDto[];
}

export interface QuestionSubmitDto {
  order: number;
  value: string;
}

export interface TestSubmitDto {
  questionSubmitDtos: QuestionSubmitDto[];
}
