import { Col, Divider, Row, Typography } from "antd";
import { FunctionComponent } from "react";

interface TopTestsProps {}

const TopTests: FunctionComponent<TopTestsProps> = () => {
  return (
    <>
      <Typography.Title level={3}>Top tests</Typography.Title>
      <Row style={{ textAlign: "center" }}>
        <Col span={12}>Title</Col>
        <Col span={4}>View</Col>
        <Col span={8}>Created date</Col>
      </Row>
      <Divider style={{ marginTop: "4px", borderColor: "#7cb305" }} />
      <Row style={{ textAlign: "center" }}>
        <Col span={12}>
          <Typography.Text>The Ecological Importance of Bees</Typography.Text>
        </Col>
        <Col span={4}>123</Col>
        <Col span={8}>12-May-24</Col>
      </Row>
      <Divider style={{ marginTop: "4px", borderColor: "#7cb305" }} />

      <Row style={{ textAlign: "center" }}>
        <Col span={12}>
          <Typography.Text>The Ecological Importance of Bees</Typography.Text>
        </Col>
        <Col span={4}>123</Col>
        <Col span={8}>12-May-24</Col>
      </Row>
      <Divider style={{ marginTop: "4px", borderColor: "#7cb305" }} />

      <Row style={{ textAlign: "center" }}>
        <Col span={12}>
          <Typography.Text>The Ecological Importance of Bees</Typography.Text>
        </Col>
        <Col span={4}>123</Col>
        <Col span={8}>12-May-24</Col>
      </Row>
      <Divider style={{ marginTop: "4px", borderColor: "#7cb305" }} />
    </>
  );
};

export default TopTests;
