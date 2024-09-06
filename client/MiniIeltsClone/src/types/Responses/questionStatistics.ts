import { QuestionTypeEnum } from "../../contants/questionType";

export interface QuestionStatistics {
  questionType: QuestionTypeEnum;
  accuracy: number;
}
