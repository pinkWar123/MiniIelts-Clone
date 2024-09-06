import { CategoryEnum } from "../../contants/categories";
import { QuestionTypeEnum } from "../../contants/questionType";
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
  questionType: QuestionTypeEnum;
}

export interface TestSubmitDto {
  questionSubmitDtos: QuestionSubmitDto[];
}
