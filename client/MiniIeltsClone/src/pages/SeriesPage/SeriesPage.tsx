import { Flex, Layout } from "antd";
import { FunctionComponent } from "react";
import useUser from "../../hooks/useUser";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Series from "./Series/Series";

interface SeriesPageProps {}

const SeriesPage: FunctionComponent<SeriesPageProps> = () => {
  const { user } = useUser();
  return (
    <Layout>
      {user && user.roles ? <AdminHeader /> : <NormalHeader />}
      <Layout style={{ display: "flex", justifyContent: "center" }}>
        <Flex justify="center" style={{ width: "75%" }}>
          <Content style={{ width: "80%" }}>
            <Series />
          </Content>
          <Sider style={{ flex: 1 }}>This is sider</Sider>
        </Flex>
      </Layout>
    </Layout>
  );
};

export default SeriesPage;
