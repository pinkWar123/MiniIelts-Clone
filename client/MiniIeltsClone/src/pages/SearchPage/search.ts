import { QuestionTypeEnum } from "../../contants/questionType";
import { QuestionSortEnum } from "../../contants/sort";

export interface SearchQuery {
  questionType: QuestionTypeEnum[];
  sort: QuestionSortEnum;
}
