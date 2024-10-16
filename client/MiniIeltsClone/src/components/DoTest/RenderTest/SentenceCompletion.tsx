import { FunctionComponent } from "react";
import { TestBase } from "./base";
import useAnswers from "../../../hooks/useAnswers";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { Input } from "antd";
import Answer from "../../Answer/Answer";

interface SentenceCompletionProps extends TestBase {}

const SentenceCompletion: FunctionComponent<SentenceCompletionProps> = ({
  questions,
  startQuestion,
  showAnswer,
}) => {
  const { handleUpdateAnswer, getAnswerByOrder } = useAnswers();
  const convertSentenceToInputs = (htmlString: string, index: number) => {
    // Normalize the string by replacing &nbsp; with spaces
    const normalizedHtmlString = htmlString.replace(/&nbsp;/g, " ");

    // Regex to find all instances of `_____` (with or without spaces around it)
    const regex = /_____+/g;

    // Replace `_____` with placeholder
    let count = -1;
    const placeholders = normalizedHtmlString.replace(regex, () => {
      count++;
      return `<input data-placeholder="${count}" />`;
    });

    // Convert HTML with placeholders into React elements
    const options: HTMLReactParserOptions = {
      replace: (domNode: DOMNode) => {
        // Type guard to check if domNode is an Element
        if (domNode.type === "tag" && (domNode as Element).name === "input") {
          const element = domNode as Element;

          if (element.attribs && element.attribs["data-placeholder"]) {
            const placeholderIndex: string =
              element.attribs["data-placeholder"];
            console.log(placeholderIndex);
            return (
              <>
                <span>
                  <Input
                    disabled={showAnswer}
                    value={getAnswerByOrder(index + startQuestion)?.value}
                    key={index + startQuestion}
                    style={{
                      width: "100px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    id={`question-${index + startQuestion}`}
                    onChange={(e) => {
                      handleUpdateAnswer(index + startQuestion, e.target.value);
                    }}
                  />
                </span>
                <span>
                  {showAnswer && <Answer answer={questions[index]?.answer} />}
                </span>
              </>
            );
          }
        }
      },
    };

    return parse(placeholders, options);
  };

  return (
    <>
      {questions.map((q, index) => (
        <div key={`sentence-completion-${index + startQuestion}`}>
          <strong>{index + startQuestion}. </strong>
          {convertSentenceToInputs(q.content ?? "", index)}
        </div>
      ))}{" "}
    </>
  );
};

export default SentenceCompletion;
