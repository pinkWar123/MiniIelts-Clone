import {
  BlockOutlined,
  ClockCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import styles from "./DoFullTestLayout.module.scss";
import { Outlet } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";

interface DoFullTestLayoutProps {}

const DoFullTestLayout: FunctionComponent<DoFullTestLayoutProps> = () => {
  const answers = useAnswers();
  const handleSubmit = () => {
    console.log(answers);
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
              <Button shape="round" icon={<BlockOutlined />}>
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
