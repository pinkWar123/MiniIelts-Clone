import { QuestionTypeEnum } from "../../contants/questionType";

export interface IDoTestAnswer {
  order: number;
  value: string;
  questionType: QuestionTypeEnum;
}
