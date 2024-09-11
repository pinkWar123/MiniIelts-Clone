import { FunctionComponent } from "react";
import { TestBase } from "./base";
import parse from "html-react-parser";
import SelectQuestion from "../Question/SelectQuestion";
import { generateABCOptions } from "../../../helpers/generateQuestionOptions";
interface MatchingInformationProps extends TestBase {}
import SelectAnswer from "../Answer/SelectAnswer";
const MatchingInformation: FunctionComponent<MatchingInformationProps> = ({
  startQuestion,
  content,
  questions,
  showAnswer,
  choiceCount,
}) => {
  return (
    <>
      {parse(content ?? "")}
      <div style={{ marginTop: "20px" }}>
        {questions.map((question, index) => (
          <>
            <SelectQuestion
              key={`matching-heading-${index + startQuestion}`}
              order={startQuestion + index}
              options={generateABCOptions(choiceCount ?? 0)}
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

export default MatchingInformation;
