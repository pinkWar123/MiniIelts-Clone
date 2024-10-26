import { FunctionComponent, useState } from "react";
import styles from "./Series.module.scss";
import { Button, Card, Col, Flex, Modal, Row, Select, Typography } from "antd";
import {
  AimOutlined,
  BulbOutlined,
  ProjectOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface TestItemProps {
  title: string;
  id: number;
  skill: string;
}
interface StartButtonProps {
  onClick: () => void;
}

const StartButton: FunctionComponent<StartButtonProps> = ({ onClick }) => {
  return (
    <Button className={styles["button"]} shape="round" onClick={onClick}>
      Start Now
    </Button>
  );
};

const timeOptions = Array.from({ length: 11 }, (_, index) => (index + 2) * 5);

const TestItem: FunctionComponent<TestItemProps> = ({ title, id, skill }) => {
  const navigate = useNavigate();
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const showModal = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const getPathName = () => {
    if (skill == "listening") return "listening";
    else if (skill == "reading") return "full-test";
  };
  const handleTakePracticeMode = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto"; // Restore scrolling
    navigate(`/${getPathName()}/${id}?limit=${timeLimit * 60}`);
  };

  const handleTakeSimulationMode = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto"; // Restore scrolling
    navigate(`/${getPathName()}/${id}`);
  };
  const handleCancel = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  return (
    <>
      <div className={styles["test"]} onClick={showModal}>
        <Typography.Title ellipsis={{ rows: 2 }} level={5}>
          {title}
        </Typography.Title>
        <AimOutlined style={{ color: "orange" }} /> 23,456 taken
      </div>
      <Modal
        closable
        closeIcon
        onClose={handleCancel}
        onCancel={handleCancel}
        destroyOnClose
        centered
        open={openModal}
        width={"90%"}
        className={styles["modal"]}
        footer={<></>}
      >
        <Flex justify="center">
          <Typography.Title level={1} className={styles["title"]}>
            Choose a mode
          </Typography.Title>
        </Flex>
        <Row justify={"center"} gutter={32}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Card className={styles["card"]}>
              <Flex justify="center" className={styles["title-icon"]}>
                <ProjectOutlined />
              </Flex>
              <Flex justify="center">
                <Typography.Title level={2} className={styles["card-title"]}>
                  Practice mode
                </Typography.Title>
              </Flex>
              <Row>
                <Col span={2}>
                  <BulbOutlined className={styles["desc-icon"]} />
                </Col>
                <Col span={22} className={styles["desc-text"]}>
                  Practice mode is suitable for improving accuracy and time
                  spent on each part.
                </Col>
              </Row>
              <div>
                <Typography.Title level={5} className={styles["content"]}>
                  Choose a time limit:
                </Typography.Title>
                <div>
                  <Select
                    variant="filled"
                    style={{ width: "100%" }}
                    value={timeLimit}
                    onChange={(value) => setTimeLimit(value)}
                    options={[
                      {
                        label: "No limit",
                        value: 0,
                      },
                      ...timeOptions.map((time) => ({
                        label: `${time} mins`,
                        value: time,
                      })),
                    ]}
                  />
                </div>
              </div>
              <Flex justify="center">
                <StartButton onClick={handleTakePracticeMode} />
              </Flex>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Card className={styles["card"]}>
              <Flex justify="center" className={styles["title-icon"]}>
                <ReadOutlined />
              </Flex>
              <Flex justify="center">
                <Typography.Title level={2} className={styles["card-title"]}>
                  Simulation test mode
                </Typography.Title>
              </Flex>
              <Row>
                <Col span={2}>
                  <BulbOutlined className={styles["desc-icon"]} />
                </Col>
                <Col span={22} className={styles["desc-text"]}>
                  Simulation test mode is the best option to experience the real
                  IELTS on computer.
                </Col>
              </Row>
              <div>
                <Typography.Title level={5} className={styles["content"]}>
                  Test information
                </Typography.Title>
                <div>Full parts (60 minutes - 3 parts - 40 questions)</div>
              </div>
              <Flex justify="center">
                <StartButton onClick={handleTakeSimulationMode} />
              </Flex>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default TestItem;
