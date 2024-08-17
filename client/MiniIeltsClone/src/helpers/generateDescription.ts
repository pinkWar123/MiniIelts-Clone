export const generateTFNGDescription = (start: number, end: number) => {
  return `Do the following statements agree with the information given in Reading Passage?
    In boxes ${start}-${end} on your answer sheet, write

    TRUE if the statement agrees with the information

    FALSE if the statement contradicts the information

    NOT GIVEN if there is no information on this`;
};

export const generateYNNGDescription = (start: number, end: number) => {
  return `Do the following statements agree with the information given in Reading Passage?
    In boxes ${start}-${end} on your answer sheet, write

    YES if the statement agrees with the information

    NO if the statement contradicts the information

    NOT GIVEN if there is no information on this`;
};

export const generateMatchingHeadingsDescription = (
  start: number,
  end: number
) => {
  return [
    `The reading has ${end - start + 1} paragraphs.`,
    `Choose the correct heading for each paragraph from the list of headings below.`,
    `Write the correct number in boxes ${start}-${end} on your answer sheet.
  `,
  ];
};
