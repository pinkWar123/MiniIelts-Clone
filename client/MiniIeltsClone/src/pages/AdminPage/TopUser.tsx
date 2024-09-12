import { Col, Divider, Row, Typography } from "antd";
import { FunctionComponent } from "react";

interface TopUsersProps {}

const TopUsers: FunctionComponent<TopUsersProps> = () => {
  return (
    <>
      <Typography.Title level={3}>Top users</Typography.Title>
      <Row style={{ textAlign: "center" }}>
        <Col span={8}>Username</Col>
        <Col span={10}>Email</Col>
        <Col span={6}>Number of tests taken</Col>
      </Row>
      <Divider style={{ marginTop: "4px", borderColor: "#7cb305" }} />
      <Row style={{ textAlign: "center" }}>
        <Col span={8}>nhquan22</Col>
        <Col span={10}>nhquan22@gmail.com</Col>
        <Col span={6}>7</Col>
      </Row>
      <Divider style={{ marginTop: "4px", borderColor: "#7cb305" }} />
      <Row style={{ textAlign: "center" }}>
        <Col span={8}>nhquan22</Col>
        <Col span={10}>nhquan22@gmail.com</Col>
        <Col span={6}>7</Col>
      </Row>
      <Divider style={{ marginTop: "4px", borderColor: "#7cb305" }} />
      <Row style={{ textAlign: "center" }}>
        <Col span={8}>nhquan22</Col>
        <Col span={10}>nhquan22@gmail.com</Col>
        <Col span={6}>7</Col>
      </Row>
      <Divider style={{ marginTop: "4px", borderColor: "#7cb305" }} />
    </>
  );
};

export default TopUsers;
