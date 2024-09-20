import {
  BlockOutlined,
  ClockCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { App, Button, Flex, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent, useEffect } from "react";
import styles from "./DoFullTestLayout.module.scss";
import { Outlet, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import { SubmitFullTestDto } from "../../types/Responses/fullTest";
import { submitFullTest } from "../../services/fullTest";

interface DoFullTestLayoutProps {}

const DoFullTestLayout: FunctionComponent<DoFullTestLayoutProps> = () => {
  const { answers } = useAnswers();
  const { modal } = App.useApp();
  const { id } = useParams();
  useEffect(() => {
    // Add the overflow-hidden class when this component mounts
    document.body.style.overflow = "hidden";

    // Clean up: Reset the body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const handleSubmit = async () => {
    if (!id || !answers || answers.length === 0) return;
    const dto: SubmitFullTestDto = {
      answers: answers?.map((a) => ({
        order: a.order,
        value: a.value,
        questionType: a.questionType,
      })),
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
    <>
      <Header style={{ backgroundColor: "white" }}>
        <Flex justify="space-between">
          <div>MiniIelts</div>
          <div>
            {" "}
            <Space>
              {" "}
              <ClockCircleOutlined /> 26 minutes remaining
            </Space>
          </div>
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
      <Outlet />
    </>
  );
};

export default DoFullTestLayout;
