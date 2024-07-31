import { FunctionComponent } from "react";
import { Col, Row } from "antd";
import AnswerContent from "./AnswerContent";
import QuestionContent from "./QuestionContent";

interface QuestionProps {
  exerciseOrder: number;
  questionOrder: number;
  type: "select" | "input";
  options?: { value: string; label: string }[];
  hasQuestion?: boolean;
}

const Question: FunctionComponent<QuestionProps> = ({
  exerciseOrder,
  questionOrder,
  type,
  options,
  hasQuestion = true,
}) => {
  return (
    <Row gutter={16} style={{ marginTop: "20px" }}>
      <Col span={1}>{questionOrder}</Col>
      {hasQuestion && (
        <Col span={16}>
          <QuestionContent
            exerciseOrder={exerciseOrder}
            questionOrder={questionOrder}
          />
        </Col>
      )}
      <Col span={6}>
        <AnswerContent
          exerciseOrder={exerciseOrder}
          questionOrder={questionOrder}
          type={type}
          options={options}
        />
      </Col>
    </Row>
  );
};

export default Question;
