import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { UserInfoDto } from "../../../types/Responses/user";
import { usePagination } from "../../../hooks/usePagination";
import useQueryParams from "../../../hooks/useQueryParam";
import { UserQueryObject } from "../../../types/Request/user";
import { callGetUsers } from "../../../services/user";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import {
  ADMIN_ROLE,
  SUPER_ADMIN_ROLE,
  USER_ROLE,
} from "../../../contants/roles";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

interface UsersProps {}
const Users: FunctionComponent<UsersProps> = () => {
  const [users, setUsers] = useState<UserInfoDto[]>();
  const [username, setUsername] = useState<string>();
  const location = useLocation();
  const [role, setRole] = useState<string>();
  const { pagination, setPagination, handleChangePage } = usePagination(2);
  const { getQueryParamWithSingleValue } = useQueryParams();
  const navigate = useNavigate();
  useEffect(() => {
    setUsername(getQueryParamWithSingleValue("userName") ?? "");
    setRole(getQueryParamWithSingleValue("role") ?? "");
  }, [getQueryParamWithSingleValue]);
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
            <a href={`/profile/${value}/dashboard`}>Profile</a>
          </Space>
        ),
      },
    ],
    []
  );

  const handleSearch = () => {
    const searchParams = new URLSearchParams(location.search);

    if (username && username.length > 0) searchParams.set("userName", username);
    else searchParams.delete("userName");
    if (role && role.length > 0) searchParams.set("role", role);
    else searchParams.delete("role");
    searchParams.set("pageNumber", "1");
    searchParams.set("pageSize", "2");

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <Space>
        <Form.Item label="Username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Search user by username..."
          />
        </Form.Item>

        <Form.Item label="Role">
          <Select
            style={{ width: "150px" }}
            value={role}
            onChange={(value) => setRole(value)}
            options={[
              {
                label: USER_ROLE,
                value: USER_ROLE,
              },
              {
                label: ADMIN_ROLE,
                value: ADMIN_ROLE,
              },
              {
                label: SUPER_ADMIN_ROLE,
                value: SUPER_ADMIN_ROLE,
              },
              {
                label: "ALL",
                value: "",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Form.Item>
      </Space>
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
