import { QuestionTypeEnum } from "../../contants/questionType";
import { IExerciseChoice } from "../Model/Choice";
import { IQuestion } from "../Model/Question";

export interface ListeningTestViewDto {
  title: string;
  videoId: string;
  listeningParts: ListeningPartViewDto[];
}

export interface ListeningDropDownDto {
  title: string;
  id: number;
}

export interface ListeningPartViewDto {
  listeningTestId: number;
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
