import { CategoryEnum } from "../../contants/categories";
import { IExerciseWithExplanation } from "../Model/Exercise";

export interface QuestionResultDto {
  order: number;
  userAnswer: string;
  answer: string;
  isTrue: boolean;
}

export interface TestResultDto {
  testId: number;
  questionCount: number;
  title: string;
  marks: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  questionResults: QuestionResultDto[];
  time: number;
}

export interface TestSubmitResultDto {
  resultId: number;
  time: number;
}

export interface TestWithExplanationDto {
  id: string;
  title: string;
  essay: string;
  picture?: string;
  viewCount: number;
  questionCount: number;
  category?: CategoryEnum;
  exercises: IExerciseWithExplanation[];
}
