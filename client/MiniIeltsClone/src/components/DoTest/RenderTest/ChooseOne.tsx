import { FunctionComponent } from "react";
import { TestBase } from "./base";
import useAnswers from "../../../hooks/useAnswers";
import { Radio } from "antd";

interface ChooseOneProps extends TestBase {}

const ChooseOne: FunctionComponent<ChooseOneProps> = ({
  startQuestion,
  endQuestion,
  questions,
}) => {
  const { handleUpdateAnswer } = useAnswers();
  return (
    <>
      {Array.from({ length: endQuestion - startQuestion + 1 }, (_, index) => {
        const question = questions[index];
        console.log(question);
        if (!question) return;

        return (
          <div
            key={`chooseone-choice-question=${index + startQuestion}`}
            style={{ marginBottom: "12px" }}
          >
            <div>
              {startQuestion + index}. {question.content}
            </div>
            <Radio.Group
              onChange={(e) =>
                handleUpdateAnswer(startQuestion + index, e.target.value)
              }
            >
              {question.choices?.map((choice, _index) => (
                <div key={`chooseone-choice-group-${_index}_${choice.order}`}>
                  <Radio
                    key={`chooseone-choice-${_index}_${choice.order}`}
                    value={choice.value}
                  >
                    {choice.content}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        );
      })}
    </>
  );
};

export default ChooseOne;
