import { FunctionComponent } from "react";
import { TestBase } from "./base";
import { Typography } from "antd";
import { generateTFNGDescription } from "../../../helpers/generateDescription";
import SelectQuestion from "../Question/SelectQuestion";
import { generateTFNGOptions } from "../../../helpers/generateQuestionOptions";
import { formatText } from "../../../helpers/text";
import SelectAnswer from "../Answer/SelectAnswer";

interface TFNGProps extends TestBase {}

const TFNG: FunctionComponent<TFNGProps> = ({
  startQuestion,
  endQuestion,
  questions,
  showAnswer,
}) => {
  return (
    <>
      <Typography.Paragraph>
        {formatText(generateTFNGDescription(startQuestion, endQuestion))}
      </Typography.Paragraph>
      {questions.map((question) => (
        <div key={question.order}>
          <SelectQuestion
            showAnswer={showAnswer}
            order={question.order}
            content={question.content ?? ""}
            options={generateTFNGOptions()}
          />

          {showAnswer && (
            <SelectAnswer order={question.order} answer={question.answer} />
          )}
        </div>
      ))}
    </>
  );
};

export default TFNG;
