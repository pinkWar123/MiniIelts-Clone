import { Card, Divider, Flex, Space, Typography } from "antd";
import { FunctionComponent } from "react";
import ReviewButton from "./ReviewButton";
import { TestHistory } from "../../../../types/Responses/history";
import dayjs from "dayjs";

interface HistoryItemProps {
  type: "test" | "full-test" | "listening";
  resultId: number;
  testId?: number;
  history: TestHistory;
}

const HistoryItem: FunctionComponent<HistoryItemProps> = ({
  type,
  resultId,
  testId,
  history,
}) => {
  return (
    <Card style={{ marginBottom: "20px" }} hoverable>
      <div>{dayjs(history.testTakenDate).format("DD/MM/YYYY")}</div>
      <Divider />
      <Typography.Title level={4}>{history.testTitle}</Typography.Title>
      <Flex justify="space-between">
        <div>Mark</div>
        <div>{history.score}</div>
      </Flex>
      <Flex justify="flex-end" style={{ marginTop: "20px" }}>
        <Space>
          <div>{history.time}</div>
          <ReviewButton type={type} resultId={resultId} testId={testId} />
        </Space>
      </Flex>
    </Card>
  );
};

export default HistoryItem;
