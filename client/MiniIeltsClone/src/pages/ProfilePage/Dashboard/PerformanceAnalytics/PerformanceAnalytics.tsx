import { FunctionComponent, useEffect, useState } from "react";
import {
  callGetTestHistory,
  callGetTestHistoryByAdmin,
} from "../../../../services/profile";
import PerformanceChart, { Result } from "./PerformanceChart";
import { Card, Col, Row } from "antd";
import styles from "./PerformanceAnalytics.module.scss";
import { TestHistory } from "../../../../types/Responses/history";
import dayjs from "dayjs";
import QuestionTypes from "./QuestionTypes";
import TestHistoryList from "../TestHistory/TestHistoryList";
import { useParams } from "react-router-dom";
import { IPagedResponse } from "../../../../types/Responses/response";
interface PerformanceAnalyticsProps {}

const PerformanceAnalytics: FunctionComponent<
  PerformanceAnalyticsProps
> = () => {
  const [testHistory, setTestHistory] = useState<TestHistory[]>();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      let res: IPagedResponse<TestHistory[]>;
      if (id) res = await callGetTestHistoryByAdmin(id, 1, 10);
      else res = await callGetTestHistory(1, 10);
      if (res.data) setTestHistory(res.data);
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
