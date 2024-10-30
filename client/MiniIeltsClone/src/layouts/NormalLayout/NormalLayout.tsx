import { FunctionComponent } from "react";
import useUser from "../../hooks/useUser";
import { ADMIN_ROLE } from "../../contants/roles";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
interface NormalLayoutProps {}

const NormalLayout: FunctionComponent<NormalLayoutProps> = () => {
  const { user } = useUser();
  return (
    <>
      {user && user.roles.includes(ADMIN_ROLE) ? (
        <AdminHeader />
      ) : (
        <NormalHeader />
      )}
      <Outlet />
      <Footer />
    </>
  );
};

export default NormalLayout;
