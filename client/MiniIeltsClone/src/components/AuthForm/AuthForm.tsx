import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import classes from "./AuthForm.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(classes);
interface AuthFormProps {
  children: React.ReactElement;
  type: "login" | "signup";
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ children, type }) => {
  const navigate = useNavigate();
  return (
    <>
      <Row className={cx("row-wrapper")}>
        <Col
          span={12}
          style={{ textAlign: "center" }}
          className={cx("col-wrapper", {
            active: type == "login",
          })}
          onClick={() => navigate("/auth/login")}
        >
          Log in
        </Col>
        <Col
          span={12}
          style={{ textAlign: "center" }}
          className={cx("col-wrapper", {
            active: type == "signup",
          })}
          onClick={() => navigate("/auth/register")}
        >
          Sign up
        </Col>
      </Row>
      {children}
    </>
  );
};

export default AuthForm;
