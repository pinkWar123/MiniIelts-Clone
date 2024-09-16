import { Card, Col, Row } from "antd";
import { FunctionComponent } from "react";
import AccuracyBarChart from "./Accuracy";
import QuestionProportionPieChart from "./QuestionProportion";
import ScoreDistributionChart from "./ScoreDistribution";
import TopStatistics from "./TopStatistics/TopStatistics";
import TotalStatistics from "./TotalStatistics";

interface StatisticsProps {}

const Statistics: FunctionComponent<StatisticsProps> = () => {
  return (
    <>
      <Row gutter={32}>
        <TotalStatistics />
      </Row>

      <Row gutter={8}>
        <Col span={8}>
          <Card>
            <AccuracyBarChart />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <QuestionProportionPieChart />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <ScoreDistributionChart />
          </Card>
        </Col>
      </Row>

      <Row>
        <TopStatistics />
      </Row>
    </>
  );
};

export default Statistics;
