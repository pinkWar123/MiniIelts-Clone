import { FunctionComponent } from "react";
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
  const { getAnswerByOrder, handleUpdateAnswer } = useAnswers();
  const handleCheckboxChange = (checked: boolean, value: string) => {
    for (let i = startQuestion; i <= endQuestion; i++) {
      const answer = getAnswerByOrder(i);
      if (!answer) continue;
      if (checked) {
        if (answer.value === "") {
          handleUpdateAnswer(i, value);
          return;
        } else {
          if (answer.value === value) {
            handleUpdateAnswer(i, "");
          }
        }
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
        <div>
          <Checkbox
            key={`choosemany-${index}`}
            onChange={(e) =>
              handleCheckboxChange(e.target.checked, choice.value)
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
