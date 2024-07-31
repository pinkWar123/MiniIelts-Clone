import { IQuestion } from "../../../types/Model/Question";

export interface TestBase {
  startQuestion: number;
  endQuestion: number;
  questions: IQuestion[];
  content?: string;
  showAnswer?: boolean;
}
