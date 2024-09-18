import {
  BookOutlined,
  EditOutlined,
  LineChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const items: MenuItem[] = [
  { key: "", icon: <LineChartOutlined />, label: "Statistics" },
  { key: "test", icon: <EditOutlined />, label: "Tests" },
  {
    key: "full-test",
    icon: <BookOutlined />,
    label: "Full Tests & Series",
  },
  { key: "user", icon: <UserOutlined />, label: "Users" },
];
