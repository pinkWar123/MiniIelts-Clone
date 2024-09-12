import { FunctionComponent } from "react";
import Question from "./Question/Question";
import CancelButton from "../../../components/create-test/CancelButton";

interface ExerciseProps {
  start: number;
  end: number;
  exerciseOrder: number;
  type: "input" | "select";
  choiceCount?: number;
  options: { label: string; value: string }[];
}

const Exercise: FunctionComponent<ExerciseProps> = ({
  start,
  end,
  exerciseOrder,
  type,
  options,
}) => {
  const inputs = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  return (
    <>
      {inputs.map((input, index) => (
        <Question
          key={`question-${index}`}
          exerciseOrder={exerciseOrder}
          questionOrder={input}
          type={type}
          options={options}
        />
      ))}
      <CancelButton exerciseOrder={exerciseOrder} />
    </>
  );
};

export default Exercise;
