import { BlockOutlined, SendOutlined } from "@ant-design/icons";
import { App, Button, Flex, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent, useEffect } from "react";
import styles from "./DoFullTestLayout.module.scss";
import useAnswers from "../../hooks/useAnswers";
import { useParams } from "react-router-dom";
import { SubmitFullTestDto } from "../../types/Responses/fullTest";
import { submitFullTest } from "../../services/fullTest";
import Time from "./Time";
import useStartTest from "../../hooks/useStartTest";
import useUser from "../../hooks/useUser";
interface FullTestHeaderProps {}

const FullTestHeader: FunctionComponent<FullTestHeaderProps> = () => {
  const { answers } = useAnswers();
  const { modal } = App.useApp();
  const { user } = useUser();
  const { startTime, setStartTest } = useStartTest();
  const { id } = useParams();

  useEffect(() => {
    if (user) setStartTest(true);
  }, [user, setStartTest]);
  const handleSubmit = async () => {
    if (!id || !answers || answers.length === 0) return;
    const now = new Date();
    console.log(startTime?.getTime());
    const duration = now.getTime() - (startTime?.getTime() ?? 0);
    const dto: SubmitFullTestDto = {
      answers: answers?.map((a) => ({
        order: a.order,
        value: a.value,
        questionType: a.questionType,
      })),
      time: Math.floor(duration / 1000),
    };
    const res = await submitFullTest(parseInt(id), dto);
    console.log(res);
  };
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
    <Header style={{ backgroundColor: "white" }}>
      <Flex justify="space-between">
        <div>MiniIelts</div>
        <Time />
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
  );
};

export default FullTestHeader;
