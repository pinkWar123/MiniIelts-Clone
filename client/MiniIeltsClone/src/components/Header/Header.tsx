import { Header } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import styles from "./Header.module.scss";
import { Button, Dropdown, MenuProps } from "antd";
import {
  EditOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { logout } from "../../services/authentication";
interface HeaderProps {
  canLogOut?: boolean;
}

const MainHeader: FunctionComponent<HeaderProps> = ({ canLogOut = true }) => {
  const navigate = useNavigate();
  const { setUser, user } = useUser();
  const handleLogOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    await logout();
    setUser(null);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <ProfileOutlined />,
      label: <a>Profile</a>,
      onClick: () => navigate("/profile/dashboard"),
    },
    {
      key: "2",
      icon: <EditOutlined />,
      label: <a>Create test</a>,
      onClick: () => navigate("/create-test"),
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: <a>Log out</a>,
      onClick: handleLogOut,
    },
  ];
  return (
    <Header className={styles["header"]}>
      <div className={styles["logo"]} onClick={() => navigate("/home")}>
        MiniIelts
      </div>
      {!user && canLogOut && (
        <Button
          icon={<LoginOutlined />}
          onClick={() => navigate("/auth/login")}
        >
          Log in
        </Button>
      )}
      {user && canLogOut && (
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <div className={styles["dropdown"]}>Welcome {user.username}</div>
        </Dropdown>
      )}
      {user && !canLogOut && (
        <div className={styles["dropdown"]}>Welcome {user.username}</div>
      )}
    </Header>
  );
};

export default MainHeader;
