import React, { createContext, useState, ReactNode } from "react";
import { IDoTestAnswer } from "../types/Model/Answer";
import { useNavigate } from "react-router-dom";

export interface AnswersContextProps {
  answers: IDoTestAnswer[] | null;
  setAnswers: React.Dispatch<React.SetStateAction<IDoTestAnswer[] | null>>;
  handleUpdateAnswer: (order: number, newValue: string) => void;
  handleSubmit: () => void;
  getAnswerByOrder: (order: number) => IDoTestAnswer | undefined;
}

export const AnswersContext = createContext<AnswersContextProps | undefined>(
  undefined
);

export const AnswersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = useState<IDoTestAnswer[] | null>(null);
  const navigate = useNavigate();
  const handleUpdateAnswer = (order: number, newValue: string) => {
    setAnswers((prev) => {
      if (!prev || prev.length === 0) return prev;
      return prev.map((answer) =>
        answer.order === order
          ? {
              ...answer,
              value: newValue,
            }
          : answer
      );
    });
  };
  const handleSubmit = async () => {
    let url = "./result?";
    answers?.forEach((answer) => (url += `a=${answer.value}&`));
    url = url.slice(0, -1);
    navigate(url);
  };

  const getAnswerByOrder = (order: number) => {
    if (!answers || order > answers?.length) return undefined;
    return answers[order - 1];
  };

  return (
    <AnswersContext.Provider
      value={{
        answers,
        setAnswers,
        handleUpdateAnswer,
        handleSubmit,
        getAnswerByOrder,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
};
