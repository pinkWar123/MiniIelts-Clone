import { FunctionComponent, useEffect } from "react";
import { Outlet } from "react-router-dom";
import FullTestHeader from "./Header";

interface DoFullTestLayoutProps {}

const DoFullTestLayout: FunctionComponent<DoFullTestLayoutProps> = () => {
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
      <FullTestHeader />
      <Outlet />
    </>
  );
};

export default DoFullTestLayout;
