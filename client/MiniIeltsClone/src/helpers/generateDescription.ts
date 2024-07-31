export const generateTFNGDescription = (start: number, end: number) => {
  return `Do the following statements agree with the information given in Reading Passage?
    In boxes ${start}-${end} on your answer sheet, write

    TRUE if the statement agrees with the information

    FALSE if the statement contradicts the information

    NOT GIVEN if there is no information on this`;
};
