import { ITest } from "../Model/Test";
import { QuestionSubmitDto } from "../Request/Test";
import { QuestionResultDto } from "./Test";

export interface FullTestViewDto {
  tests: ITest[];
  title: string;
  createdOn: string;
}

export interface SubmitFullTestDto {
  answers: QuestionSubmitDto[];
}

export interface FullTestResultDto {
  fullTestId: number;
  marks: number;
  correct: number;
  questionCount: number;
  questionResults: QuestionResultDto[];
  time: number;
}
