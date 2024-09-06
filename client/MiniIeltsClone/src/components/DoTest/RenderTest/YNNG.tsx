import { Typography } from "antd";
import { FunctionComponent } from "react";
import { TestBase } from "./base";
import { generateYNNGDescription } from "../../../helpers/generateDescription";
import { formatText } from "../../../helpers/text";
import SelectQuestion from "../Question/SelectQuestion";
import { generateYNNGOptions } from "../../../helpers/generateQuestionOptions";
import SelectAnswer from "../Answer/SelectAnswer";

interface YNNGProps extends TestBase {}

const YNNG: FunctionComponent<YNNGProps> = ({
  startQuestion,
  endQuestion,
  questions,
  showAnswer,
}) => {
  return (
    <>
      <Typography.Paragraph>
        {formatText(generateYNNGDescription(startQuestion, endQuestion))}
      </Typography.Paragraph>
      {questions.map((question) => (
        <div key={question.order}>
          <SelectQuestion
            showAnswer={showAnswer}
            order={question.order}
            content={question.content ?? ""}
            options={generateYNNGOptions()}
          />
          {showAnswer && (
            <SelectAnswer order={question.order} answer={question.answer} />
          )}
        </div>
      ))}
    </>
  );
};

export default YNNG;
