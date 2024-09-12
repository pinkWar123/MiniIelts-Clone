import { ProfileOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "./Header";

interface NormalHeaderProps {
  canLogOut?: boolean;
}

const NormalHeader: FunctionComponent<NormalHeaderProps> = ({
  canLogOut = true,
}) => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <ProfileOutlined />,
      label: <a>Profile</a>,
      onClick: () => navigate("/profile/dashboard"),
    },
  ];
  return <MainHeader canLogOut={canLogOut} items={items} />;
};

export default NormalHeader;
