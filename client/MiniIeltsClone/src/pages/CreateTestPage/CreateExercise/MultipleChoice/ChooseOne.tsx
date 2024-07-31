import { FunctionComponent, useEffect, useState } from "react";
import { IExerciseProps } from "../exerciseProps";
import ChooseOneQuestion from "../Question/MultipleChoice/ChooseOneQuestion";
import useTest from "../../../../hooks/useTest";
import { IChoice } from "../../../../types/Model/Choice";
import { IExercise } from "../../../../types/Model/Exercise";
import { Form } from "antd";
import TypedInputNumber from "antd/es/input-number";

interface ChooseOneProps extends IExerciseProps {
  exerciseOrder: number;
}

const ChooseOne: FunctionComponent<ChooseOneProps> = ({
  startQuestion,
  endQuestion,
  exerciseOrder,
}) => {
  const { findExercise, handleUpdateExercise } = useTest();
  const [choiceCount, setChoiceCount] = useState<number>(4);
  useEffect(() => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const questions =
      exercise?.questions?.length > 0 ? [...exercise.questions] : [];
    const newQuestions = questions?.map((question) => {
      const prevLength = question?.choices?.length ?? 0;
      const newQuestion = { ...question };
      if (prevLength < choiceCount) {
        const diff = choiceCount - prevLength;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        newQuestion.choices = question?.choices ? [...question.choices] : [];
        for (let i = 0; i < diff; i++) {
          const newChoice: IChoice = {
            value: letters[prevLength + i],
            content: "",
            order: prevLength + i + 1,
          };

          newQuestion.choices.push(newChoice);
        }
      } else {
        newQuestion.choices = newQuestion.choices?.slice(0, choiceCount);
      }
      return newQuestion;
    });
    const newExercise: IExercise = {
      ...exercise,
      questions: newQuestions,
      chooseManyChoices: undefined,
    };
    handleUpdateExercise(newExercise, exerciseOrder);
  }, [choiceCount, exerciseOrder]);
  const renderChoices = () => {
    return (
      <>
        <Form.Item label="Number of choices">
          <TypedInputNumber
            min={2}
            defaultValue={4}
            value={choiceCount}
            onChange={(value) => setChoiceCount(value ?? 4)}
          />
        </Form.Item>
        {Array.from({ length: endQuestion - startQuestion + 1 }, (_, order) => {
          const questionOrder = startQuestion + order;
          return (
            <ChooseOneQuestion
              questionOrder={questionOrder}
              choiceCount={choiceCount}
              exerciseOrder={exerciseOrder}
            />
          );
        })}
      </>
    );
  };
  return <>{renderChoices()}</>;
};

export default ChooseOne;
