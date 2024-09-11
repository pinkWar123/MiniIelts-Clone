import { FunctionComponent } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/AuthForm/LoginForm";
interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const navigate = useNavigate();
  return (
    <AuthForm type="login">
      <LoginForm onSuccess={() => navigate("/home")} />
    </AuthForm>
  );
};

export default LoginPage;
