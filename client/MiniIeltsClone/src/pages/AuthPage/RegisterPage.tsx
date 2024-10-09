import { Button, Form, Input } from "antd";
import { FunctionComponent } from "react";
import { validatePassword } from "../../helpers/registerValidator";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.scss";
import { RegisterDto } from "../../types/auth";
import { register } from "../../services/authentication";
interface RegisterPageProps {}

const RegisterPage: FunctionComponent<RegisterPageProps> = () => {
  const navigate = useNavigate();
  const onFinish = async (data: RegisterDto) => {
    console.log(data);
    await register(data);
    navigate("/auth/login");
  };
  return (
    <AuthForm type="signup">
      <Form layout="vertical" onFinish={onFinish}>
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

        <Form.Item
          hasFeedback
          label="Confirm password"
          name="passwordConfirm"
          validateDebounce={1000}
          dependencies={["password"]}
          required
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Email"
          name="email"
          validateDebounce={1000}
          rules={[
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input type="email" placeholder="Enter your email (optional)" />
        </Form.Item>
        <Link to="../login">Already have account?</Link>
        <Form.Item>
          <Button htmlType="submit" type="primary" className={styles["button"]}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </AuthForm>
  );
};

export default RegisterPage;
