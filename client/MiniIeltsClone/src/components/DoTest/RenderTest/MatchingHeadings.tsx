import { FunctionComponent } from "react";
import { TestBase } from "./base";
import parse from "html-react-parser";
import SelectQuestion from "../Question/SelectQuestion";
import { generateMatchingHeadingsOptions } from "../../../helpers/generateQuestionOptions";
import SelectAnswer from "../Answer/SelectAnswer";
interface MatchingHeadingProps extends TestBase {}
const extractRomanNumerals = (htmlString: string) => {
  // Sử dụng DOMParser để phân tích cú pháp HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Lấy tất cả các thẻ <strong>
  const strongTags = doc.querySelectorAll("strong");

  // Lưu trữ các số La Mã
  const romanNumerals: string[] = [];

  // Duyệt qua tất cả các thẻ <strong> và trích xuất các số La Mã
  strongTags.forEach((tag) => {
    const text = tag?.textContent?.trim();
    if (!text) return [];
    if (/^[ivx]+$/i.test(text.replace(/ /g, ""))) {
      romanNumerals.push(text.replace(/ /g, ""));
    }
  });

  return romanNumerals;
};
const MatchingHeading: FunctionComponent<MatchingHeadingProps> = ({
  startQuestion,
  content,
  questions,
  showAnswer,
}) => {
  console.log(extractRomanNumerals(content ?? ""));
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
              options={generateMatchingHeadingsOptions(
                extractRomanNumerals(content ?? "")?.length ?? 1
              )}
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
