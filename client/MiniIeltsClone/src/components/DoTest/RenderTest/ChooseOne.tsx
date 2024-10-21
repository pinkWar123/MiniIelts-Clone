import { FunctionComponent } from "react";
import { TestBase } from "./base";
import useAnswers from "../../../hooks/useAnswers";
import { Radio } from "antd";
import { IQuestion } from "../../../types/Model/Question";

interface ChooseOneProps extends TestBase {}

const ChooseOne: FunctionComponent<ChooseOneProps> = ({
  startQuestion,
  endQuestion,
  questions,
  showAnswer,
}) => {
  const { handleUpdateAnswer, getAnswerByOrder } = useAnswers();
  const renderQuestions = (question: IQuestion, index: number) => {
    if (!showAnswer)
      return (
        <Radio.Group
          onChange={(e) =>
            handleUpdateAnswer(startQuestion + index, e.target.value)
          }
          value={getAnswerByOrder(startQuestion + index)?.value}
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
      );

    const clientAnswer = getAnswerByOrder(index + startQuestion);
    console.log(clientAnswer?.value);
    console.log(question.choices);
    return (
      <Radio.Group value={clientAnswer?.value}>
        {question.choices?.map((choice, _index) => (
          <div key={`chooseone-choice-group-${_index}_${choice.order}`}>
            <Radio disabled value={choice.value}>
              {choice.content}
            </Radio>
          </div>
        ))}
      </Radio.Group>
    );
  };
  return (
    <>
      {Array.from({ length: endQuestion - startQuestion + 1 }, (_, index) => {
        const question = questions[index];
        console.log(question);
        if (!question) return;

        return (
          <div
            key={`chooseone-choice-question=${index + startQuestion}`}
            id={`question-${index + startQuestion}`}
            style={{ marginBottom: "12px" }}
          >
            <div>
              {startQuestion + index}. {question.content}
            </div>
            {renderQuestions(question, index)}
            {showAnswer && (
              <div
                key={`answer-chooseone-${index + startQuestion}`}
                style={{ color: "red", fontWeight: 500 }}
              >
                {startQuestion + index}. Answer: {question.answer}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ChooseOne;
