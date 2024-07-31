import { Col, Flex, Progress, Row, Typography } from "antd";
import { FunctionComponent } from "react";
import StatDisplayItem from "./StatDisplayItem";
import styles from "./Performance.module.scss";
interface PerformanceProps {
  correct: number;
  incorrect: number;
  unanswered: number;
  questionCount: number;
  marks: number;
  timeTaken: string;
}

const Performance: FunctionComponent<PerformanceProps> = ({
  correct,
  incorrect,
  unanswered,
  questionCount,
  marks,
  timeTaken,
}) => {
  return (
    <>
      <Flex justify="center">
        <Typography.Title level={3}>
          Your Band Score:{" "}
          <Typography.Text className={styles["marks"]} strong>
            {marks} / 9
          </Typography.Text>
        </Typography.Title>
      </Flex>

      <Progress
        percent={parseFloat(((correct / questionCount) * 100).toFixed(2))}
        percentPosition={{ align: "center", type: "inner" }}
        size={["100%", 25]}
        strokeColor={"green"}
      />

      <div className={styles["stat"]}>
        <Row>
          <Col span={8}>
            <p>
              <StatDisplayItem title="Total Questions" value={questionCount} />
            </p>
            <StatDisplayItem title="Marks" value={marks} />
            <StatDisplayItem title="Time Taken" value={timeTaken} />
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <StatDisplayItem title="Correct" value={correct} variant="green" />
            <StatDisplayItem
              title="Incorrect"
              value={incorrect}
              variant="orange"
            />
            <StatDisplayItem
              title="Unanswered"
              value={unanswered}
              variant="yellow"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Performance;
