import { Button, Form, Input, message } from "antd";
import { FunctionComponent } from "react";
import { validatePassword } from "../../helpers/registerValidator";
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.scss";
import useUser from "../../hooks/useUser";
import { LoginDto } from "../../types/auth";
import { login } from "../../services/authentication";
interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ onSuccess }) => {
  const { setUser } = useUser();
  const onFinish = async (data: LoginDto) => {
    const res = await login(data);
    console.log(res.data);
    if (res?.data.isAuthenticated) {
      setUser(res?.data);
      localStorage.setItem("token", res.data.token);
      onSuccess();
      message.success({ content: "Login successfully" });
    } else message.error({ content: "Wrong username or password" });
  };
  return (
    <>
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
    </>
  );
};

export default LoginForm;
