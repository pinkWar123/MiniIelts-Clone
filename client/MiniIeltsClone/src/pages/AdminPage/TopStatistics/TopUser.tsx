import { Table, TableColumnsType, Typography } from "antd";
import { FunctionComponent } from "react";
import { TopUser } from "../../../types/Responses/statistic";

interface TopUsersProps {
  topUsers: TopUser[];
}
const columns: TableColumnsType<TopUser> = [
  { title: "UserName", dataIndex: "userName", key: "userName" },
  { title: "Email", dataIndex: "email", key: "email" },
  {
    title: "Number of tests taken",
    dataIndex: "totalTestTakenTimes",
    key: "totalTestTakenTimes",
  },
];
const TopUsers: FunctionComponent<TopUsersProps> = ({ topUsers }) => {
  return (
    <>
      <Typography.Title level={3}>Top users</Typography.Title>
      <Table pagination={false} dataSource={topUsers} columns={columns} />
    </>
  );
};

export default TopUsers;
