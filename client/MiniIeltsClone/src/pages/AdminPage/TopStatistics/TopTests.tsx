import { Table, TableColumnsType, Typography } from "antd";
import { FunctionComponent } from "react";
import { TopTest } from "../../../types/Responses/statistic";
import { formatTimestampToDateMonthYear } from "../../../helpers/time";

interface TopTestsProps {
  topTests: TopTest[];
}
const columns: TableColumnsType<TopTest> = [
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Views", dataIndex: "viewCount", key: "viewCount" },
  {
    title: "Created Date",
    dataIndex: "createdOn",
    key: "createdOn",
    render: (value: string) => <>{formatTimestampToDateMonthYear(value)}</>,
  },
];
const TopTests: FunctionComponent<TopTestsProps> = ({ topTests }) => {
  return (
    <>
      <Typography.Title level={3}>Top tests</Typography.Title>
      <Table pagination={false} dataSource={topTests} columns={columns} />
    </>
  );
};

export default TopTests;
