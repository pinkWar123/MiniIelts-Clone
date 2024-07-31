import { FunctionComponent, useEffect, useState } from "react";
import { IExerciseProps } from "../exerciseProps";
import { Checkbox, Flex, Form, GetProp, Input } from "antd";
import useTest from "../../../../hooks/useTest";
import { IExercise } from "../../../../types/Model/Exercise";
import TypedInputNumber from "antd/es/input-number";
import { IChoice } from "../../../../types/Model/Choice";
import { IQuestion } from "../../../../types/Model/Question";

interface ChooseManyProps extends IExerciseProps {
  exerciseOrder: number;
}

const ChooseMany: FunctionComponent<ChooseManyProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const [choiceCount, setChoiceCount] = useState<number>(5);
  const {
    handleUpdateExercise,
    findExercise,
    handleUpdateExerciseChoice,
    findExerciseChoice,
  } = useTest();
  useEffect(() => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const prevLength = exercise?.chooseManyChoices?.length ?? 0;
    let chooseManyChoices = exercise?.chooseManyChoices?.length
      ? [...exercise.chooseManyChoices]
      : [];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (prevLength < choiceCount) {
      const diff = choiceCount - prevLength;
      for (let i = 0; i < diff; i++) {
        const newChoice: IChoice = {
          content: "",
          value: letters[prevLength + i],
          order: prevLength + i + 1,
        };
        chooseManyChoices.push(newChoice);
      }
    } else if (prevLength > choiceCount) {
      chooseManyChoices = chooseManyChoices.slice(0, choiceCount);
    }
    const newQuestions = exercise.questions.map((question) => {
      return {
        order: question.order,
        content: "",
        answer: "",
        choices: undefined,
        questionType: question.questionType,
      } as IQuestion;
    });
    const newExercise: IExercise = {
      ...exercise,
      chooseManyChoices,
      questions: newQuestions,
    };
    handleUpdateExercise(newExercise, exerciseOrder);
  }, [choiceCount, exerciseOrder]);
  const renderChoices = () => {
    return Array.from({ length: choiceCount }, (_, order) => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return (
        <div key={`choosemany-${order}`}>
          <Checkbox value={letters[order]}>
            <Flex gap={"small"}>
              {letters[order]}.{" "}
              <Input
                id={`choosemany-input-${order + 1}`}
                onChange={(e) => {
                  const oldChoice = findExerciseChoice(
                    exerciseOrder,
                    order + 1
                  );
                  if (!oldChoice) return;
                  const newChoice: IChoice = {
                    ...oldChoice,
                    content: e.target.value,
                  };
                  handleUpdateExerciseChoice(
                    exerciseOrder,
                    order + 1,
                    newChoice
                  );
                }}
              />
            </Flex>
          </Checkbox>
        </div>
      );
    });
  };
  const handleChangeQuestion = (content: string) => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const newExercise: IExercise = { ...exercise, content };
    handleUpdateExercise(newExercise, exerciseOrder);
  };
  const handleCheckboxGroupChange: GetProp<
    typeof Checkbox.Group,
    "onChange"
  > = (values) => {
    const answer = values.join("");
    const exercise = findExercise(exerciseOrder);
    const questions = exercise?.questions;
    if (!questions || questions.length === 0) return;
    const newQuestions: IQuestion[] = questions.map((question) => ({
      ...question,
      answer,
    }));
    const newExercise: IExercise = { ...exercise, questions: newQuestions };
    handleUpdateExercise(newExercise, exerciseOrder);
  };

  return (
    <>
      <Form.Item label="Question: " required>
        <Input onChange={(e) => handleChangeQuestion(e.target.value)} />
      </Form.Item>
      <Form.Item label="Number of choices: " required>
        <TypedInputNumber<number>
          onChange={(value) => setChoiceCount(value ?? 5)}
          defaultValue={5}
          min={endQuestion - startQuestion + 1}
        />
      </Form.Item>
      <Checkbox.Group onChange={handleCheckboxGroupChange}>
        {renderChoices()}
      </Checkbox.Group>
    </>
  );
};

export default ChooseMany;
