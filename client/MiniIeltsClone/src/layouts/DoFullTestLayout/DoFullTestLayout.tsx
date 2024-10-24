import { FunctionComponent, useEffect } from "react";
import { Outlet } from "react-router-dom";
import FullTestHeader from "./Header";

interface DoFullTestLayoutProps {
  hideOverflow?: boolean;
}

const DoFullTestLayout: FunctionComponent<DoFullTestLayoutProps> = ({
  hideOverflow = true,
}) => {
  useEffect(() => {
    // Add the overflow-hidden class when this component mounts
    if (hideOverflow) document.body.style.overflow = "hidden";

    // Clean up: Reset the body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hideOverflow]);
  return (
    <>
      <FullTestHeader />
      <Outlet />
    </>
  );
};

export default DoFullTestLayout;
