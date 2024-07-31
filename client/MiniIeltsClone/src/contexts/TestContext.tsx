import React, { createContext, useState, ReactNode } from "react";
import { ITest } from "../types/Model/Test";
import { IExercise } from "../types/Model/Exercise";
import { IQuestion } from "../types/Model/Question";
import { IChoice } from "../types/Model/Choice";

export interface TestContextProps {
  test: ITest | null;
  setTest: React.Dispatch<React.SetStateAction<ITest | null>>;
  handleUpdateQuestion: (
    value: IQuestion,
    exerciseOrder: number,
    questionOrder: number
  ) => void;
  handleUpdateExercise: (value: IExercise, exerciseOrder: number) => void;
  handleAddExercise: (exercise: IExercise) => void;
  handleDeleteExercise: (exerciseOrder: number) => void;
  findQuestion: (
    exerciseOrder: number,
    questionOrder: number
  ) => IQuestion | undefined;
  findExercise: (exerciseOrder: number) => IExercise | undefined;
  findExerciseChoice: (
    exerciseOrder: number,
    choiceOrder: number
  ) => IChoice | undefined;
  handleUpdateChoice: (
    exerciseOrder: number,
    questionOrder: number,
    choiceOrder: number,
    newChoice: IChoice
  ) => void;
  handleUpdateExerciseChoice: (
    exerciseOrder: number,
    choiceOrder: number,
    newChoice: IChoice
  ) => void;
}

export const TestContext = createContext<TestContextProps | undefined>(
  undefined
);

export const TestProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [test, setTest] = useState<ITest | null>(null);
  const handleUpdateQuestion = (
    value: IQuestion,
    exerciseOrder: number,
    questionOrder: number
  ) => {
    const exercise = test?.exercises.find(
      (exercise) => exercise.order === exerciseOrder
    );
    if (!exercise) return;
    setTest((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: prev.exercises.map((exercise) => {
          if (exercise.order === exerciseOrder) {
            exercise.questions = exercise.questions.map((question) =>
              question.order === questionOrder ? value : question
            );
          }
          return exercise;
        }),
      } as ITest;
    });
  };
  const handleUpdateExercise = (value: IExercise, exerciseOrder: number) => {
    setTest((prev) => {
      if (!prev) return prev;
      let newExcerises = prev.exercises;
      if (newExcerises.length > 0) {
        newExcerises = prev.exercises.map((exercise) =>
          exercise.order === exerciseOrder ? value : exercise
        );
      }
      return { ...prev, exercises: newExcerises } as ITest;
    });
  };
  const handleAddExercise = (exercise: IExercise) => {
    if (exercise) {
      setTest(
        (prev) =>
          ({
            ...prev,
            exercises: prev?.exercises
              ? [...prev.exercises, exercise]
              : [exercise],
          } as ITest)
      );
    }
  };
  const handleDeleteExercise = (exerciseOrder: number) => {
    if (!test?.exercises || test.exercises.length === 0) return;
    setTest((prev) => {
      if (!prev) return prev;
      const exerciseToRemove = test?.exercises.find(
        (exercise) => exercise.order === exerciseOrder
      );
      if (!exerciseToRemove) return prev;
      let newExercises = test.exercises.filter(
        (exercise) => exercise.order !== exerciseOrder
      );
      if (newExercises.length < test.exercises.length) {
        newExercises = newExercises.map((newExercise) => {
          if (newExercise.order < exerciseOrder) return newExercise;
          newExercise.order -= 1;
          newExercise.questions = newExercise.questions.map((question) => ({
            ...question,
            order: question.order - exerciseToRemove.questionCount,
          }));
          newExercise.startQuestion -= exerciseToRemove.questionCount;
          newExercise.endQuestion -= exerciseToRemove.questionCount;
          return newExercise;
        }) as IExercise[];
      }
      const newTest = {
        ...prev,
        exercises: newExercises,
      } as ITest;
      return newTest;
    });
  };
  const findQuestion = (exerciseOrder: number, questionOrder: number) => {
    return test?.exercises
      ?.find((exercise) => exercise.order === exerciseOrder)
      ?.questions?.find((question) => question.order === questionOrder);
  };
  const findExercise = (exericseOrder: number) => {
    return test?.exercises?.find(
      (exercise) => exercise.order === exericseOrder
    );
  };
  const handleUpdateChoice = (
    exerciseOrder: number,
    questionOrder: number,
    choiceOrder: number,
    newChoice: IChoice
  ) => {
    const question = findQuestion(exerciseOrder, questionOrder);
    if (!question) return;
    const newQuestion = {
      ...question,
      choices: question.choices?.map((choice) => {
        if (choice.order !== choiceOrder) return choice;
        return newChoice;
      }),
    };
    handleUpdateQuestion(newQuestion, exerciseOrder, questionOrder);
  };

  const handleUpdateExerciseChoice = (
    exerciseOrder: number,
    choiceOrder: number,
    newChoice: IChoice
  ) => {
    const exercise = findExercise(exerciseOrder);
    if (!exercise) return;
    const newChoices = exercise.chooseManyChoices?.map((choice) => {
      if (choice.order !== choiceOrder) return choice;
      return newChoice;
    });
    const newExecise: IExercise = {
      ...exercise,
      chooseManyChoices: newChoices,
    };
    handleUpdateExercise(newExecise, exerciseOrder);
  };
  const findExerciseChoice = (exerciseOrder: number, choiceOrder: number) => {
    return findExercise(exerciseOrder)?.chooseManyChoices?.find(
      (choice) => choice.order === choiceOrder
    );
  };

  return (
    <TestContext.Provider
      value={{
        test,
        setTest,
        handleUpdateQuestion,
        handleUpdateExercise,
        handleAddExercise,
        handleDeleteExercise,
        findQuestion,
        findExercise,
        findExerciseChoice,
        handleUpdateChoice,
        handleUpdateExerciseChoice,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
