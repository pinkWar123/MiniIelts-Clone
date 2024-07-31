export enum QuestionTypeEnum {
  MatchingHeadings,
  MatchingInformation,
  MultipleChoice,
  Labelling,
  SentenceCompletion,
  SummaryCompletion,
  TFNG, // TRUE FALSE NOT GIVEN
  YNNG, // YES NO NOT GIVEN
}

export enum QuestionTypeDescriptionEnum {
  MatchingHeadings = "Matching Headings",
  MatchingInformation = "Matching Information",
  MultipleChoice = "Multiple Choice",
  Labelling = "Labelling",
  SentenceCompletion = "Sentence Completion",
  SummaryCompletion = "Summary Completion",
  TFNG = "TFNG", // TRUE FALSE NOT GIVEN
  YNNG = "YNNG", // YES NO NOT GIVEN
}

export enum MultipleChoiceEnum {
  ChooseOne,
  ChooseMany,
}
