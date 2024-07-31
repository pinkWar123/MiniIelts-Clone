import { FunctionComponent } from "react";
import MainHeader from "../../components/Header/Header";
import TestDisplay from "../../components/DoTest/TestDisplay";
interface DoTestLayoutProps {
  essay: React.ReactElement;
  test: React.ReactElement;
}

const DoTestLayout: FunctionComponent<DoTestLayoutProps> = ({
  essay,
  test,
}) => {
  return (
    <>
      <MainHeader />
      <TestDisplay essay={essay} test={test} />
    </>
  );
};

export default DoTestLayout;
