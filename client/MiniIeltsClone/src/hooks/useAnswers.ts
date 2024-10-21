import { useContext } from "react";
import {
  AnswersContext,
  AnswersContextProps,
} from "../contexts/AnswertContext";

const useAnswers = (): AnswersContextProps => {
  const context = useContext(AnswersContext);
  if (!context) {
    throw new Error("useAnswer must be used within a AnswersProvider");
  }
  return context;
};

export default useAnswers;
