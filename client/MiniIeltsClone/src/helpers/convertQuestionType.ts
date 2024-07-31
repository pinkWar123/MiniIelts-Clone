import {
  QuestionTypeDescriptionEnum,
  QuestionTypeEnum,
} from "../contants/questionType";

export const convertQuestionTypeEnumToDescription = (
  type: QuestionTypeEnum
) => {
  switch (type) {
    case QuestionTypeEnum.Labelling:
      return QuestionTypeDescriptionEnum.Labelling;
    case QuestionTypeEnum.MatchingHeadings:
      return QuestionTypeDescriptionEnum.MatchingHeadings;
    case QuestionTypeEnum.MatchingInformation:
      return QuestionTypeDescriptionEnum.MatchingInformation;
    case QuestionTypeEnum.MultipleChoice:
      return QuestionTypeDescriptionEnum.MultipleChoice;
    case QuestionTypeEnum.SentenceCompletion:
      return QuestionTypeDescriptionEnum.SentenceCompletion;
    case QuestionTypeEnum.SummaryCompletion:
      return QuestionTypeDescriptionEnum.SummaryCompletion;
    case QuestionTypeEnum.TFNG:
      return QuestionTypeDescriptionEnum.TFNG;
    case QuestionTypeEnum.YNNG:
      return QuestionTypeDescriptionEnum.YNNG;
  }
};
