import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import SearchBox from "../../components/Search";
import Category from "../../components/Category";
import TestSelection from "./TestSelection";
import styles from "./SearchPage.module.scss";
import MainHeader from "../../components/Header/Header";
const SearchPage: React.FC = () => {
  return (
    <Layout>
      <MainHeader />
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
