import { ITest } from "../Model/Test";
import { QuestionSubmitDto } from "../Request/Test";
import { QuestionResultDto } from "./Test";

export interface FullTestViewDto {
  tests: ITest[];
  title: string;
  createdOn: string;
  picture?: string;
}

export interface SubmitFullTestDto {
  answers: QuestionSubmitDto[];
  time: number;
}

interface TestResultDto {
  part: number;
  startQuestion: number;
  endQuestion: number;
  questionResults: QuestionResultDto[];
}

export interface FullTestResultDto {
  fullTestId: number;
  title: string;
  marks: number;
  correct: number;
  questionCount: number;
  results: TestResultDto[];
  time: number;
}

interface QuestionKeyDto {
  order: number;
  answer: string;
}

interface TestKeyDto {
  part: number;
  startQuestion: number;
  endQuestion: number;
  keys: QuestionKeyDto[];
}

export interface FullTestKeyDto {
  fullTestId: number;
  title: string;
  questionCount: number;
  testKeys: TestKeyDto[];
}
