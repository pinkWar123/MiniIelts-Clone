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

const intToRoman = (num: number) => {
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = [
    "m",
    "cm",
    "d",
    "cd",
    "c",
    "xc",
    "l",
    "xl",
    "x",
    "ix",
    "v",
    "iv",
    "i",
  ];
  let roman = "";

  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      num -= val[i];
      roman += syms[i];
    }
  }
  return roman;
};

export const generateMatchingHeadingsOptions = (questionCount: number) => {
  const romanArray: string[] = [];
  for (let i = 1; i <= questionCount; i++) romanArray.push(intToRoman(i));
  return romanArray.map((item) => ({ value: item, label: item }));
};

export const generateABCOptions = (questionCount: number) => {
  if (questionCount <= 0) return [];
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  letters = letters.slice(0, questionCount);
  const options: string[] = [];

  for (let i = 0; i < letters.length; i++) {
    options.push(letters[i]);
  }

  return options.map((option) => ({ label: option, value: option }));
};
