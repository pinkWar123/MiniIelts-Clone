import { BlockOutlined, SendOutlined } from "@ant-design/icons";
import { App, Button, Flex, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import styles from "./DoFullTestLayout.module.scss";
import useAnswers from "../../hooks/useAnswers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SubmitFullTestDto } from "../../types/Responses/fullTest";
import { submitFullTest } from "../../services/fullTest";
import Time from "./Time";
import useUser from "../../hooks/useUser";
import AskLoginModal from "../../components/AuthForm/AskLoginModal";
interface FullTestHeaderProps {}

const initialTime = 60 * 60;

const FullTestHeader: FunctionComponent<FullTestHeaderProps> = () => {
  const { user } = useUser();
  const { answers } = useAnswers();
  const navigate = useNavigate();
  const location = useLocation();
  const { modal } = App.useApp();
  const { id } = useParams();
  const [time, setTime] = useState<number>(initialTime);
  const [start, setStart] = useState<boolean>();
  useEffect(() => {
    setStart(user !== null);
  }, [user]);
  const handleSubmit = useCallback(async () => {
    if (!id || !answers || answers.length === 0) return;
    const dto: SubmitFullTestDto = {
      answers: answers?.map((a) => ({
        order: a.order,
        value: a.value,
        questionType: a.questionType,
      })),
      time: initialTime - time,
    };
    if (!user) {
      let url = `/result?`;
      answers.forEach((a) => (url += `a=${a.value}&`));
      url += `time=${initialTime - time}`;
      navigate(location.pathname + url);
      return;
    }
    const res = await submitFullTest(parseInt(id), dto);
    if (res.data.fullTestResultId) {
      navigate(`./result/${res.data.fullTestResultId}`);
    }
  }, [answers, id, time, navigate, user, location.pathname]);
  const handlePreviewAnswer = () => {
    modal.info({
      title: "Preview answers",
      width: "80%",
      centered: true,
      closeIcon: true,
      closable: true,
      content: (
        <>
          This is just to preview answers. You cannot directly modify your
          answer within it.
          <div className={styles["question-grid"]}>
            {answers?.map((answer, index) => (
              <div
                className={styles["question"]}
                key={`preview-question-${index}`}
              >
                <strong>Q{index + 1}. </strong>{" "}
                <span className={styles["value"]}>{answer.value}</span>
              </div>
            ))}
          </div>
        </>
      ),
    });
  };
  return (
    <>
      {!user && <AskLoginModal open={!user} onSuccess={() => setStart(true)} />}
      <Header style={{ backgroundColor: "white" }}>
        <Flex justify="space-between">
          <div>MiniIelts</div>
          <Time
            onTimeOut={handleSubmit}
            time={time}
            setTime={setTime}
            start={start ?? false}
          />
          <div>
            <Space>
              <Button
                shape="round"
                icon={<BlockOutlined />}
                onClick={handlePreviewAnswer}
              >
                Review
              </Button>
              <Button
                icon={<SendOutlined />}
                shape="round"
                className={styles["submit-btn"]}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Space>
          </div>
        </Flex>
      </Header>
    </>
  );
};

export default FullTestHeader;
