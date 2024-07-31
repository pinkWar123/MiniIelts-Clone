import SearchPage from "./pages/SearchPage/SearchPage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import useUser from "./hooks/useUser";
import { useEffect } from "react";
import { getUserByToken } from "./services/authentication";
import CreateTestPage from "./pages/CreateTestPage/CreateTestPage";
import { TestProvider } from "./contexts/TestContext";
import useMessage from "antd/es/message/useMessage";
import DoTestPage from "./pages/DoTestPage/DoTestPage";
import { AnswersProvider } from "./contexts/AnswertContext";
import TestResultPage from "./pages/TestResultPage/TestResultPage";
function App() {
  const { setUser } = useUser();
  const [_, contextHolder] = useMessage();
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await getUserByToken(token);
      console.log("Get user by token:", res.data);
      if (res?.status === 200) {
        setUser(res.data);
      }
    };
    getUser();
  }, [setUser]);
  return (
    <>
      {contextHolder}
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
