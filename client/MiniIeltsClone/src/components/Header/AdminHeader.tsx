import { FunctionComponent } from "react";
import MainHeader from "./Header";
import { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { ControlOutlined, ProfileOutlined } from "@ant-design/icons";

interface AdminHeaderProps {
  canLogOut?: boolean;
}

const AdminHeader: FunctionComponent<AdminHeaderProps> = ({
  canLogOut = true,
}) => {
  const navigate = useNavigate();
  const adminItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <ProfileOutlined />,
      label: <a>Profile</a>,
      onClick: () => navigate("/profile/dashboard"),
    },
    {
      key: "2",
      icon: <ControlOutlined />,
      label: <a>Administrator page</a>,
      onClick: () => navigate("/admin"),
    },
  ];
  return <MainHeader canLogOut={canLogOut} items={adminItems} />;
};

export default AdminHeader;
