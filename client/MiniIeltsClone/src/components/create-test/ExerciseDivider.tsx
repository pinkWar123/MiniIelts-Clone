import { Divider, Typography } from "antd";
import { FunctionComponent } from "react";
import { QuestionTypeDescriptionEnum } from "../../contants/questionType";

interface ExerciseDividerProps {
  exerciseName: QuestionTypeDescriptionEnum;
  exerciseOrder: number;
}

const ExerciseDivider: FunctionComponent<ExerciseDividerProps> = ({
  exerciseName,
  exerciseOrder,
}) => {
  return (
    <Divider>
      <Typography.Title level={3}>
        {exerciseOrder}. {exerciseName}
      </Typography.Title>
    </Divider>
  );
};

export default ExerciseDivider;
