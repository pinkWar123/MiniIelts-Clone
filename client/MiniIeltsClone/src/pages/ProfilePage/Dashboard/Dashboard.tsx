import { FunctionComponent, useEffect, useState } from "react";
import {
  callGetOverallResult,
  callGetOverallResultByAdmin,
} from "../../../services/profile";
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
import { useParams } from "react-router-dom";
import { IResponse } from "../../../types/Responses/response";
interface ProfilePageProps {}

const Dashboard: FunctionComponent<ProfilePageProps> = () => {
  const [performance, setPerformance] = useState<Performance>();
  const { id } = useParams();
  useEffect(() => {
    const fetchUserPerformance = async () => {
      let res: IResponse<Performance>;
      if (id) res = await callGetOverallResultByAdmin(id);
      else res = await callGetOverallResult();
      console.log(res);
      if (res.data) {
        setPerformance(res.data);
      }
    };
    fetchUserPerformance();
  }, [id]);
  console.log(performance);
  return (
    <>
      <Typography.Title level={4} className={styles["title"]}>
        Overall evaluation
      </Typography.Title>

      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <StatisticCard
              icon={<AimOutlined />}
              title={
                <Typography.Title level={5} ellipsis={{ rows: 1 }}>
                  Goal
                </Typography.Title>
              }
              value="7.0"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <StatisticCard
              icon={<RiseOutlined />}
              title={
                <Typography.Title level={5} ellipsis={{ rows: 1 }}>
                  Average Score
                </Typography.Title>
              }
              value={performance?.averageScore ?? 0}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <StatisticCard
              icon={<FileOutlined />}
              title={
                <Typography.Title level={5} ellipsis={{ rows: 1 }}>
                  Number of tests taken
                </Typography.Title>
              }
              value={performance?.testCount ?? 0}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <StatisticCard
              icon={<FieldTimeOutlined />}
              title={
                <Typography.Title level={5} ellipsis={{ rows: 1 }}>
                  Average Time
                </Typography.Title>
              }
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
