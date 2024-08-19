import { FunctionComponent, useEffect, useState } from "react";
import { TestBase } from "./base";
import { generateABCOptions } from "../../../helpers/generateQuestionOptions";
import { Checkbox } from "antd";
import useAnswers from "../../../hooks/useAnswers";

interface ChooseManyProps extends TestBase {}

const ChooseMany: FunctionComponent<ChooseManyProps> = ({
  startQuestion,
  endQuestion,
  chooseManyChoices,
  showAnswer,
}) => {
  const options = generateABCOptions(endQuestion - startQuestion + 1);
  const { handleUpdateAnswer } = useAnswers();
  const [checkedIndex, setCheckedIndex] = useState<number[]>(
    Array.from({ length: endQuestion - startQuestion + 1 }, () => -1)
  );
  const handleCheckboxChange = (
    checked: boolean,
    value: string,
    index: number
  ) => {
    if (checked) {
      const positionToInsert = checkedIndex.findIndex((i) => i === -1);
      if (positionToInsert !== -1) {
        setCheckedIndex((prev) =>
          prev.map((i, _index) => (_index === positionToInsert ? index : i))
        );
        handleUpdateAnswer(positionToInsert + startQuestion + 1, value);
      }
    } else {
      const positionToRemove = checkedIndex.findIndex((i) => i === index);
      if (positionToRemove !== -1) {
        setCheckedIndex((prev) =>
          prev.map((i, _index) => (_index === positionToRemove ? -1 : i))
        );
        handleUpdateAnswer(positionToRemove + startQuestion + 1, "");
      }
    }
  };

  return (
    <>
      <div>
        Choose {endQuestion - startQuestion + 1} letters, {options[0].value}-
        {options[options.length - 1].value}
      </div>
      {chooseManyChoices?.map((choice, index) => (
        <div key={`choosemanydiv-${index}`} style={{ marginBottom: "10px" }}>
          <Checkbox
            disabled={
              checkedIndex.filter((i) => i !== -1).length >=
                endQuestion - startQuestion + 1 && !checkedIndex.includes(index)
            }
            key={`choosemany-${index}`}
            onChange={(e) =>
              handleCheckboxChange(e.target.checked, choice.value, index)
            }
          >
            <strong>{choice.value}.</strong> {choice.content}
          </Checkbox>
        </div>
      ))}
    </>
  );
};

export default ChooseMany;
