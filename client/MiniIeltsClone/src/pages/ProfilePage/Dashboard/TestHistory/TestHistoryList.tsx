import { Button, Card, Col, Flex, Row, Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "../Dashboard.module.scss";
import testStyles from "./TestHistoryList.module.scss";
import { TestHistory } from "../../../../types/Responses/history";
import dayjs from "dayjs";
import { convertSecondsToMinuteAndSecond } from "../../../../helpers/time";
import { BookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface TestHistoryProps {
  histories: TestHistory[];
}

const TestHistoryList: FunctionComponent<TestHistoryProps> = ({
  histories,
}) => {
  const navigate = useNavigate();
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
                  <Button
                    style={{ marginTop: "-20px" }}
                    icon={<BookOutlined />}
                    onClick={() => navigate(`/result/${history.resultId}`)}
                  >
                    Review
                  </Button>
                </div>
              </Flex>
            </Col>
          </Row>,
        ]))
    );
    return cols;
  };

  return (
    <>
      <Typography.Title level={4} className={styles["title"]}>
        Test history
      </Typography.Title>

      <Card>{renderList()}</Card>
    </>
  );
};

export default TestHistoryList;
