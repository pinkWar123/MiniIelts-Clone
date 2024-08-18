import { FunctionComponent } from "react";
import { TestBase } from "./base";
import parse from "html-react-parser";
import SelectQuestion from "../Question/SelectQuestion";
import { generateABCOptions } from "../../../helpers/generateQuestionOptions";
interface MatchingInformationProps extends TestBase {}

const MatchingInformation: FunctionComponent<MatchingInformationProps> = ({
  startQuestion,
  endQuestion,
  content,
  questions,
}) => {
  console.log(questions);
  const extractABC = (htmlString: string) => {
    // Sử dụng DOMParser để phân tích cú pháp HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Lấy tất cả các thẻ <strong>
    const strongTags = doc.querySelectorAll("strong");

    // Lưu trữ các số La Mã
    return strongTags.length;
  };
  return (
    <>
      {parse(content ?? "")}
      <div style={{ marginTop: "20px" }}>
        {questions.map((question, index) => (
          <SelectQuestion
            key={`matching-heading-${index + startQuestion}`}
            order={startQuestion + index}
            options={generateABCOptions(extractABC(content))}
            content={question.content ?? ""}
          />
        ))}
      </div>
    </>
  );
};

export default MatchingInformation;
