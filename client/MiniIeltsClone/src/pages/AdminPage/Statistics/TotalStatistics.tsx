import { Card, Col, Statistic } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { TotalStatistics as TotalStat } from "../../../types/Responses/statistic";
import { getTotalStatistics } from "../../../services/statistic";

interface TotalStatisticsProps {}

const TotalStatistics: FunctionComponent<TotalStatisticsProps> = () => {
  const [stat, setStat] = useState<TotalStat>();
  useEffect(() => {
    const fetchStat = async () => {
      const res = await getTotalStatistics();
      console.log(res);
      if (res.data) setStat(res.data);
    };
    fetchStat();
  }, []);
  return (
    <>
      <Col span={8}>
        <Card>
          <Statistic value={stat?.totalUsers} title="Total users" />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic value={stat?.totalTests} title="Total test" />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            value={stat?.totalTestTakenTimes}
            title="Total test taken times"
          />
        </Card>
      </Col>
    </>
  );
};

export default TotalStatistics;
