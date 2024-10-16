import { Col, Layout, Row } from "antd";
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
      {user !== null && user?.roles?.includes(ADMIN_ROLE) ? (
        <AdminHeader />
      ) : (
        <NormalHeader />
      )}
      <Row justify={"center"} className={styles["main-layout"]}>
        <Col xs={20} sm={20} md={6} lg={6} xl={6} className={styles["sider"]}>
          <SearchBox />
        </Col>
        <Col
          xs={20}
          sm={20}
          md={18}
          lg={18}
          xl={18}
          className={styles["content"]}
        >
          <div style={{ marginBottom: "20px" }}>
            <Category></Category>
          </div>
          <TestSelection />
        </Col>
      </Row>
    </Layout>
  );
};

export default SearchPage;
