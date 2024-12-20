import SearchPage from "./pages/SearchPage/SearchPage";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import useUser from "./hooks/useUser";
import { useEffect } from "react";
import { refreshTokens } from "./services/authentication";
import CreateTestPage from "./pages/CreateTestPage/CreateTestPage";
import { TestProvider } from "./contexts/TestContext";
import useMessage from "antd/es/message/useMessage";
import DoTestPage from "./pages/DoTestPage/DoTestPage";
import { AnswersProvider } from "./contexts/AnswertContext";
import { App as AntdApp, Button, Flex, message } from "antd";
import axiosInstance from "./services/axiosConfig";
import ViewSolutionPage from "./pages/TestResultPage/ViewSolutionPage";
import ProfileLayout from "./layouts/ProfileLayout/ProfileLayout";
import Dashboard from "./pages/ProfilePage/Dashboard/Dashboard";
import TestHistoryComponent from "./pages/ProfilePage/TestHistory";
import GuestTestResultPage from "./pages/TestResultPage/GuestTestResultPage";
import AuthenticatedTestResultPage from "./pages/TestResultPage/AuthenticatedTestResultPage";
import { StartTestProvider } from "./contexts/StartTestContext";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Test from "./pages/AdminPage/Test/Test";
import UpdateTestPage from "./pages/CreateTestPage/UpdateTestPage";
import Statistics from "./pages/AdminPage/Statistics/Statistics";
import Users from "./pages/AdminPage/Users/Users";
import CreateFullTestLayout from "./layouts/CreateFullTestLayout/CreateFullTestLayout";
import CreateFullTestPage from "./pages/CreateFullTestPage/CreateFullTestPage";
import FullTest from "./pages/AdminPage/FullTest/FullTest";
import DoFullTestLayout from "./layouts/DoFullTestLayout/DoFullTestLayout";
import DoFullTestPage from "./pages/DoFullTestPage/DoFullTestPage";
import FullTestResultLayout from "./layouts/FullTestResultLayout/FullTestResultLayout";
import FullTestResultByIdPage from "./pages/FullTestResultPage/FullTestResultByIdPage";
import FullTestSolution from "./pages/FullTestResultPage/FullTestSolution";
import FullTestResultByQuery from "./pages/FullTestResultPage/FullTestResultByQuery";
import Series from "./pages/AdminPage/Series/Series";
import SeriesPage from "./pages/SeriesPage/SeriesPage";
import PostPage from "./pages/AdminPage/Post/PostPage";
import { default as PostViewpage } from "./pages/PostPage/PostPage";
import CreatePost from "./pages/AdminPage/Post/CreatePost";
import { PostProvider } from "./contexts/PostContext";
import NormalLayout from "./layouts/NormalLayout/NormalLayout";
import UpdatePost from "./pages/AdminPage/Post/UpdatePost";
import { handleAxiosError } from "./helpers/errorHandling";
import Posts from "./pages/PostPage/Posts";
import ExplanationEditor from "./pages/AdminPage/Explanation/ExplanationEditor";
import PlayGround from "./components/AudioPlayer";
import CreateListeningTestPage from "./pages/CreateTestPage/CreateListeningTestPage";
import DoListeningTestPage from "./pages/DoFullTestPage/DoListeningTestPage";
import CollectionPage from "./pages/SeriesPage/Series/CollectionPage";
import ListeningTest from "./pages/AdminPage/ListeningTest/ListeningTest";
import ListeningSolutionPage from "./pages/Listening/ListeningSolutionPage";
import ListeningResult from "./pages/Listening/ListeningResultPage";
function App() {
  const { setUser } = useUser();
  const contextHolder = useMessage();
  const { modal } = AntdApp.useApp();
  const navigate = useNavigate();
  useEffect(() => {
    let isRefreshing = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let failedQueue: any[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processQueue = (error: any, token: string | null = null) => {
      failedQueue.forEach((prom) => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });
      failedQueue = [];
    };

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // Attach the authorization token if available
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // Queue the request while token is refreshing
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async (resolve, reject) => {
            try {
              const user = await refreshTokens(); // Assume this refreshes tokens
              if (user.isAuthenticated) {
                localStorage.setItem("access_token", user.token);
                console.log(user);
                setUser(user); // Assuming setUser updates global state
                originalRequest.headers.Authorization = `Bearer ${user.token}`;
                processQueue(null, user.token); // Retry queued requests
                resolve(axiosInstance(originalRequest)); // Retry original request
                modal.success({ content: "Token refreshed successfully!" });
              } else {
                throw new Error("User is not authenticated");
              }
            } catch (err) {
              processQueue(err, null); // Reject all queued requests
              modal.warning({
                content: (
                  <div>
                    Log in to enjoy our full features!
                    <div>
                      By logging in, you can review the results of your exams
                      and track your progress!
                    </div>
                  </div>
                ),
                closable: true,
                closeIcon: true,
                footer: (
                  <Flex
                    gap="middle"
                    justify="flex-end"
                    style={{ marginTop: "20px" }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        navigate("/auth/login", { replace: true });
                      }}
                    >
                      Go to login page
                    </Button>
                  </Flex>
                ),
                onOk: () => {
                  navigate("/auth/login", { replace: true });
                },
                cancelText: "No, thanks!",
                okText: "Yes, sure!",
                onCancel: () => {},
              });
              reject(err);
            } finally {
              isRefreshing = false;
            }
          });
        }

        message.error(handleAxiosError(error));

        return Promise.reject(error);
      }
    );

    // Cleanup function to eject interceptors when component unmounts
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, modal, setUser]);

  return (
    <>
      {contextHolder[1]}
      <>
        <Routes>
          <Route path="/test" element={<SearchPage />} />
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
            path="listening-test/create"
            element={
              <TestProvider>
                <CreateListeningTestPage />
              </TestProvider>
            }
          />
          <Route
            path="listening-test/edit/:id"
            element={
              <TestProvider>
                <CreateListeningTestPage mode="edit" />
              </TestProvider>
            }
          />
          <Route
            path="update-test/:id"
            element={
              <TestProvider>
                <UpdateTestPage />
              </TestProvider>
            }
          />
          <Route
            element={
              <StartTestProvider>
                <AnswersProvider>
                  <DoTestPage />
                </AnswersProvider>
              </StartTestProvider>
            }
            path="test/:id"
          ></Route>
          <Route
            path="test/:id/result"
            element={
              <StartTestProvider>
                <AnswersProvider>
                  <GuestTestResultPage />
                </AnswersProvider>
              </StartTestProvider>
            }
          />
          <Route
            path="test/:id/view-solution"
            element={
              <StartTestProvider>
                <AnswersProvider>
                  <ViewSolutionPage />
                </AnswersProvider>
              </StartTestProvider>
            }
          />
          <Route
            path="listening"
            element={
              <StartTestProvider>
                <AnswersProvider>
                  <DoFullTestLayout hideOverflow={false}></DoFullTestLayout>
                </AnswersProvider>
              </StartTestProvider>
            }
          >
            <Route path=":id" element={<DoListeningTestPage />} />
          </Route>
          <Route path="listening/:id" element={<NormalLayout />}>
            <Route
              path="solution"
              element={
                <StartTestProvider>
                  <AnswersProvider>
                    <ListeningSolutionPage />
                  </AnswersProvider>
                </StartTestProvider>
              }
            />
            <Route
              path="result/:resultId"
              element={
                <StartTestProvider>
                  <AnswersProvider>
                    <ListeningResult />
                  </AnswersProvider>
                </StartTestProvider>
              }
            />
          </Route>
          <Route
            path="result/:id"
            element={
              <StartTestProvider>
                <AnswersProvider>
                  <AuthenticatedTestResultPage />
                </AnswersProvider>
              </StartTestProvider>
            }
          />
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path=":id/dashboard" element={<Dashboard />} />
            <Route path="history" element={<TestHistoryComponent />} />
            <Route path=":id/history" element={<TestHistoryComponent />} />
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Statistics />} />
            <Route path="test" element={<Test />} />
            <Route path="user" element={<Users />} />
            <Route path="series" element={<Series />} />
            <Route path="post" element={<PostPage />} />
            <Route path="listening-test" element={<ListeningTest />} />
            <Route path="full-test" element={<FullTest />} />
          </Route>
          <Route
            path="post/create"
            element={
              <PostProvider>
                <CreatePost />
              </PostProvider>
            }
          />
          <Route
            path="post/update/:id"
            element={
              <PostProvider>
                <UpdatePost />
              </PostProvider>
            }
          />

          <Route path="create-full-test" element={<CreateFullTestLayout />}>
            <Route index element={<CreateFullTestPage />} />
          </Route>

          <Route path="post" element={<NormalLayout />}>
            <Route index element={<Posts />} />
            <Route path=":id" element={<PostViewpage />} />
          </Route>

          <Route
            path="full-test"
            element={
              <StartTestProvider>
                <AnswersProvider>
                  <DoFullTestLayout />
                </AnswersProvider>
              </StartTestProvider>
            }
          >
            <Route path=":id" element={<DoFullTestPage />} />
          </Route>
          <Route
            path="full-test/:id"
            element={
              <StartTestProvider>
                <AnswersProvider>
                  <FullTestResultLayout />
                </AnswersProvider>
              </StartTestProvider>
            }
          >
            <Route path="solution" element={<FullTestSolution />} />
            <Route path="result" element={<FullTestResultByQuery />} />
            <Route
              path="result/:resultId"
              element={<FullTestResultByIdPage />}
            />
          </Route>
          <Route path="series" element={<NormalLayout />}>
            <Route index element={<SeriesPage />} />
            <Route path=":id/collection" element={<CollectionPage />} />
          </Route>
          <Route
            path="update-explanation/:id"
            element={
              <StartTestProvider>
                <AnswersProvider>
                  <ExplanationEditor />
                </AnswersProvider>
              </StartTestProvider>
            }
          />
          <Route path="playground" element={<PlayGround videoId="1" />} />
        </Routes>
      </>
    </>
  );
}

export default App;
