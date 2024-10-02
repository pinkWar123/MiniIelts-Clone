import { ITest } from "../Model/Test";
import { QuestionSubmitDto } from "../Request/test";
import { QuestionResultDto } from "./Test";

export interface FullTestViewDto {
  id: number;
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
  fullTestResultId?: number;
  title: string;
  marks: number;
  correct: number;
  questionCount: number;
  results: TestResultDto[];
  time: number;
  createdOn: string;
  viewCount: number;
}

interface QuestionKeyDto {
  order: number;
  answer: string;
}

export interface TestKeyDto {
  part: number;
  startQuestion: number;
  endQuestion: number;
  keys: QuestionKeyDto[];
  createdOn: string;
  viewCount: number;
}

export interface FullTestKeyDto {
  fullTestId: number;
  title: string;
  questionCount: number;
  testKeys: TestKeyDto[];
  createdOn: string;
  viewCount: number;
}

export interface FullTestResultDto {
  fullTestId: number;
  id: number;
  title: string;
  marks: number;
  correct: number;
  questionCount: number;
  results: TestResultDto[];
  time: number;
}
