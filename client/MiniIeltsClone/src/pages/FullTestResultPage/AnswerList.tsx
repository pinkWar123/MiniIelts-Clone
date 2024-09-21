import { FunctionComponent } from "react";
import { TestKeyDto } from "../../types/Responses/fullTest";
import { Col, Row, Typography } from "antd";
import Answer from "./Answer";
import styles from "./FullTestResultPage.module.scss";
interface AnswerListProps {
  testKey: TestKeyDto;
}

const AnswerList: FunctionComponent<AnswerListProps> = ({ testKey }) => {
  const midIndex = Math.ceil(testKey.keys.length / 2);
  const leftColumn = testKey.keys.slice(0, midIndex);
  const rightColumn = testKey.keys.slice(midIndex);
  return (
    <div style={{ marginBottom: "40px" }}>
      <Typography.Title level={4} className={styles["title"]}>
        Part {testKey.part}: {testKey.startQuestion} - {testKey.endQuestion}
      </Typography.Title>
      <Row style={{ width: "100%" }}>
        <Col span={12} style={{ lineHeight: "35px" }}>
          {leftColumn.map((key) => (
            <div>
              <Answer value={key.answer} order={key.order} />
            </div>
          ))}
        </Col>
        <Col span={12} style={{ lineHeight: "35px" }}>
          {rightColumn.map((key) => (
            <div>
              <Answer value={key.answer} order={key.order} />
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default AnswerList;
