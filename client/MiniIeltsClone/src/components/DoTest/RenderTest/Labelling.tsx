import { FunctionComponent } from "react";
import { TestBase } from "./base";
import { Form, Image, Input } from "antd";
import parse from "html-react-parser";
import useAnswers from "../../../hooks/useAnswers";
import CorrectAnswer from "../Answer/FillAnswer";
interface LabellingProps extends TestBase {}

const Labelling: FunctionComponent<LabellingProps> = ({
  startQuestion,
  endQuestion,
  description,
  questions,
  content,
  showAnswer,
}) => {
  const { handleUpdateAnswer, getAnswerByOrder } = useAnswers();
  const renderInputs = () => {
    return Array.from(
      { length: endQuestion - startQuestion + 1 },
      (_, index) => {
        console.log(questions);
        if (!showAnswer)
          return (
            <Form.Item
              key={`labelling_question-${startQuestion + index}`}
              label={`${startQuestion + index}`}
            >
              <Input
                onChange={(e) =>
                  handleUpdateAnswer(startQuestion + index, e.target.value)
                }
                value={getAnswerByOrder(startQuestion + index)?.value}
              />
            </Form.Item>
          );
        const answerByClient = getAnswerByOrder(startQuestion + index);
        const rightAnswer = questions[index];
        return (
          <Form.Item
            key={`labelling_question-${startQuestion + index}`}
            label={`${startQuestion + index}`}
          >
            <CorrectAnswer
              clientAnswer={answerByClient?.value}
              rightAnswer={rightAnswer.answer}
            />
          </Form.Item>
        );
      }
    );
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          style={{
            objectFit: "contain",
            maxHeight: "500px",
          }}
          src={content}
          fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBGOs2225fFqTfnl5EKlrEUBn5-drby1x3Q&s"
        />
      </div>
      <div>{parse(description ?? "")}</div>
      <div style={{ marginTop: "20px" }}>{renderInputs()}</div>
    </>
  );
};

export default Labelling;
