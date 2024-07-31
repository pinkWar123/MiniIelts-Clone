import { QuestionTypeEnum } from "../../contants/questionType";
import { IChoice } from "./Choice";

export interface IQuestion {
  order: number;
  content?: string;
  answer: string;
  questionType: QuestionTypeEnum;
  choices?: IChoice[];
}
