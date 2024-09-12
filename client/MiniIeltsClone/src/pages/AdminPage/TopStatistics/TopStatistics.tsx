import { Card, Col } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import TopTests from "./TopTests";
import TopUsers from "./TopUser";
import { TopStatistics as TopStat } from "../../../types/Responses/statistic";
import { getTopStatistics } from "../../../services/statistic";

interface TopStatisticsProps {}

const TopStatistics: FunctionComponent<TopStatisticsProps> = () => {
  const [stat, setStat] = useState<TopStat>();
  useEffect(() => {
    const fetchStat = async () => {
      const res = await getTopStatistics();
      console.log(res);
      if (res.data) setStat(res.data);
    };
    fetchStat();
  }, []);
  return (
    <>
      <Col span={12}>
        <Card>
          <TopTests topTests={stat?.topTests ?? []} />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <TopUsers topUsers={stat?.topUsers ?? []} />
        </Card>
      </Col>
    </>
  );
};

export default TopStatistics;
