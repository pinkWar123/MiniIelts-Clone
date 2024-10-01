import { FunctionComponent } from "react";
import { Col, Row, Typography } from "antd";
import Answer from "./Answer";
import styles from "./FullTestResultPage.module.scss";
export interface AnswerListProps {
  keys: { value: string; userAnswer?: string; order: number }[];
  part: number;
  startQuestion: number;
  endQuestion: number;
  showUserAnswer?: boolean;
}

const AnswerList: FunctionComponent<AnswerListProps> = ({
  keys,
  part,
  startQuestion,
  endQuestion,
  showUserAnswer,
}) => {
  const midIndex = Math.ceil(keys.length / 2);
  const leftColumn = keys.slice(0, midIndex);
  const rightColumn = keys.slice(midIndex);
  return (
    <div style={{ marginBottom: "40px" }}>
      <Typography.Title level={4} className={styles["title"]}>
        Part {part}: {startQuestion} - {endQuestion}
      </Typography.Title>
      <Row style={{ width: "100%" }}>
        <Col span={12} style={{ lineHeight: "35px" }}>
          {leftColumn.map((key) => (
            <div>
              <Answer
                value={key.value}
                order={key.order}
                userAnswer={key.userAnswer}
                showUserAnswer={showUserAnswer}
              />
            </div>
          ))}
        </Col>
        <Col span={12} style={{ lineHeight: "35px" }}>
          {rightColumn.map((key) => (
            <div>
              <Answer
                value={key.value}
                order={key.order}
                userAnswer={key.userAnswer}
                showUserAnswer={showUserAnswer}
              />
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default AnswerList;
