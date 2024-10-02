import { FunctionComponent, useEffect } from "react";

import TestDisplay from "../../components/DoTest/TestDisplay";
import useUser from "../../hooks/useUser";
import useStartTest from "../../hooks/useStartTest";
import { ADMIN_ROLE } from "../../contants/roles";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
import AskLoginModal from "../../components/AuthForm/AskLoginModal";
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
  useEffect(() => {
    if (user) setStartTest(true);
  }, [user, setStartTest]);
  useEffect(() => {
    // Add the overflow-hidden class when this component mounts
    document.body.style.overflow = "hidden";

    // Clean up: Reset the body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <AskLoginModal open={!user} onSuccess={() => setStartTest(true)} />
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
