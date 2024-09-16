import { Flex, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { FunctionComponent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import { items } from "./menuItems";
interface AdminLayoutProps {}

const AdminLayout: FunctionComponent<AdminLayoutProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the last part of the pathname
  const path = location.pathname.split("/").pop();
  return (
    <Layout>
      <Sider width={"15%"} className={styles["sider"]}>
        <Flex gap={"small"} justify="center" className={styles["logo"]}>
          <img
            style={{ width: "25px", height: "25px" }}
            src="https://www.careerguide.com/career/wp-content/uploads/2023/10/mini-ielts-study-abroad.png"
          />
          Miniielts Clone.com
        </Flex>
        <Menu
          items={items}
          defaultSelectedKeys={[path === "admin" ? "" : path ?? ""]}
          mode="inline"
          theme="dark"
          onSelect={(props) => navigate(`${props.key}`)}
          className={styles["menu"]}
        />
      </Sider>
      <Layout>
        <Header></Header>
        <Content>
          <div style={{ padding: "40px" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
