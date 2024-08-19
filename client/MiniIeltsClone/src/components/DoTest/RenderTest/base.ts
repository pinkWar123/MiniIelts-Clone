import { IChoice } from "../../../types/Model/Choice";
import { IQuestion } from "../../../types/Model/Question";

export interface TestBase {
  startQuestion: number;
  endQuestion: number;
  questions: IQuestion[];
  chooseManyChoices?: IChoice[];
  content?: string;
  description?: string;
  showAnswer?: boolean;
}
