import { Card, Col, Row, Statistic } from "antd";
import { FunctionComponent } from "react";
import AccuracyBarChart from "./Accuracy";
import QuestionProportionPieChart from "./QuestionProportion";
import ScoreDistributionChart from "./ScoreDistribution";
import TopTests from "./TopTests";
import TopUsers from "./TopUser";

interface StatisticsProps {}

const Statistics: FunctionComponent<StatisticsProps> = () => {
  return (
    <>
      <Row gutter={32}>
        <Col span={8}>
          <Card>
            <Statistic value={123} title="Total users" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic value={123} title="Total test" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic value={123} title="Total test taken times" />
          </Card>
        </Col>
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
        <Col span={12}>
          <Card>
            <TopTests />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <TopUsers />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Statistics;
