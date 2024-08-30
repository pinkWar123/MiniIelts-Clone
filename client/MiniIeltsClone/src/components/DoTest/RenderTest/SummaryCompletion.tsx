import { FunctionComponent } from "react";
import { TestBase } from "./base";
import parse from "html-react-parser";
import { Input } from "antd";
import useAnswers from "../../../hooks/useAnswers";
import Answer from "../../Answer/Answer";
interface SummaryCompletionProps extends TestBase {}

const SummaryCompletion: FunctionComponent<SummaryCompletionProps> = ({
  questions,
  content,
  startQuestion,
  showAnswer,
}) => {
  const { handleUpdateAnswer } = useAnswers();
  const convertToInputs = (htmlString: string) => {
    // Regex để tìm tất cả các trường hợp `strong` có chứa `_____`
    const normalizedHtmlString = htmlString.replace(/&nbsp;/g, " ");

    // Regex để tìm tất cả các trường hợp strong có chứa số và _____ có hoặc không có khoảng trắng
    const regex = /<strong>\s*(\d+)\s*<\/strong>\s*_____\s*/g;

    // Thay thế các trường hợp `strong` có chứa `_____` bằng placeholder
    let count = 0;
    const placeholders = normalizedHtmlString.replace(regex, (match, p1) => {
      return `<strong>${p1}</strong><input data-placeholder="${count++}" />`;
    });

    // Chuyển đổi HTML có placeholder thành các phần tử React
    const options = {
      replace: (domNode) => {
        if (
          domNode.name === "input" &&
          domNode.attribs &&
          domNode.attribs["data-placeholder"]
        ) {
          const count: string = domNode.attribs["data-placeholder"];
          return (
            <>
              <span>
                <Input
                  disabled={showAnswer}
                  key={count + startQuestion}
                  style={{ width: "100px" }}
                  onChange={(e) => {
                    handleUpdateAnswer(
                      parseInt(count) + startQuestion,
                      e.target.value
                    );
                  }}
                />
              </span>
              <span>
                {showAnswer && (
                  <Answer answer={questions[parseInt(count)]?.answer} />
                )}
              </span>
            </>
          );
        }
      },
    };

    return parse(placeholders, options);
  };

  return <>{convertToInputs(content ?? "")}</>;
};

export default SummaryCompletion;
