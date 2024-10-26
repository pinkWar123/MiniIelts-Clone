import { QuestionTypeEnum } from "../../contants/questionType";
import { BaseQuery } from "./base";
import { CreateChoiceDto } from "./Choice";
import { CreateQuestionDto } from "./question";

export interface CreateListeningExercise {
  order: number;
  questionCount: number;
  startQuestion: number;
  endQuestion: number;
  description?: string;
  content: string;
  exerciseType: QuestionTypeEnum;
  questions: CreateQuestionDto[];
  chooseManyChoices?: CreateChoiceDto[];
}

export interface CreateListeningPart {
  listeningExercises: CreateListeningExercise[];
}

export interface CreateListeningTestDto {
  title: string;
  videoId: string;
  listeningParts: CreateListeningPart[];
}

export interface ListeningTestQuery extends BaseQuery {
  pageNumber: number;
  pageSize: number;
  title?: string;
  orderBy?: "newest" | "popular";
}
