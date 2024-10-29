import { QuestionTypeEnum } from "../../contants/questionType";
import { IExerciseChoice } from "../Model/Choice";
import { IQuestion } from "../Model/Question";
import { TestKeyDto } from "./fullTest";

export interface ListeningTestViewDto {
  title: string;
  videoId: string;
  transcript?: string;
  listeningParts: ListeningPartViewDto[];
}

export interface ListeningDropDownDto {
  title: string;
  id: number;
}

export interface ListeningPartViewDto {
  listeningTestId: number;
  transcript: string;
  listeningExercises: ListeningExerciseViewDto[];
}

export interface ListeningExerciseViewDto {
  listeningPartId: number;
  order: number;
  exerciseType: QuestionTypeEnum;
  questionCount: number;
  startQuestion: number;
  endQuestion: number;
  choiceCount: number;
  description?: string;
  content: string;
  questions: IQuestion[];
  chooseManyChoices: IExerciseChoice[];
}

export interface ListeningTestKeyDto {
  listeningTestId: number;
  title: string;
  questionCount: number;
  videoId: string;
  testKeys: TestKeyDto[];
  createdOn: string;
  viewCount: number;
  transcripts: string[];
}
