import { FunctionComponent, useEffect, useState } from "react";
import {
  callGetFullTestHistory,
  callGetTestHistory,
  callGetTestHistoryByAdmin,
} from "../../../../services/profile";
import PerformanceChart, { Result } from "./PerformanceChart";
import { Card, Col, Flex, Row, Space } from "antd";
import styles from "./PerformanceAnalytics.module.scss";
import { TestHistory } from "../../../../types/Responses/history";
import dayjs from "dayjs";
import QuestionTypes from "./QuestionTypes";
import TestHistoryList from "../TestHistory/TestHistoryList";
import { useParams } from "react-router-dom";
import { IPagedResponse } from "../../../../types/Responses/response";
import {
  AudioOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  EditOutlined,
} from "@ant-design/icons";
interface PerformanceAnalyticsProps {}

const tabs = [
  {
    title: "Listening",
    icon: <CustomerServiceOutlined />,
  },
  {
    title: "Reading",
    icon: <BookOutlined />,
  },
  {
    title: "Writing",
    icon: <EditOutlined />,
  },
  {
    title: "Speaking",
    icon: <AudioOutlined />,
  },
];

const PerformanceAnalytics: FunctionComponent<
  PerformanceAnalyticsProps
> = () => {
  const [testHistory, setTestHistory] = useState<TestHistory[]>();
  const [fullTestHistory, setFullTestHistory] = useState<TestHistory[]>();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      let res: IPagedResponse<TestHistory[]>;
      if (id) res = await callGetTestHistoryByAdmin(id, 1, 10);
      else res = await callGetTestHistory(1, 10);
      if (res.data) setTestHistory(res.data);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      let res: IPagedResponse<TestHistory[]>;
      if (id) res = await callGetFullTestHistory(1, 10);
      else res = await callGetFullTestHistory(1, 10);
      if (res.data) setFullTestHistory(res.data);
    };

    fetchData();
  }, [id]);

  const getChartDetails = () => {
    return testHistory?.map(
      (t) =>
        ({
          score: t.score,
          date: dayjs(t.testTakenDate).format("MM/DD/YYYY"),
        } as Result)
    );
  };
  return (
    <>
      <Card className={styles["container"]}>
        <Flex style={{ marginBottom: "20px" }}>
          {tabs.map((tab, index) => (
            <div
              key={`${tab.title}`}
              id={styles[tab.title]}
              className={`${styles["skill-tab"]} ${
                index === activeTab ? styles["active"] : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              <Space>
                {tab.icon} {tab.title}
              </Space>
            </div>
          ))}
        </Flex>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <PerformanceChart histories={getChartDetails() ?? []} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <QuestionTypes />
          </Col>
        </Row>
      </Card>

      <TestHistoryList type="test" histories={testHistory ?? []} />
      <TestHistoryList type="full-test" histories={fullTestHistory ?? []} />
    </>
  );
};

export default PerformanceAnalytics;
