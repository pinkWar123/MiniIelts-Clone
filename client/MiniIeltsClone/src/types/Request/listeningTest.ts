import { QuestionTypeEnum } from "../../contants/questionType";
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
