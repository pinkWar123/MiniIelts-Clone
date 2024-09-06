import { FunctionComponent, useEffect, useState } from "react";
import { callGetOverallResult } from "../../../services/profile";
import { Performance } from "../../../types/Responses/performance";
import { Col, Row, Typography } from "antd";
import styles from "../ProfilePage.module.scss";
import StatisticCard from "./StatisticCard";
import {
  AimOutlined,
  FieldTimeOutlined,
  FileOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import PerformanceAnalytics from "./PerformanceAnalytics/PerformanceAnalytics";
interface ProfilePageProps {}

const Dashboard: FunctionComponent<ProfilePageProps> = () => {
  const [performance, setPerformance] = useState<Performance>();
  useEffect(() => {
    const fetchUserPerformance = async () => {
      const res = await callGetOverallResult();
      console.log(res);
      if (res.data) {
        setPerformance(res.data);
      }
    };
    fetchUserPerformance();
  }, []);
  console.log(performance);
  return (
    <>
      <Typography.Title level={4} className={styles["title"]}>
        Overall evaluation
      </Typography.Title>

      <div>
        <Row gutter={16}>
          <Col span={6}>
            <StatisticCard icon={<AimOutlined />} title="Goal" value="7.0" />
          </Col>
          <Col span={6}>
            <StatisticCard
              icon={<RiseOutlined />}
              title="Average Score"
              value={performance?.averageScore ?? 0}
            />
          </Col>
          <Col span={6}>
            <StatisticCard
              icon={<FileOutlined />}
              title="Number of tests taken"
              value={performance?.testCount ?? 0}
            />
          </Col>
          <Col span={6}>
            <StatisticCard
              icon={<FieldTimeOutlined />}
              title="Average Time"
              value={performance?.averageTime ?? 0}
            />
          </Col>
        </Row>
      </div>

      <PerformanceAnalytics />
    </>
  );
};

export default Dashboard;
