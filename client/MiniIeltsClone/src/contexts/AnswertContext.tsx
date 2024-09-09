import React, { createContext, useState, ReactNode } from "react";
import { IDoTestAnswer } from "../types/Model/Answer";
import { useNavigate, useParams } from "react-router-dom";
import { submitTest } from "../services/test";
import { TestSubmitDto } from "../types/Request/Test";
import { message } from "antd";
import useUser from "../hooks/useUser";

export interface AnswersContextProps {
  answers: IDoTestAnswer[] | null;
  setAnswers: React.Dispatch<React.SetStateAction<IDoTestAnswer[] | null>>;
  handleUpdateAnswer: (order: number, newValue: string) => void;
  handleSubmit: (time: number) => void;
  getAnswerByOrder: (order: number) => IDoTestAnswer | undefined;
}

export const AnswersContext = createContext<AnswersContextProps | undefined>(
  undefined
);

export const AnswersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = useState<IDoTestAnswer[] | null>(null);
  const { user } = useUser();
  const { id } = useParams();
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
  const handleSubmit = async (time: number) => {
    if (!id) return;
    const testSubmitDto: TestSubmitDto = {
      questionSubmitDtos: [],
      time,
    };
    let order = 1;
    answers?.forEach((answer) =>
      testSubmitDto.questionSubmitDtos.push({
        order: order++,
        value: answer.value,
        questionType: answer.questionType,
      })
    );
    if (user) {
      const res = await submitTest(parseInt(id), testSubmitDto);
      if (res.data) {
        console.log(res.data);
        navigate(`/result/${res.data.resultId}`);
      } else message.error({ content: "Submit test failed" });
      return;
    }
    let url = "./result?";
    answers?.forEach((answer) => (url += `a=${answer.value}&`));
    url = url.slice(0, -1);
    url += `&time=${testSubmitDto.time}`;
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
