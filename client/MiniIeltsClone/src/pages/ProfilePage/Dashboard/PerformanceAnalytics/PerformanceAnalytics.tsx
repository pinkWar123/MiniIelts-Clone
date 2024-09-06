import { FunctionComponent, useEffect, useState } from "react";
import { callGetTestHistory } from "../../../../services/profile";
import PerformanceChart, { Result } from "./PerformanceChart";
import { Card, Col, Row } from "antd";
import styles from "./PerformanceAnalytics.module.scss";
import { TestHistory } from "../../../../types/Responses/history";
import dayjs from "dayjs";
import QuestionTypes from "./QuestionTypes";
import TestHistoryList from "../TestHistory/TestHistoryList";
interface PerformanceAnalyticsProps {}

const PerformanceAnalytics: FunctionComponent<
  PerformanceAnalyticsProps
> = () => {
  const [testHistory, setTestHistory] = useState<TestHistory[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await callGetTestHistory(1, 10);
      if (res.data) setTestHistory(res.data);
    };

    fetchData();
  }, []);

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
        <Row gutter={16}>
          <Col span={12}>
            <PerformanceChart histories={getChartDetails() ?? []} />
          </Col>
          <Col span={12}>
            <QuestionTypes />
          </Col>
        </Row>
      </Card>

      <TestHistoryList histories={testHistory ?? []} />
    </>
  );
};

export default PerformanceAnalytics;
