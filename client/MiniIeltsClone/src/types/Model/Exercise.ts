import { QuestionTypeEnum } from "../../contants/questionType";
import { IChoice } from "./Choice";
import { IQuestion } from "./Question";

export interface IExercise {
  order: number;
  questionCount: number;
  startQuestion: number;
  endQuestion: number;
  description?: string;
  content: string;
  exerciseType: QuestionTypeEnum;
  questions: IQuestion[];
  chooseManyChoices?: IChoice[]; // This field is only used for choose many exercise
}
