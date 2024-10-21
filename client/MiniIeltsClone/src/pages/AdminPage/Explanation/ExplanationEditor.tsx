import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionTypeEnum } from "../../../contants/questionType";
import SummaryCompletion from "../../../components/DoTest/RenderTest/SummaryCompletion";
import MatchingHeading from "../../../components/DoTest/RenderTest/MatchingHeadings";
import YNNG from "../../../components/DoTest/RenderTest/YNNG";
import ChooseOne from "../../../components/DoTest/RenderTest/ChooseOne";
import ChooseMany from "../../../components/DoTest/RenderTest/ChooseMany";
import MatchingInformation from "../../../components/DoTest/RenderTest/MatchingInformation";
import Labelling from "../../../components/DoTest/RenderTest/Labelling";
import SentenceCompletion from "../../../components/DoTest/RenderTest/SentenceCompletion";
import { Button, FloatButton, Splitter, Typography } from "antd";
import { TestWithExplanationDto } from "../../../types/Responses/Test";
import {
  getTestWithExplanation,
  updateTestExplanation,
} from "../../../services/test";
import { IExercise } from "../../../types/Model/Exercise";
import TFNG from "../../../components/DoTest/RenderTest/TFNG";
import { TestBase } from "../../../components/DoTest/RenderTest/base";
import Editor from "../../../components/Editor/Editor";
import { IExplanation } from "../../../types/Model/Explanation";
import { IQuestionWithExplanation } from "../../../types/Model/Question";
import Essay from "../../../components/DoTest/Essay";
import { MemoizedEditor } from "./MemoizedEditor";

interface ExplanationEditorProps {}

const ExplanationEditor: FunctionComponent<ExplanationEditorProps> = () => {
  const { id } = useParams();
  const [test, setTest] = useState<TestWithExplanationDto>();
  const [explanations, setExplanations] = useState<IExplanation[]>([]);
  const [editing, setEditing] = useState<boolean[]>();
  const [editorContent, setEditorContent] = useState<string[]>();

  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return;
      const res = await getTestWithExplanation(parseInt(id));
      setTest(res.data);
      console.log(res);
      const exercises = res.data.exercises;
      const questions: IQuestionWithExplanation[] = [];
      exercises.forEach((exercise) =>
        exercise.questions.forEach((q) => questions.push(q))
      );
      const explanations: IExplanation[] = [];
      questions.forEach((question) => {
        const explanation = question.explanation;
        if (!explanation) {
          const e: IExplanation = {
            content: "",
            questionId: question.id,
          };
          explanations.push(e);
        } else explanations.push(explanation);
      });

      setExplanations(explanations);
      setEditing(Array.from({ length: questionCount }, () => false));
      setEditorContent(Array.from({ length: questionCount }, () => ""));
    };
    fetchTest();
  }, [id]);
  const exercises = test?.exercises;
  let questionCount = 0;
  exercises?.forEach((e) => (questionCount += e.questions.length));
  const submitExplanations = async () => {
    console.log(explanations);
    const a = document.querySelectorAll("div.ck-editor");
    const elements = [...a];
    const indices = editing
      ?.map((value, index) => (value === true ? index : -1))
      .filter((index) => index !== -1);
    const values: string[] = [];
    const submitDtos: { questionId: number; content: string }[] = [];
    const questions: IQuestionWithExplanation[] = [];
    test?.exercises.forEach((exercise) =>
      exercise.questions.forEach((q) => questions.push(q))
    );
    indices?.forEach((index) => {
      values.push(elements[index].innerHTML);
      submitDtos.push({
        content: explanations[index].content,
        questionId: questions[index].id,
      });
    });
    console.log(submitDtos);
    await updateTestExplanation({
      explanations: submitDtos,
    });
  };
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
      showAnswer: true,
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
      <div key={`explanation-${index}`}>
        <Typography.Title level={3}>
          Question {startQuestion} - {endQuestion}
        </Typography.Title>
        {renderExercise()}
        {Array.from(
          { length: endQuestion - startQuestion + 1 },
          (_, qIndex) => (
            <div
              key={`explanation-${qIndex + startQuestion}-exercise-${index}`}
            >
              <span>
                <strong>Question {qIndex + startQuestion}</strong>{" "}
                <span style={{ color: "red" }}>
                  {test?.exercises[index].questions[qIndex]?.answer}
                </span>
                <div>
                  <strong>Explanation:</strong>
                </div>
                <div>
                  <MemoizedEditor
                    editorHtml={
                      explanations[qIndex + startQuestion - 1]?.content
                    }
                    setEditorHtml={(value: string) => {
                      setExplanations((prevContents) => {
                        const newContents = [...prevContents];
                        newContents[qIndex + startQuestion - 1].content = value;
                        return newContents;
                      });
                    }}
                    disabled={
                      editing === undefined
                        ? true
                        : !editing[qIndex + startQuestion - 1]
                    }
                  />
                </div>
                <Button
                  shape="round"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  key={`edit-explanation-btn-${qIndex}-exercise-${index}`}
                  onClick={() => {
                    setEditing((prev) => {
                      if (!prev) return prev;
                      const newEditing = [...prev]; // Make a copy of the previous state
                      newEditing[qIndex + startQuestion - 1] = true; // Update the specific question's edit state
                      return newEditing; // Return the updated state
                    });
                  }}
                >
                  Edit explanation
                </Button>
              </span>
            </div>
          )
        )}
      </div>
    );
  };
  return (
    <>
      <Splitter>
        <Splitter.Panel>
          <Essay
            title={test?.title ?? ""}
            content={test?.essay ?? ""}
            picture={test?.picture}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          <div>
            {exercises?.map((exercise, index) =>
              renderExercises(exercise, index)
            )}
          </div>
        </Splitter.Panel>
      </Splitter>
      <FloatButton onClick={submitExplanations} />
    </>
  );
};

export default ExplanationEditor;
