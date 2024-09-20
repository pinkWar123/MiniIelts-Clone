import { FunctionComponent, useEffect, useState } from "react";

import TestDisplay from "../../components/DoTest/TestDisplay";
import useUser from "../../hooks/useUser";
import { Button, Flex, Modal, Typography } from "antd";
import LoginForm from "../../components/AuthForm/LoginForm";
import useStartTest from "../../hooks/useStartTest";
import { ADMIN_ROLE } from "../../contants/roles";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
interface DoTestLayoutProps {
  essay: React.ReactElement;
  test: React.ReactElement;
}

const DoTestLayout: FunctionComponent<DoTestLayoutProps> = ({
  essay,
  test,
}) => {
  const { user } = useUser();
  const { setStartTest } = useStartTest();
  const [openModal, setOpenModal] = useState<boolean>(!user);
  const handleStartTest = () => {
    setStartTest(true);
    setOpenModal(false);
  };
  useEffect(() => {
    if (user) setStartTest(true);
  }, [user, setStartTest]);
  return (
    <>
      {!user && (
        <Modal
          open={openModal}
          footer={null}
          maskClosable={false}
          closeIcon={false}
          title={
            <Flex justify="center">
              <Typography.Title level={4}>Please log in!</Typography.Title>
            </Flex>
          }
        >
          <Flex justify="center" style={{ paddingBottom: "20px" }}>
            Login to save the results of your tests and keep track of your
            progress!
          </Flex>
          <LoginForm onSuccess={handleStartTest} />
          <Button
            style={{ width: "100%", marginTop: "-20px" }}
            danger
            onClick={handleStartTest}
          >
            Take the test without logging in
          </Button>
        </Modal>
      )}
      {user && user.roles.includes(ADMIN_ROLE) ? (
        <AdminHeader canLogOut={false} />
      ) : (
        <NormalHeader canLogOut={false} />
      )}
      <TestDisplay essay={essay} test={test} />
    </>
  );
};

export default DoTestLayout;
