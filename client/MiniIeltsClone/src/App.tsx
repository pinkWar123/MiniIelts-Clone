import SearchPage from "./pages/SearchPage/SearchPage";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import useUser from "./hooks/useUser";
import { useEffect } from "react";
import { getUserByToken, refreshTokens } from "./services/authentication";
import CreateTestPage from "./pages/CreateTestPage/CreateTestPage";
import { TestProvider } from "./contexts/TestContext";
import useMessage from "antd/es/message/useMessage";
import DoTestPage from "./pages/DoTestPage/DoTestPage";
import { AnswersProvider } from "./contexts/AnswertContext";
import TestResultPage from "./pages/TestResultPage/TestResultPage";
import { App as AntdApp } from "antd";
import axiosInstance from "./services/axiosConfig";
function App() {
  const { setUser } = useUser();
  const contextHolder = useMessage();
  const { modal } = AntdApp.useApp();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // You can modify the config before the request is sent
        // For example, attach an authorization token
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Do something with request error
        console.log(error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log(error);
        const originalRequest = error.config;
        console.log(originalRequest);
        if (error.response.status === 401) {
          try {
            const user = await refreshTokens();
            console.log(user);
            if (user) {
              localStorage.setItem("access_token", user.token);
              setUser(user);
              modal.success({ content: "refresh success" });
              return Promise.resolve();
            }
          } catch (error) {
            modal.warning({
              content:
                "Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập lại!",
              onOk: () => {
                navigate("/auth/login", { replace: true });
              },
            });
          }

          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    // Return cleanup function to remove interceptors if necessary
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return (
    <>
      {contextHolder[1]}
      <>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="auth" element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route
            path="create-test"
            element={
              <TestProvider>
                <CreateTestPage />
              </TestProvider>
            }
          />
          <Route
            element={
              <AnswersProvider>
                <DoTestPage />
              </AnswersProvider>
            }
            path="test/:id"
          ></Route>
          <Route
            path="test/:id/result"
            element={
              <AnswersProvider>
                <TestResultPage />
              </AnswersProvider>
            }
          />
        </Routes>
      </>
    </>
  );
}

export default App;
