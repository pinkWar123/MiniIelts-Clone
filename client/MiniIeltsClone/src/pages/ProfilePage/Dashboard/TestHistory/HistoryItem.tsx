import { Card, Divider, Flex, Space, Typography } from "antd";
import { FunctionComponent } from "react";
import ReviewButton from "./ReviewButton";

interface HistoryItemProps {
  type: "test" | "full-test" | "listening";
  resultId: number;
  testId?: number;
}

const HistoryItem: FunctionComponent<HistoryItemProps> = ({
  type,
  resultId,
  testId,
}) => {
  return (
    <Card style={{ marginBottom: "20px" }} hoverable>
      <div>18/09/2024 16:44:06</div>
      <Divider />
      <Typography.Title level={4}>
        IELTS Mock Test 2024 Januray Reading Practice Test 1
      </Typography.Title>
      <Flex justify="space-between">
        <div>Mark</div>
        <div>8.0</div>
      </Flex>
      <Flex justify="flex-end" style={{ marginTop: "20px" }}>
        <Space>
          <div>00:15</div>
          <ReviewButton type={type} resultId={resultId} testId={testId} />
        </Space>
      </Flex>
    </Card>
  );
};

export default HistoryItem;
