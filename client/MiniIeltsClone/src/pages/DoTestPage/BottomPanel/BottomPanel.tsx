import { FunctionComponent } from "react";
import styles from "./BottomPanel.module.scss";
import { App, Button, Col, Flex, Row, Typography } from "antd";
import Circle from "../../../components/Circle/Circle";
import Clock from "./Clock";
import { GroupOutlined, KeyOutlined, SendOutlined } from "@ant-design/icons";
import useAnswers from "../../../hooks/useAnswers";
import QuestionCircle from "./QuestionCircle";
import useStartTest from "../../../hooks/useStartTest";
interface BottomPanelProps {
  id: number;
}

export interface TestTime {
  minute: number;
  second: number;
}

const BottomPanel: FunctionComponent<BottomPanelProps> = () => {
  const { answers, handleSubmit } = useAnswers();
  const { time } = useStartTest();
  const { modal } = App.useApp();
  const handleOpenPreview = () => {
    modal.info({
      title: "Preview answers",
      width: "50%",
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
                <strong>Q{index + 1}. </strong> {answer.value}
              </div>
            ))}
          </div>
        </>
      ),
    });
  };
  return (
    <div className={styles["wrapper"]}>
      <Flex gap="middle">
        <div className={styles["title"]}>
          <Typography.Title level={3}>Question Pallete</Typography.Title>
        </div>
        <Flex gap="small">
          {answers &&
            answers.length > 0 &&
            Array.from({ length: answers.length }, (_, index) => (
              <div key={`circle-${index}`}>
                <QuestionCircle
                  order={index + 1}
                  done={answers[index]?.value !== ""}
                />
              </div>
            ))}
        </Flex>
      </Flex>

      <Flex justify="space-between">
        <div>
          <Flex gap="small">
            <Circle className={styles["answered"]} />
            answered
          </Flex>

          <Flex gap="small">
            <Circle className={styles["unanswered"]} />
            unanswered
          </Flex>
        </div>

        <div>
          <Clock />
        </div>

        <div className={styles["btn-wrapper"]}>
          <Flex gap={"small"}>
            <div>
              <Button
                icon={<SendOutlined />}
                className={styles["submit-btn"]}
                onClick={() => handleSubmit(time.minute * 60 + time.second)}
              >
                Submit
              </Button>
            </div>
            <Button
              icon={<GroupOutlined />}
              className={styles["review-btn"]}
              onClick={handleOpenPreview}
            >
              Review
            </Button>
            <Button icon={<KeyOutlined />} className={styles["solution-btn"]}>
              Solution
            </Button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default BottomPanel;
