export const generateTFNGOptions = () => {
  return ["TRUE", "FALSE", "NOT GIVEN"].map((option) => ({
    value: option,
    label: option,
  }));
};

export const generateYNNGOptions = () => {
  return ["YES", "NO", "NOT GIVEN"].map((option) => ({
    value: option,
    label: option,
  }));
};
