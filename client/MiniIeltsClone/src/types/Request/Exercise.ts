import { QuestionTypeEnum } from "../../contants/questionType";
import { CreateChoiceDto } from "./Choice";
import { CreateQuestionDto } from "./Question";

export interface CreateExerciseDto {
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
