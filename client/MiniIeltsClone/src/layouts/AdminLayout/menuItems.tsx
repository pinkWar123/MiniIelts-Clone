import { EditOutlined, LineChartOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const items: MenuItem[] = [
  { key: "", icon: <LineChartOutlined />, label: "Statistics" },
  { key: "test", icon: <EditOutlined />, label: "Tests" },
];
