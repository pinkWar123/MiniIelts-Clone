export interface QuestionResultDto {
  order: number;
  userAnswer: string;
  answer: string;
  isTrue: boolean;
}

export interface TestResultDto {
  testId: number;
  questionCount: number;
  title: string;
  marks: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  questionResults: QuestionResultDto[];
  time: number;
}

export interface TestSubmitResultDto {
  resultId: number;
  time: number;
}
