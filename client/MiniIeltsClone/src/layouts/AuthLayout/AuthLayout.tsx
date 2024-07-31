import { FunctionComponent } from "react";
import classes from "./AuthLayout.module.scss";
import { Outlet } from "react-router-dom";
interface AuthLayoutProps {}

const AuthLayout: FunctionComponent<AuthLayoutProps> = () => {
  return (
    <div className={classes["background"]}>
      <div className={classes["form-container"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
