import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import SearchBox from "../../components/Search";
import Category from "../../components/Category";
import TestSelection from "./TestSelection";
import styles from "./SearchPage.module.scss";
import useUser from "../../hooks/useUser";
import { ADMIN_ROLE } from "../../contants/roles";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
const SearchPage: React.FC = () => {
  const { user } = useUser();
  return (
    <Layout>
      {user && user?.roles.includes(ADMIN_ROLE) ? (
        <AdminHeader />
      ) : (
        <NormalHeader />
      )}
      <Layout className={styles["main-layout"]}>
        <Sider className={styles["sider"]} width="250px">
          <SearchBox />
        </Sider>
        <Content className={styles["content"]}>
          <Category></Category>
          <TestSelection />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SearchPage;
