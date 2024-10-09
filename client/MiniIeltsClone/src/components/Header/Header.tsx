import { Header } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import styles from "./Header.module.scss";
import { Button, Dropdown, Flex, MenuProps } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { logout } from "../../services/authentication";
export interface HeaderProps {
  canLogOut?: boolean;
  items: MenuProps["items"];
}

const navItems = [
  {
    label: "Single Test",
    key: "test",
  },
  {
    label: "Series",
    key: "series",
  },
  {
    label: "Post",
    key: "post",
  },
];

const MainHeader: FunctionComponent<HeaderProps> = ({
  canLogOut = true,
  items,
}) => {
  const navigate = useNavigate();
  const { setUser, user } = useUser();
  const location = useLocation();
  const handleLogOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    await logout();
    setUser(null);
  };
  const headerItems: MenuProps["items"] = [
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: <a>Log out</a>,
      onClick: handleLogOut,
    },
  ];

  return (
    <Header className={styles["header"]}>
      <Flex>
        <div className={styles["logo"]}>MiniIelts</div>
        <Flex style={{ color: "white" }}>
          {/* <div className={`${styles["nav-item"]} ${styles["active"]}`}>
            Single Test
          </div>
          <div className={styles["nav-item"]}>Full Test</div>
          <div className={styles["nav-item"]}>Post</div> */}
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`${styles["nav-item"]} ${
                item.key === location.pathname.substring(1)
                  ? styles["active"]
                  : ""
              }`}
              onClick={() => navigate({ pathname: `/${item.key}` })}
            >
              {item.label}
            </div>
          ))}
        </Flex>
      </Flex>
      {!user && canLogOut && (
        <Button
          icon={<LoginOutlined />}
          onClick={() => navigate("/auth/login")}
        >
          Log in
        </Button>
      )}
      {user && canLogOut && (
        <Dropdown
          menu={{ items: items?.concat(headerItems) }}
          placement="bottom"
          arrow
        >
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
