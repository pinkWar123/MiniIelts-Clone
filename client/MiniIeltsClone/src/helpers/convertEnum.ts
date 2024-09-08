import { QuestionTypeEnum } from "../contants/questionType";
import { QuestionSortEnum } from "../contants/sort";

export const convertStringToQuestionTypeEnum = (value: string) => {
  const numValue = parseInt(value);
  switch (numValue) {
    case 0:
      return QuestionTypeEnum.MatchingHeadings;
    case 1:
      return QuestionTypeEnum.MatchingInformation;
    case 2:
      return QuestionTypeEnum.MultipleChoice;
    case 3:
      return QuestionTypeEnum.Labelling;
    case 4:
      return QuestionTypeEnum.SentenceCompletion;
    case 5:
      return QuestionTypeEnum.SummaryCompletion;
    case 6:
      return QuestionTypeEnum.TFNG;
    case 7:
      return QuestionTypeEnum.YNNG;
    default:
      return null;
  }
};

export const convertStringToSortEnum = (value: string) => {
  switch (value) {
    case "newest":
      return QuestionSortEnum.Newest;
    case "most-viewed":
      return QuestionSortEnum.MostViewed;
    case "namea-z":
      return QuestionSortEnum.NameAZ;
    case "namez-a":
      return QuestionSortEnum.NameZA;
    case "oldest":
      return QuestionSortEnum.Oldest;
    default:
      return null;
  }
};
