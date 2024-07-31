import { Button, Form, Input } from "antd";
import { FunctionComponent } from "react";
import { validatePassword } from "../../helpers/registerValidator";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.scss";
import { LoginDto } from "../../types/auth";
import { login } from "../../services/authentication";
import useUser from "../../hooks/useUser";
interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const onFinish = async (data: LoginDto) => {
    const res = await login(data);
    console.log(res.data);
    if (res?.status === 200) {
      setUser(res?.data);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    }
  };
  return (
    <AuthForm type="login">
      <Form onFinish={onFinish}>
        <Form.Item
          hasFeedback
          label="Username"
          name="username"
          required
          validateDebounce={1000}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Password"
          name="password"
          validateDebounce={1000}
          required
          rules={[{ min: 12 }, { validator: validatePassword }]}
        >
          <Input placeholder="Enter password" />
        </Form.Item>
        <Link to={"../register"}>Don't have an account yet? Create one</Link>
        <Form.Item>
          <Button htmlType="submit" type="primary" className={styles["button"]}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </AuthForm>
  );
};

export default LoginPage;
