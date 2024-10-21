import { QuestionTypeEnum } from "../../contants/questionType";
import { IChoice } from "./Choice";
import { IExplanation } from "./Explanation";

export interface IQuestion {
  order: number;
  content?: string;
  answer: string;
  questionType: QuestionTypeEnum;
  explanation?: IExplanation;
  choices?: IChoice[];
}

export interface IQuestionWithExplanation extends IQuestion {
  id: number;
  explanation: IExplanation;
}
