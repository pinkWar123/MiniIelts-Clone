import { QuestionTypeEnum } from "../../contants/questionType";
import { CreateChoiceDto } from "./Choice";

export interface CreateQuestionDto {
  order: number;
  content?: string;
  answer: string;
  questionType: QuestionTypeEnum;
  choices?: CreateChoiceDto[];
}
