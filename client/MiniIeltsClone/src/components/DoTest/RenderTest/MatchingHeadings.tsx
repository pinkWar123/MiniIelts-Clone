import { FunctionComponent } from "react";
import { TestBase } from "./base";
import parse from "html-react-parser";
import SelectQuestion from "../Question/SelectQuestion";
import { generateMatchingHeadingsOptions } from "../../../helpers/generateQuestionOptions";
import SelectAnswer from "../Answer/SelectAnswer";
interface MatchingHeadingProps extends TestBase {}
const MatchingHeading: FunctionComponent<MatchingHeadingProps> = ({
  startQuestion,
  content,
  questions,
  showAnswer,
  choiceCount,
}) => {
  console.log(generateMatchingHeadingsOptions(choiceCount ?? 0));
  console.log(content);
  return (
    <>
      {parse(content ?? "")}
      <div style={{ marginTop: "20px" }}>
        {questions.map((question, index) => (
          <>
            <SelectQuestion
              key={`matching-heading-${index + startQuestion}`}
              order={startQuestion + index}
              options={generateMatchingHeadingsOptions(choiceCount ?? 0)}
              content={question.content ?? ""}
              showAnswer={showAnswer}
            />
            {showAnswer && (
              <SelectAnswer order={question.order} answer={question.answer} />
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default MatchingHeading;
