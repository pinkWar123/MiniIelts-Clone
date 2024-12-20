import { FunctionComponent, useEffect, useState } from "react";
import {
  callGetFullTestHistory,
  callGetListeningTestHistory,
  callGetTestHistory,
  callGetTestHistoryByAdmin,
} from "../../../../services/profile";
import PerformanceChart, { Result } from "./PerformanceChart";
import { Card, Col, Flex, Row, Select, Space } from "antd";
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

const breakpoint = 768;

const PerformanceAnalytics: FunctionComponent<
  PerformanceAnalyticsProps
> = () => {
  const [testHistory, setTestHistory] = useState<TestHistory[]>();
  const [fullTestHistory, setFullTestHistory] = useState<TestHistory[]>();
  const [listeningTestHistory, setListeningTestHistory] =
    useState<TestHistory[]>();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [renderAsSelect, setRenderAsSelect] = useState<boolean>(
    window.innerWidth < breakpoint
  );
  useEffect(() => {
    function handleResize() {
      setRenderAsSelect(window.innerWidth < breakpoint);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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

  useEffect(() => {
    const fetchData = async () => {
      let res: IPagedResponse<TestHistory[]>;
      if (id) res = await callGetListeningTestHistory(1, 10);
      else res = await callGetListeningTestHistory(1, 10);
      if (res.data) setListeningTestHistory(res.data);
    };

    fetchData();
  }, [id]);

  const getChartDetails = () => {
    const history = () => {
      if (activeTab === 0) return listeningTestHistory;
      else if (activeTab === 1) return fullTestHistory;
    };
    return history()?.map(
      (t) =>
        ({
          score: t.score,
          date: dayjs(t.testTakenDate).format("MM/DD/YYYY"),
        } as Result)
    );
  };
  const renderTabs = () =>
    tabs.map((tab, index) => (
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
    ));
  return (
    <>
      <Card className={styles["container"]}>
        <Flex style={{ marginBottom: "20px" }}>
          {renderAsSelect && (
            <Select
              style={{ width: "100%", textAlign: "center" }}
              defaultValue={activeTab}
              onChange={(index) => setActiveTab(index)}
              options={tabs.map((tab, index) => ({
                value: index,
                label: (
                  <Flex justify="center" gap="middle">
                    {tab.icon} {tab.title}
                  </Flex>
                ),
              }))}
            />
          )}
          {!renderAsSelect && renderTabs()}
        </Flex>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <PerformanceChart histories={getChartDetails() ?? []} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <QuestionTypes activeTab={activeTab} />
          </Col>
        </Row>
      </Card>

      <TestHistoryList type="test" histories={testHistory ?? []} />
      <TestHistoryList type="full-test" histories={fullTestHistory ?? []} />
      <TestHistoryList
        type="listening"
        histories={listeningTestHistory ?? []}
      />
    </>
  );
};

export default PerformanceAnalytics;
