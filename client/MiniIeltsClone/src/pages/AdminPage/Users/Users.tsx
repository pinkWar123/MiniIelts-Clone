import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { UserInfoDto } from "../../../types/Responses/user";
import { usePagination } from "../../../hooks/usePagination";
import useQueryParams from "../../../hooks/useQueryParam";
import { UserQueryObject } from "../../../types/Request/user";
import { callGetUsers } from "../../../services/user";
import { Space, Table, TableColumnsType } from "antd";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  const [users, setUsers] = useState<UserInfoDto[]>();
  const { pagination, setPagination, handleChangePage } = usePagination(2);
  const { getQueryParamWithSingleValue } = useQueryParams();
  useEffect(() => {
    const fetchUsers = async () => {
      const object: UserQueryObject = {
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      };

      const userName = getQueryParamWithSingleValue("userName");
      if (userName) object.userName = userName;

      const role = getQueryParamWithSingleValue("role");
      if (role) object.role = role;

      const res = await callGetUsers(object);
      setUsers(res.data);
      setPagination((prev) => ({
        ...prev,
        totalRecords: res.totalRecords,
      }));
    };
    fetchUsers();
  }, [
    getQueryParamWithSingleValue,
    pagination.pageNumber,
    pagination.pageSize,
    setPagination,
  ]);

  const columns: TableColumnsType<UserInfoDto> = useMemo(
    () => [
      { title: "UserId", dataIndex: "id", key: "id" },
      { title: "Username", dataIndex: "username", key: "userName" },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Action",
        dataIndex: "id",
        key: "action",
        render: (value: string) => (
          <Space>
            <a href={`/profile/dashboard/${value}`}>Profile</a>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.pageNumber,
          total: pagination.totalRecords,
        }}
        onChange={(config) => handleChangePage(config.current ?? 1)}
      />
    </>
  );
};

export default Users;
