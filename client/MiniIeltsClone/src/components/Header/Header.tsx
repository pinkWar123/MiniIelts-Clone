import { Header } from "antd/es/layout/layout";
import { FunctionComponent, useState } from "react";
import styles from "./Header.module.scss";
import { Button, Drawer, Dropdown, Flex, MenuProps } from "antd";
import { LoginOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
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
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
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
      <Flex justify="space-between" align="center">
        <div className={styles["logo"]}>MiniIelts</div>
        {/* Hamburger Menu for Mobile */}
        <div className={styles["menu-button"]}>
          <MenuOutlined
            onClick={showDrawer}
            style={{ fontSize: "24px", color: "white" }}
          />
        </div>
        <Flex style={{ color: "white" }}>
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
      <Drawer
        title={user ? `Welcome ${user.username}` : `Login`}
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
      >
        {navItems.map((item) => (
          <div
            key={item.key}
            className={styles["drawer-item"]}
            onClick={() => {
              navigate({ pathname: `/${item.key}` });
              setDrawerVisible(false);
            }}
          >
            {item.label}
          </div>
        ))}
      </Drawer>
    </Header>
  );
};

export default MainHeader;
