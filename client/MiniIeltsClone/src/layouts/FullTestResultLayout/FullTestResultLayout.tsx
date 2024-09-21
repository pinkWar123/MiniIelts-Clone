import { Layout } from "antd";
import { FunctionComponent } from "react";
import useUser from "../../hooks/useUser";
import { ADMIN_ROLE } from "../../contants/roles";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

interface FullTestResultLayoutProps {}

const FullTestResultLayout: FunctionComponent<
  FullTestResultLayoutProps
> = () => {
  const { user } = useUser();
  return (
    <Layout>
      {user && user.roles.includes(ADMIN_ROLE) ? (
        <AdminHeader />
      ) : (
        <NormalHeader />
      )}
      <Content style={{ width: "100%" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default FullTestResultLayout;
