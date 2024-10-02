import { FunctionComponent } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import { Outlet } from "react-router-dom";
import { Flex } from "antd";

interface CreateFullTestLayoutProps {}

const CreateFullTestLayout: FunctionComponent<
  CreateFullTestLayoutProps
> = () => {
  return (
    <>
      <AdminHeader />
      <Flex justify="center" style={{ width: "80%" }}>
        <Outlet />
      </Flex>
    </>
  );
};

export default CreateFullTestLayout;
