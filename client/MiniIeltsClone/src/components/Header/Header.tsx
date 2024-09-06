import { Header } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import styles from "./Header.module.scss";
import { Button, Flex } from "antd";
import { EditOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import AdminGuard from "../guards/AdminGuard";
interface HeaderProps {}

const MainHeader: FunctionComponent<HeaderProps> = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUser();
  const handleLogOut = async () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <Header className={styles["header"]}>
      <div className={styles["logo"]}>MiniIelts</div>
      {!user && (
        <Button
          icon={<LoginOutlined />}
          onClick={() => navigate("/auth/login")}
        >
          Log in
        </Button>
      )}
      {user && (
        <Flex gap={"large"}>
          <div className={styles["username"]}>Welcome {user.username}</div>
          <AdminGuard>
            <div>
              <Button
                className={styles["text"]}
                onClick={() => navigate("/create-test")}
              >
                <EditOutlined /> Create test
              </Button>
            </div>
          </AdminGuard>
          <div>
            <Button icon={<LogoutOutlined />} onClick={handleLogOut}>
              Log out
            </Button>
          </div>
        </Flex>
      )}
    </Header>
  );
};

export default MainHeader;
