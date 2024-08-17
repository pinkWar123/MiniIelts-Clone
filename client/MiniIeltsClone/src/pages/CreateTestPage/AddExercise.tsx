import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Divider, Flex, Form, Select } from "antd";
import TypedInputNumber from "antd/es/input-number";
import { FunctionComponent, useState } from "react";
import { QuestionTypeEnum } from "../../contants/questionType";
import useTest from "../../hooks/useTest";
import { IExercise } from "../../types/Model/Exercise";
import { IQuestion } from "../../types/Model/Question";
import { convertQuestionTypeEnumToDescription } from "../../helpers/convertQuestionType";

interface AddExerciseProps {}

const AddExercise: FunctionComponent<AddExerciseProps> = () => {
  const questionTypeOptions = Object.keys(QuestionTypeEnum)
    .filter((key) => isNaN(Number(key))) // Filters out numeric keys
    .map((key) => ({
      value: QuestionTypeEnum[key as keyof typeof QuestionTypeEnum],
      label: convertQuestionTypeEnumToDescription(
        QuestionTypeEnum[key as keyof typeof QuestionTypeEnum]
      ),
    }));

  console.log(questionTypeOptions);
  const [numOfQuestions, setNumOfQuestions] = useState<number>(0);
  const [questionType, setQuestionType] = useState<QuestionTypeEnum>(
    QuestionTypeEnum.TFNG
  );
  const { test, handleAddExercise } = useTest();
  const { message } = App.useApp();
  const addExercise = () => {
    if (numOfQuestions === 0) {
      message.error("Input number of questions");
      return;
    } else if (questionType === undefined) {
      message.error("Input type of question");
      return;
    }
    const exercises = test?.exercises;
    let questionsSoFar: number = 0;
    if (exercises?.length && exercises.length > 0) {
      questionsSoFar = exercises
        .map((value) => value.questionCount)
        .reduce((acc, cur) => acc + cur, 0);
    }
    const questions = Array.from(
      { length: numOfQuestions },
      (_, index) => index + 1 + questionsSoFar
    ).map((value) => {
      const question: IQuestion = {
        order: value,
        answer: "",
        questionType: questionType,
        content: "",
      };
      return question;
    });
    const newExercise: IExercise = {
      order: test?.exercises?.length ? test?.exercises?.length + 1 : 1,
      questionCount: numOfQuestions,
      startQuestion: questionsSoFar + 1,
      endQuestion: questionsSoFar + numOfQuestions,
      exerciseType: questionType,
      questions: questions,
      content: "",
    };
    handleAddExercise(newExercise);
  };
  return (
    <>
      <Divider style={{ color: "red" }} orientation="left" plain>
        <Flex gap={"large"}>
          <Button onClick={addExercise}>
            <PlusOutlined /> Create new exercise
          </Button>
          <Form.Item label="Question count">
            <TypedInputNumber<number>
              onChange={(value) => setNumOfQuestions(value ?? 0)}
              value={numOfQuestions}
            />
          </Form.Item>
          <Form.Item
            label="Question type:"
            required
            style={{ marginLeft: "80px" }}
          >
            <Select
              options={questionTypeOptions}
              onChange={(value) => setQuestionType(value)}
              style={{ width: "200px" }}
              value={questionType}
            />
          </Form.Item>
        </Flex>
      </Divider>
    </>
  );
};

export default AddExercise;
