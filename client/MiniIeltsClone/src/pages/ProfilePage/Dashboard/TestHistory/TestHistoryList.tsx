import { Card, Col, Flex, Row, Typography } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "../Dashboard.module.scss";
import testStyles from "./TestHistoryList.module.scss";
import { TestHistory } from "../../../../types/Responses/history";
import dayjs from "dayjs";
import { convertSecondsToMinuteAndSecond } from "../../../../helpers/time";
import ReviewButton from "./ReviewButton";
import HistoryItem from "./HistoryItem";
interface TestHistoryProps {
  histories: TestHistory[];
  type: "test" | "full-test" | "listening";
}

const breakpoint = 768;

const TestHistoryList: FunctionComponent<TestHistoryProps> = ({
  histories,
  type,
}) => {
  const [renderAsCard, setRenderAsCard] = useState<boolean>(
    window.innerWidth < breakpoint
  );
  useEffect(() => {
    function handleResize() {
      setRenderAsCard(window.innerWidth < breakpoint);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const renderList = () => {
    let cols: React.ReactElement[] = [];
    cols = cols.concat([
      <Row className={testStyles["title-row"]}>
        <Col span={5}>Date</Col>
        <Col span={10}>Test</Col>
        <Col span={4}>Score</Col>
        <Col span={5}>Time</Col>
      </Row>,
    ]);
    histories.forEach(
      (history) =>
        (cols = cols.concat([
          <Row className={testStyles["container"]}>
            <Col span={5}>
              {dayjs(history.testTakenDate).format("DD/MM/YYYY")}
            </Col>
            <Col span={10}>{history.testTitle}</Col>
            <Col span={4}>{history.score}</Col>
            <Col span={5}>
              <Flex gap={"middle"}>
                <div>{convertSecondsToMinuteAndSecond(history.time)}</div>
                <div>
                  <ReviewButton
                    type={type}
                    resultId={history.resultId}
                    testId={history.testId}
                  />
                </div>
              </Flex>
            </Col>
          </Row>,
        ]))
    );
    return cols;
  };

  const getTitle = () => {
    switch (type) {
      case "test":
        return "Test";
      case "full-test":
        return "Full Test";
      case "listening":
        return "Listening";
    }
  };

  if (!renderAsCard)
    return (
      <div style={{ marginTop: "50px" }}>
        <Typography.Title level={4} className={styles["title"]}>
          {getTitle()} history
        </Typography.Title>

        <Card>{renderList()}</Card>
      </div>
    );

  return (
    <div style={{ marginTop: "50px" }}>
      <Typography.Title level={4} className={styles["title"]}>
        {getTitle()} history
      </Typography.Title>
      <Card>
        {histories.map((history) => (
          <HistoryItem
            type={type}
            resultId={history.resultId}
            testId={history.testId}
          />
        ))}
      </Card>
    </div>
  );
};

export default TestHistoryList;
