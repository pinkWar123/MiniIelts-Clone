import { FunctionComponent } from "react";
import useTest from "../../hooks/useTest";
import { Button } from "antd";

interface CancelButtonProps {
  exerciseOrder: number;
}

const CancelButton: FunctionComponent<CancelButtonProps> = ({
  exerciseOrder,
}) => {
  const { handleDeleteExercise } = useTest();
  return (
    <>
      <Button
        onClick={() => handleDeleteExercise(exerciseOrder)}
        style={{ marginTop: "20px" }}
      >
        Cancel
      </Button>
    </>
  );
};

export default CancelButton;
