import { FunctionComponent, useState } from "react";
import { IExercise } from "../../../types/Model/Exercise";
import TFNG from "./TFNG";
import { QuestionTypeEnum } from "../../../contants/questionType";
import SummaryCompletion from "./SummaryCompletion";
import { TestBase } from "./base";
import MatchingHeading from "./MatchingHeadings";
import ChooseMany from "./ChooseMany";
import { Button, Divider, Flex, Typography } from "antd";
import MatchingInformation from "./MatchingInformation";
import YNNG from "./YNNG";
import Labelling from "./Labelling";
import ChooseOne from "./ChooseOne";
import SentenceCompletion from "./SentenceCompletion";
import SubmitButton from "../../Buttons/SubmitButton";
import useAnswers from "../../../hooks/useAnswers";
import parse from "html-react-parser";
import styles from "./RenderTest.module.scss";
import { CommentOutlined } from "@ant-design/icons";
interface TestProps {
  exercises: IExercise[];
  showAnswer?: boolean;
  mode: "review" | "do-test" | "edit-explanation";
  questionRefs?: React.RefObject<HTMLDivElement>[];
}

const Test: FunctionComponent<TestProps> = ({
  exercises,
  showAnswer,
  mode,
}) => {
  const { handleSubmit } = useAnswers();
  const [showExplanation, setShowExplanation] = useState<boolean[]>(
    Array.from(
      { length: exercises.flatMap((e) => e.questions).length },
      () => false
    )
  );
  const renderExercises = (exercise: IExercise, index: number) => {
    const {
      startQuestion,
      endQuestion,
      questions,
      content,
      description,
      choiceCount,
    } = exercise;
    const props: TestBase = {
      startQuestion,
      endQuestion,
      questions,
      content,
      description,
      showAnswer,
      choiceCount,
    };
    const renderExercise = () => {
      switch (exercise.exerciseType) {
        case QuestionTypeEnum.TFNG:
          return <TFNG {...props} key={`TFNG-${index}`} />;
        case QuestionTypeEnum.SummaryCompletion:
          return (
            <SummaryCompletion {...props} key={`SummaryCompletion-${index}`} />
          );
        case QuestionTypeEnum.MatchingHeadings:
          return (
            <MatchingHeading {...props} key={`MatchingHeading-${index}`} />
          );
        case QuestionTypeEnum.YNNG:
          return <YNNG {...props} key={`YNNG-${index}`} />;
        case QuestionTypeEnum.MultipleChoice:
          if (
            !exercise.chooseManyChoices ||
            exercise.chooseManyChoices.length === 0
          )
            return <ChooseOne {...props} key={`ChooseOne-${index}`} />;
          return (
            <ChooseMany
              {...props}
              key={`ChooseMany-${index}`}
              chooseManyChoices={exercise.chooseManyChoices}
            />
          );
        case QuestionTypeEnum.MatchingInformation:
          return (
            <MatchingInformation
              {...props}
              key={`Matching Information-${index}`}
            />
          );
        case QuestionTypeEnum.Labelling:
          return <Labelling {...props} key={`Labelling diagram-${index}`} />;

        case QuestionTypeEnum.SentenceCompletion:
          return (
            <SentenceCompletion
              {...props}
              key={`Sentence Completion-${index}`}
            />
          );
        default:
          return <></>;
      }
    };
    return (
      <div style={{ width: "98%" }}>
        <Typography.Title level={3}>
          Question {startQuestion} - {endQuestion}
        </Typography.Title>
        {renderExercise()}
        {mode === "review" &&
          Array.from(
            { length: endQuestion - startQuestion + 1 },
            (_, index) => (
              <div key={`explanation-${index + startQuestion}`}>
                <strong>
                  {index + startQuestion}. Answer:{" "}
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {exercise?.questions[index]?.answer}
                  </span>
                </strong>

                <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                  <Button
                    icon={<CommentOutlined />}
                    onClick={() =>
                      setShowExplanation((prev) =>
                        prev.map((value, _index) =>
                          _index === index ? !value : value
                        )
                      )
                    }
                  >
                    Explain
                  </Button>
                </div>

                <div
                  className={`${styles["explanation-wrapper"]} ${
                    showExplanation[index]
                      ? styles["expanded"]
                      : styles["collapsed"]
                  }`}
                >
                  <div className="explanation-content">
                    <Flex justify="center">
                      {parse(
                        exercise?.questions[index]?.explanation?.content ?? ""
                      )}
                    </Flex>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    );
  };
  return (
    <div style={{ paddingBottom: "200px" }}>
      <div>
        {exercises?.map((exercise, index) => renderExercises(exercise, index))}
      </div>
      {mode === "do-test" && (
        <div>
          <Divider />
          <Flex justify="center">
            <Typography.Title level={3}>End of the test</Typography.Title>
          </Flex>
          <Flex justify="center">
            <Typography.Title level={5}>
              Please submit to view your score and solutions
            </Typography.Title>
          </Flex>
          <Flex justify="center">
            <SubmitButton onClick={handleSubmit} />
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Test;
