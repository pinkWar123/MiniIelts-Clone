import { FunctionComponent } from "react";
import { TestBase } from "./base";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
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
    const placeholders = normalizedHtmlString.replace(regex, (_, p1) => {
      return `<strong>${p1}</strong><input data-placeholder="${count++}" />`;
    });

    // Chuyển đổi HTML có placeholder thành các phần tử React
    const options: HTMLReactParserOptions = {
      replace: (domNode: DOMNode) => {
        // Type guard to check if domNode is an Element
        if (domNode.type === "tag" && (domNode as Element).name === "input") {
          const element = domNode as Element;

          if (element.attribs && element.attribs["data-placeholder"]) {
            const placeholderIndex: string =
              element.attribs["data-placeholder"];

            return (
              <>
                <span>
                  <Input
                    disabled={showAnswer}
                    key={placeholderIndex + startQuestion}
                    style={{
                      width: "100px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    onChange={(e) => {
                      handleUpdateAnswer(
                        parseInt(placeholderIndex) + startQuestion,
                        e.target.value
                      );
                    }}
                  />
                </span>
                <span>
                  {showAnswer && (
                    <Answer
                      answer={questions[parseInt(placeholderIndex)]?.answer}
                    />
                  )}
                </span>
              </>
            );
          }
        }
      },
    };

    return parse(placeholders, options);
  };

  return <>{convertToInputs(content ?? "")}</>;
};

export default SummaryCompletion;
